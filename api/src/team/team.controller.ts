import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { PostTeam, PutTeam, Team } from '@dtos';
import { TeamService, TeamWithOwnersAndPlayers } from './team.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/auth.decorator';
import { RoleEnum, SpacesFolderEnum } from '../enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from 'src/file/file.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Controller('team')
export class TeamController {
  private logger: Logger = new Logger(TeamController.name);
  constructor(
    private readonly teamService: TeamService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  @Get('/:id')
  async getTeamById(
    @Param('id') id: string,
  ): Promise<TeamWithOwnersAndPlayers> {
    return this.teamService.team({ id: Number(id) });
  }

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.teams({});
  }

  @Get('filtered-teams/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<Team[]> {
    return this.teamService.teams({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
        ],
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  async createTeam(
    @Body() teamData: PostTeam,
  ): Promise<TeamWithOwnersAndPlayers> {
    return this.teamService.createTeam(teamData);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Put('/:id')
  async updateTeamProfile(
    @Param('id') id: string,
    @Body() updateTeamData: PutTeam,
  ): Promise<TeamWithOwnersAndPlayers> {
    this.logger.debug(id, 'TeamId');
    this.logger.debug(JSON.stringify(updateTeamData), 'UpdateTeamData');

    const currentTeamOwners = await this.userService.users({
      where: { ownedTeams: { some: { id: Number(id) } } },
    });

    this.logger.debug(
      JSON.stringify(
        currentTeamOwners.map((owner) => ({ id: owner.id, name: owner.name })),
      ),
      'CurrentTeamOwners',
    );

    const currentTeamPlayers = await this.userService.users({
      where: { playingTeams: { some: { id: Number(id) } } },
    });

    this.logger.debug(
      JSON.stringify(
        currentTeamPlayers.map((player) => ({
          id: player.id,
          name: player.name,
        })),
      ),
      'CurrentTeamPlayers',
    );

    const allUsers = await this.userService.users({
      where: {},
    });

    const { ownerIds, playerIds, ...data } = updateTeamData;

    const newPlayerIds = playerIds.filter(
      (playerId) =>
        !currentTeamPlayers.some((player) => player.id === playerId),
    );

    this.logger.debug(
      JSON.stringify(
        newPlayerIds.map((playerId) => ({
          id: playerId,
        })),
      ),
      'NewPlayerIds',
    );

    const newOwnerIds = ownerIds.filter(
      (ownerId) => !currentTeamOwners.some((owner) => owner.id === ownerId),
    );

    this.logger.debug(
      JSON.stringify(
        newOwnerIds.map((ownerId) => ({
          id: ownerId,
        })),
      ),
      'NewOwnerIds',
    );

    const ownersToCreateOrConnect = allUsers.filter((owner) =>
      newOwnerIds.some((newOwnerId) => owner.id === newOwnerId),
    );

    this.logger.debug(
      JSON.stringify(
        ownersToCreateOrConnect.map((owner) => ({
          id: owner.id,
          name: owner.name,
        })),
      ),
      'OwnersToCreateOrConnect',
    );

    const playersToCreateOrConnect = allUsers.filter((player) =>
      newPlayerIds.some((newPlayerId) => player.id === newPlayerId),
    );
    this.logger.debug(
      JSON.stringify(
        playersToCreateOrConnect.map((player) => ({
          id: player.id,
          name: player.name,
        })),
      ),
      'PlayersToCreateOrConnect',
    );
    const owners = {
      connectOrCreate: [...currentTeamOwners, ...ownersToCreateOrConnect].map(
        (owner) => ({
          where: { id: Number(owner.id) },
          create: { ...owner },
        }),
      ),
      disconnect: currentTeamOwners
        .filter((owner) => !ownerIds.some((ownerId) => owner.id === ownerId))
        .map((owner) => ({ id: Number(owner.id) })),
    };

    this.logger.debug(JSON.stringify(owners), 'OwnersData');
    const players = {
      connectOrCreate: [...currentTeamPlayers, ...playersToCreateOrConnect].map(
        (player) => ({
          where: { id: Number(player.id) },
          create: { ...player },
        }),
      ),
      disconnect: currentTeamPlayers
        .filter(
          (player) => !playerIds.some((playerId) => player.id === playerId),
        )
        .map((player) => ({ id: Number(player.id) })),
    };
    this.logger.debug(JSON.stringify(players), 'PlayersData');

    return this.teamService.updateTeam({
      where: { id: Number(id) },
      data: {
        ...data,
        owners,
        players,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload/team-logo')
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: 4000000 },
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './src/images/temporal';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile()
    fileInfo: Express.Multer.File,
  ) {
    const file = readFileSync(fileInfo.path);

    await this.fileService.uploadObject(
      file,
      null,
      fileInfo,
      file.byteLength,
      SpacesFolderEnum.TeamLogos,
    );
    unlinkSync(fileInfo.path);

    const avatar = `${process.env.IMAGE_RETURN_ENDPOINT}/${SpacesFolderEnum.TeamLogos}/${fileInfo.filename}`;
    return avatar;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete('inactivate/:id')
  async inactivateTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.inactivateTeam(
      { id: Number(id) },
      { active: false },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete('/:id')
  async deleteTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.deleteTeam({ id: Number(id) });
  }
}
