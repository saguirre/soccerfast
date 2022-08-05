import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Tournament,
  Prisma,
  TournamentTeamScore,
  TournamentTeam,
  MatchBracketTeam,
  MatchBracketTeamScorer,
  MatchBracketScorer,
} from '@prisma/client';
import { PostMatchDateBracket, PostTournament, PutTournament } from '@dtos';

export type TournamentWithTeamScores = Prisma.TournamentGetPayload<{
  include: {
    tournamentTeams: true;
    tournamentTeamScores: { include: { team: true } };
  };
}>;

@Injectable()
export class TournamentService {
  private logger: Logger = new Logger(TournamentService.name);
  constructor(private prisma: PrismaService) {}

  private getMatchesWon(
    firstTeamGoals: number,
    secondTeamGoals: number,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeamGoals > secondTeamGoals
      ? previousScores.matchesWon + 1
      : previousScores.matchesWon;
  }

  private getMatchesLost(
    firstTeamGoals: number,
    secondTeamGoals: number,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeamGoals < secondTeamGoals
      ? previousScores.matchesLost + 1
      : previousScores.matchesLost;
  }

  private getMatchesTied(
    firstTeamGoals: number,
    secondTeamGoals: number,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeamGoals === secondTeamGoals
      ? previousScores.matchesTied + 1
      : previousScores.matchesTied;
  }

  private getPoints(
    firstTeamGoals: number,
    secondTeamGoals: number,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeamGoals > secondTeamGoals
      ? previousScores.points + 3
      : firstTeamGoals === secondTeamGoals
      ? previousScores.points + 1
      : previousScores.points;
  }

  private getNewTeamScore(
    firstTeamGoals: number,
    secondTeamGoals: number,
    previousScores: TournamentTeamScore,
  ) {
    return {
      ...previousScores,
      matchesPlayed: previousScores.matchesPlayed + 1,
      matchesWon: this.getMatchesWon(
        firstTeamGoals,
        secondTeamGoals,
        previousScores,
      ),
      matchesTied: this.getMatchesTied(
        firstTeamGoals,
        secondTeamGoals,
        previousScores,
      ),
      matchesLost: this.getMatchesLost(
        firstTeamGoals,
        secondTeamGoals,
        previousScores,
      ),
      goalsAhead: previousScores.goalsAhead + firstTeamGoals,
      goalsAgainst: previousScores.goalsAgainst + secondTeamGoals,
      points: this.getPoints(firstTeamGoals, secondTeamGoals, previousScores),
    };
  }

  private updateTeamScore = async (
    tournamentId: number,
    firstTeam,
    secondTeam,
  ) => {
    const previousFirstTeamScore =
      await this.prisma.tournamentTeamScore.findUnique({
        where: {
          tournamentId_teamId: {
            tournamentId: Number(tournamentId),
            teamId: Number(firstTeam.team.id),
          },
        },
      });

    await this.prisma.tournamentTeamScore.update({
      where: {
        tournamentId_teamId: {
          tournamentId: Number(tournamentId),
          teamId: Number(firstTeam.team.id),
        },
      },
      data: {
        ...this.getNewTeamScore(
          firstTeam.goals,
          secondTeam.goals,
          previousFirstTeamScore,
        ),
      },
    });
  };

