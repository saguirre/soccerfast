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

  @Get('images/:id')
  async getTeamImages(@Param('id') id: string): Promise<string[]> {
    return this.teamService.teamImages(Number(id));
  }

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
  async createTeam(@Body() teamData: PostTeam): Promise<Team> {
    return this.teamService.createTeam(teamData);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Put('/:id')
  async updateTeamProfile(
    @Param('id') id: string,
    @Body() updateTeamData: PutTeam,
  ): Promise<TeamWithOwnersAndPlayers> {
    return this.teamService.updateTeam({
      where: { id: Number(id) },
      data: updateTeamData,
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
      fileInfo,
      file.byteLength,
      SpacesFolderEnum.TeamLogos,
      null,
    );
    unlinkSync(fileInfo.path);

    const avatar = `${process.env.IMAGE_RETURN_ENDPOINT}/${SpacesFolderEnum.TeamLogos}/${fileInfo.filename}`;
    return avatar;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload/team-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 10000000 },
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
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile()
    fileInfo: Express.Multer.File,
  ) {
    const file = readFileSync(fileInfo.path);

    await this.fileService.uploadObject(
      file,
      fileInfo,
      file.byteLength,
      SpacesFolderEnum.TeamImages,
      null,
    );
    const image = `${process.env.IMAGE_RETURN_ENDPOINT}/${SpacesFolderEnum.TeamImages}/${fileInfo.filename}`;
    unlinkSync(fileInfo.path);
    await this.teamService.addTeamImage(Number(id), image);
    return image;
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
