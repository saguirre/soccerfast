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
import { Team } from '@prisma/client';

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
        create: teamIds.map((teamId: number) => {
          return { teamId };
        }),
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

    const tournamentTeams =
      await this.tournamentService.tournamentTeamsAndTeamScores({
        id: Number(id),
      });

    const allTeamScores = await this.tournamentService.tournamentTeamScores();

    const teamsToDisconnect = tournamentTeams.teams.filter(
      (team: Team) =>
        !updateTournamentData.teamIds.some((id: number) => id == team.id),
    );

    const mappedTeamsToDisconnect = teamsToDisconnect.map((team: Team) => ({
      id: team.id,
    }));

    const teamsToConnect = updateTournamentData.teamIds.filter(
      (id: number) =>
        !tournamentTeams.teams.some((team: Team) => team.id === id),
    );

    const mappedTeamsToConnect = teamsToConnect.map((id: number) => ({
      id,
    }));

    const teamScoresToConnect = allTeamScores
      .filter((teamScore) =>
        teamsToConnect.some((id) => id === teamScore.teamId),
      )
      .map((teamScore) => ({ id: teamScore.teamId }));

    const teamScoresToDisconnect = tournamentTeams.teamsScores
      .filter((teamScore) =>
        teamsToDisconnect.some(
          (connectTeam) => connectTeam.id === teamScore.teamId,
        ),
      )
      .map((teamScore) => ({ id: teamScore.id }));

    const teams: any = {};
    if (mappedTeamsToConnect.length) {
      teams.connect = mappedTeamsToConnect;
    }
    if (mappedTeamsToDisconnect.length) {
      teams.disconnect = mappedTeamsToDisconnect;
    }

    const tournamentTeamScore: any = {};
    if (teamScoresToConnect.length) {
      tournamentTeamScore.connect = teamScoresToConnect;
    }

    if (teamScoresToDisconnect.length) {
      tournamentTeamScore.disconnect = teamScoresToDisconnect;
    }

    return this.tournamentService.updateTournament({
      where: { id: Number(id) },
      data: {
        ...data,
        teams,
        tournamentTeamScore,
      },
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
