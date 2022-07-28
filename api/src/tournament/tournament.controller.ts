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
import {
  PostMatchDateBracket,
  PostTournament,
  PutTournament,
  Tournament,
} from '@dtos';
import {
  TournamentService,
  TournamentWithTeamScores,
} from './tournament.service';
import { Roles } from 'src/auth/auth.decorator';
import { RoleEnum } from '@enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma, Team } from '@prisma/client';

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
  @Roles(RoleEnum.Admin)
  @Post('/:fixtureId')
  async addMatchDate(@Param('fixtureId') fixtureId: number, @Body() bracket) {
    console.log(fixtureId, bracket);
    return this.tournamentService.addMatchDate(fixtureId, bracket);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/:fixtureId/:matchDateId')
  async addBracketToMatchDate(
    @Param('fixtureId') fixtureId: number,
    @Param('matchDateId') matchDateId: number,
    @Body() match: PostMatchDateBracket,
  ) {
    const data: Prisma.MatchDateBracketCreateInput = {
      time: match.time,
      matchDate: { connect: { id: Number(matchDateId) } },
      firstTeam: {
        create: {
          goals: Number(match.firstTeam.goals),
          team: { connect: { id: Number(match.firstTeam.team.id) } },
          scorers: { create: { ...match.firstTeam.scorers } },
        },
      },
      secondTeam: {
        create: {
          goals: Number(match.secondTeam.goals),
          team: { connect: { id: Number(match.secondTeam.team.id) } },
          scorers: { create: { ...match.secondTeam.scorers } },
        },
      },
    };
    return this.tournamentService.addBracketToMatchDate(matchDateId, data);
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
      tournamentFixture: { create: {} },
      tournamentTopGoalkeepers: { create: {} },
      tournamentTopScorers: { create: {} },
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

    const teamScoresToCreate = updateTournamentData.teamIds
      .filter((teamId: number) => {
        return !allTeamScores.some((teamScore) => teamScore.teamId === teamId);
      })
      .map((id) => ({ teamId: id }));

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

    if (teamScoresToCreate.length) {
      tournamentTeamScore.create = teamScoresToCreate;
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
  @Put('/:id/fixture')
  async name(
    @Param('id') id: string,
    @Body() fixture: Prisma.TournamentFixtureUpdateInput,
  ) {
    return this.tournamentService.updateTournamentFixture(Number(id), {
      ...fixture,
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
