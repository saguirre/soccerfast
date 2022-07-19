import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostTournament, PutTournament, Tournament } from '@dtos';
import {
  TournamentService,
  TournamentWithTeamScores,
} from './tournament.service';
import { Roles } from 'src/auth/auth.decorator';
import { RoleEnum } from '@enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/:id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<TournamentWithTeamScores> {
    return this.tournamentService.tournament({ id: Number(id) });
  }

  @Get()
  async getAllTournaments(): Promise<Tournament[]> {
    return this.tournamentService.tournaments({});
  }

  @Get('filtered-tournaments/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<Tournament[]> {
    return this.tournamentService.tournaments({
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
  @Post()
  @Roles(RoleEnum.Admin)
  async createTournament(
    @Body() tournamentData: PostTournament,
  ): Promise<Tournament> {
    const { teamIds, ...data } = tournamentData;
    return this.tournamentService.createTournament({
      ...data,
      teams: {
        connect: teamIds.map((teamId: number) => {
          return { id: teamId };
        }),
      },
      tournamentTeamScore: {
        createMany: {
          data: teamIds.map((teamId: number) => {
            return { teamId };
          }),
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Put('/:id')
  async updateTournamentProfile(
    @Param('id') id: string,
    @Body() updateTournamentData: PutTournament,
  ): Promise<Tournament> {
    const data: PutTournament = {};

    if (updateTournamentData.name) data.name = updateTournamentData.name;
    if (updateTournamentData.description)
      data.description = updateTournamentData.description;
    if (updateTournamentData.logo) data.logo = updateTournamentData.logo;

    return this.tournamentService.updateTournament({
      where: { id: Number(id) },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete('inactivate/:id')
  async inactivateTournament(@Param('id') id: string): Promise<Tournament> {
    return this.tournamentService.inactivateTournament(
      { id: Number(id) },
      { active: false },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete('/:id')
  async deleteTournament(@Param('id') id: string): Promise<Tournament> {
    return this.tournamentService.deleteTournament({ id: Number(id) });
  }
}