  async tournament(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput,
  ): Promise<TournamentWithTeamScores | null> {
    return this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
      include: {
        tournamentTeams: true,
        tournamentTeamScores: {
          include: {
            team: true,
          },
        },
      },
    });
  }

  async addMatchDate(
    tournamentId: number,
    data: Prisma.MatchDateCreateInput,
  ): Promise<any> {
    const newMatchDate = await this.prisma.matchDate.create({
      data: {
        title: data.title,
        date: data.date,
      },
    });

    await this.prisma.tournamentMatchDate.create({
      data: {
        matchDateId: newMatchDate.id,
        tournamentId: Number(tournamentId),
      },
    });
    return newMatchDate;
  }

  private addScorers = async (
    tournamentId: number,
    teamScorers: { goals: number; userId: number }[],
    teamBracket: MatchBracketTeam,
  ) => {
    const secondTeamScorerIds = [];
    for (const data of teamScorers) {
      const newScorer = await this.prisma.matchBracketScorer.create({
        data,
      });
      const existingTopScorer = await this.prisma.topScorer.findFirst({
        where: {
          userId: Number(newScorer.userId),
          AND: { teamId: Number(teamBracket.teamId) },
        },
      });
      if (!existingTopScorer) {
        const newTopScorerEntry = await this.prisma.topScorer.create({
          data: {
            goals: Number(newScorer.goals),
            userId: Number(newScorer.goals),
          },
        });
        await this.prisma.tournamentTopScorer.create({
          data: {
            tournamentId: Number(tournamentId),
            topScorerId: Number(newTopScorerEntry.id),
          },
        });
      } else {
        await this.prisma.topScorer.update({
          where: { id: Number(existingTopScorer.id) },
          data: {
            goals: Number(existingTopScorer.goals) + Number(data.goals),
          },
        });
      }
      secondTeamScorerIds.push(newScorer.id);
    }
    const secondBracketTeamScorerData = secondTeamScorerIds.map(
      (matchBracketScorerId) => ({
        matchBracketTeamId: teamBracket.id,
        matchBracketScorerId,
      }),
    );
    this.prisma.matchBracketTeamScorer.createMany({
      data: secondBracketTeamScorerData,
    });
  };

  private addMatchDateBracketAndTeams = async (matchDateId: number, match) => {
    const matchDateBracket = await this.prisma.matchDateBracket.create({
      data: {
        time: match.time,
        matchAlreadyHappened: match.matchAlreadyHappened,
        matchDateId: Number(matchDateId),
      },
    });

    const firstBracketTeam = await this.prisma.matchBracketTeam.create({
      data: {
        teamId: Number(match.firstTeam.team.id),
        goals: Number(match.firstTeam.goals),
      },
    });

    const secondBracketTeam = await this.prisma.matchBracketTeam.create({
      data: {
        teamId: Number(match.secondTeam.team.id),
        goals: Number(match.secondTeam.goals),
      },
    });

    // Add to relationship table
    await this.prisma.matchDateBracketToBracketTeam.create({
      data: {
        matchBracketTeamId: Number(firstBracketTeam.id),
        matchDateBracketId: Number(matchDateBracket.id),
      },
    });

    await this.prisma.matchDateBracketToBracketTeam.create({
      data: {
        matchBracketTeamId: Number(secondBracketTeam.id),
        matchDateBracketId: Number(matchDateBracket.id),
      },
    });

    return { matchDateBracket, firstBracketTeam, secondBracketTeam };
  };

  async addBracketToMatchDate(
    tournamentId: number,
    matchDateId: number,
    match: PostMatchDateBracket,
  ): Promise<any> {
    this.logger.debug(JSON.stringify(match));

    const { matchDateBracket, firstBracketTeam, secondBracketTeam } =
      await this.addMatchDateBracketAndTeams(matchDateId, match);

    await this.updateTeamScore(tournamentId, match.firstTeam, match.secondTeam);
    await this.updateTeamScore(tournamentId, match.secondTeam, match.firstTeam);

    if (match.firstTeam.scorers?.length) {
      const firstTeamScorers = match.firstTeam.scorers.map(
        ({ goals, scorer }) => ({ goals, userId: Number(scorer.id) }),
      );
      const secondTeamScorers = match.secondTeam.scorers.map(
        ({ goals, scorer }) => ({ goals, userId: Number(scorer.id) }),
      );

      await this.addScorers(tournamentId, firstTeamScorers, firstBracketTeam);
      await this.addScorers(tournamentId, secondTeamScorers, secondBracketTeam);
    }

    return matchDateBracket;
  }

  async tournamentTeamScores(): Promise<TournamentTeamScore[]> {
    return this.prisma.tournamentTeamScore.findMany({
      where: {},
    });
  }

  async tournamentTeamsAndTeamScores(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput,
  ): Promise<{
    teams: TournamentTeam[] | null;
    teamsScores: TournamentTeamScore[];
  }> {
    const tournamentWithTeams = await this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
      include: {
        tournamentTeams: true,
        tournamentTeamScores: true,
      },
    });
    return {
      teams: tournamentWithTeams.tournamentTeams,
      teamsScores: tournamentWithTeams.tournamentTeamScores,
    };
  }

  async tournaments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TournamentWhereUniqueInput;
    where?: Prisma.TournamentWhereInput;
    orderBy?: Prisma.TournamentOrderByWithRelationInput;
  }): Promise<Tournament[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tournament.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTournament(data: PostTournament): Promise<Tournament> {
    const newTournament = await this.prisma.tournament.create({
      data: {
        name: data.name,
        logo: data.logo,
        description: data.description,
      },
    });

    for (const teamId of data.teamIds) {
      await this.prisma.tournamentTeamScore.create({
        data: {
          tournamentId: (await newTournament).id,
          teamId: Number(teamId),
        },
      });
      await this.prisma.tournamentTeam.create({
        data: { tournamentId: newTournament.id, teamId: Number(teamId) },
      });
    }

    return newTournament;
  }

  async updateTournament(params: {
    where: Prisma.TournamentWhereUniqueInput;
    data: PutTournament;
  }): Promise<Tournament> {
    const { where, data } = params;
    const { teamIds, ...tournamentData } = data;

    const tournamentTeams = await this.prisma.tournamentTeam.findMany({
      where: { tournamentId: Number(where.id) },
    });

    const teamsToAdd = teamIds.filter((teamId: number) => {
      return !tournamentTeams.some(
        (tournamentTeam) => tournamentTeam.teamId === teamId,
      );
    });

    for (const teamId of teamsToAdd) {
      await this.prisma.tournamentTeam.create({
        data: { tournamentId: where.id, teamId: Number(teamId) },
      });
    }

    const teamsToDelete = tournamentTeams.filter((tournamentTeam) => {
      return !teamIds.some(
        (teamId: number) => tournamentTeam.teamId === teamId,
      );
    });

    for (const teamId of teamsToDelete) {
      await this.prisma.tournamentTeam.delete({
        where: {
          tournamentId_teamId: {
            tournamentId: where.id,
            teamId: Number(teamId),
          },
        },
      });
    }

    return this.prisma.tournament.update({
      data: tournamentData,
      where,
    });
  }

  async inactivateTournament(
    where: Prisma.TournamentWhereUniqueInput,
    data: Prisma.TournamentUpdateInput,
  ): Promise<Tournament> {
    return this.prisma.tournament.update({
      where,
      data,
    });
  }

  async deleteTournament(
    where: Prisma.TournamentWhereUniqueInput,
  ): Promise<Tournament> {
    return this.prisma.tournament.delete({
      where,
    });
  }
}
