import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Tournament,
  Prisma,
  Team,
  TournamentTeamScore,
  TournamentFixture,
  MatchDateBracketTeam,
  MatchDateBracket,
} from '@prisma/client';

export type TournamentWithTeamScores = Prisma.TournamentGetPayload<{
  include: { teams: true; tournamentTeamScore: { include: { team: true } } };
}>;

export type MatchDateBracketWithTeams = Prisma.MatchDateBracketGetPayload<{
  include: {
    firstTeam: {
      include: {
        scorers: {
          include: { scorer: true; tournamentTopScore: true };
        };
      };
    };
    secondTeam: {
      include: {
        scorers: {
          include: { scorer: true; tournamentTopScore: true };
        };
      };
    };
  };
}>;
@Injectable()
export class TournamentService {
  private logger: Logger = new Logger(TournamentService.name);
  constructor(private prisma: PrismaService) {}

  private getMatchesWon(
    firstTeam: MatchDateBracketTeam,
    secondTeam: MatchDateBracketTeam,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeam.goals > secondTeam.goals
      ? previousScores.matchesWon + 1
      : previousScores.matchesWon;
  }

  private getMatchesLost(
    firstTeam: MatchDateBracketTeam,
    secondTeam: MatchDateBracketTeam,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeam.goals < secondTeam.goals
      ? previousScores.matchesLost + 1
      : previousScores.matchesLost;
  }

  private getMatchesTied(
    firstTeam: MatchDateBracketTeam,
    secondTeam: MatchDateBracketTeam,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeam.goals === secondTeam.goals
      ? previousScores.matchesTied + 1
      : previousScores.matchesTied;
  }

  private getPoints(
    firstTeam: MatchDateBracketTeam,
    secondTeam: MatchDateBracketTeam,
    previousScores: TournamentTeamScore,
  ) {
    return firstTeam.goals > secondTeam.goals
      ? previousScores.points + 3
      : firstTeam.goals === secondTeam.goals
      ? previousScores.points + 1
      : previousScores.points;
  }

  private getNewTeamScore(
    firstTeam: MatchDateBracketTeam,
    secondTeam: MatchDateBracketTeam,
    previousScores: TournamentTeamScore,
  ) {
    return {
      ...previousScores,
      matchesPlayed: previousScores.matchesPlayed + 1,
      matchesWon: this.getMatchesWon(firstTeam, secondTeam, previousScores),
      matchesTied: this.getMatchesTied(firstTeam, secondTeam, previousScores),
      matchesLost: this.getMatchesLost(firstTeam, secondTeam, previousScores),
      goalsAhead: previousScores.goalsAhead + firstTeam.goals,
      goalsAgainst: previousScores.goalsAgainst + secondTeam.goals,
      points: this.getPoints(firstTeam, secondTeam, previousScores),
    };
  }

  async tournament(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput,
  ): Promise<TournamentWithTeamScores | null> {
    return this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
      include: {
        teams: true,
        tournamentTeamScore: {
          include: {
            team: true,
          },
        },
        tournamentFixture: {
          include: {
            matchDates: {
              include: {
                teamBrackets: {
                  include: {
                    firstTeam: {
                      include: {
                        team: true,
                        scorers: {
                          include: { scorer: true, tournamentTopScore: true },
                        },
                      },
                    },
                    secondTeam: {
                      include: {
                        team: true,
                        scorers: {
                          include: { scorer: true, tournamentTopScore: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async addMatchDate(
    fixtureId: number,
    data: Prisma.MatchDateCreateInput,
  ): Promise<any> {
    const tournamentFixture = await this.prisma.tournamentFixture.findUnique({
      where: { id: Number(fixtureId) },
    });
    const newMatchDate = await this.prisma.matchDate.create({
      data: {
        title: data.title,
        date: data.date,
        tournamentFixture: { connect: { id: Number(tournamentFixture.id) } },
      },
    });

    await this.prisma.tournamentFixture.update({
      where: { id: Number(fixtureId) },
      data: { matchDates: { connect: { id: Number(newMatchDate.id) } } },
      include: {
        matchDates: true,
      },
    });
    return newMatchDate;
  }

  async addBracketToMatchDate(
    matchDateId: number,
    data: Prisma.MatchDateBracketCreateInput,
  ): Promise<any> {
    this.logger.debug(JSON.stringify(data));
    this.prisma.$transaction([])
    const newBracket = await this.prisma.matchDateBracket.create({
      data,
      include: {
        firstTeam: {
          include: {
            team: true,
            scorers: {
              include: { scorer: true, tournamentTopScore: true },
            },
          },
        },
        secondTeam: {
          include: {
            team: true,
            scorers: {
              include: { scorer: true, tournamentTopScore: true },
            },
          },
        },
      },
    });
    this.logger.debug(JSON.stringify(newBracket));

    const matchDate = await this.prisma.matchDate.update({
      where: { id: Number(matchDateId) },
      data: { teamBrackets: { connect: { id: Number(newBracket.id) } } },
      include: {
        teamBrackets: {
          include: {
            firstTeam: {
              include: {
                team: true,
                scorers: {
                  include: { scorer: true, tournamentTopScore: true },
                },
              },
            },
            secondTeam: {
              include: {
                team: true,
                scorers: {
                  include: { scorer: true, tournamentTopScore: true },
                },
              },
            },
          },
        },
      },
    });

    if (newBracket.matchAlreadyHappened) {
      const firstTeamTournamentScore =
        await this.prisma.tournamentTeamScore.findFirst({
          where: {
            teamId: Number(data.firstTeam.connectOrCreate.where.id),
          },
        });

      const firstTeamNewScore = this.getNewTeamScore(
        newBracket.firstTeam,
        newBracket.secondTeam,
        firstTeamTournamentScore,
      );

      const secondTeamTournamentScore =
        await this.prisma.tournamentTeamScore.findFirst({
          where: {
            teamId: Number(data.secondTeam.connectOrCreate.where.id),
          },
        });

      const secondTeamNewScore = this.getNewTeamScore(
        newBracket.secondTeam,
        newBracket.firstTeam,
        secondTeamTournamentScore,
      );

      await this.prisma.$transaction([
        this.prisma.tournamentTeamScore.update({
          where: { id: Number(firstTeamTournamentScore.id) },
          data: { ...firstTeamNewScore },
        }),
        this.prisma.tournamentTeamScore.update({
          where: { id: Number(secondTeamTournamentScore.id) },
          data: { ...secondTeamNewScore },
        }),
      ]);
    }

    return matchDate;
  }

  async updateTournamentFixture(
    tournamentId: number,
    fixture: Prisma.TournamentFixtureUpdateInput,
  ): Promise<TournamentFixture> {
    const tournament = await this.prisma.tournament.findFirst({
      where: { id: tournamentId },
    });

    return this.prisma.tournamentFixture.update({
      where: { id: tournament.tournamentFixtureId },
      data: { ...fixture },
    });
  }

  async tournamentTeamScores(): Promise<TournamentTeamScore[]> {
    return this.prisma.tournamentTeamScore.findMany({
      where: {},
    });
  }

  async tournamentTeamsAndTeamScores(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput,
  ): Promise<{ teams: Team[] | null; teamsScores: TournamentTeamScore[] }> {
    const tournamentWithTeams = await this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
      include: {
        teams: true,
        tournamentTeamScore: true,
      },
    });
    return {
      teams: tournamentWithTeams.teams,
      teamsScores: tournamentWithTeams.tournamentTeamScore,
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

  async createTournament(
    data: Prisma.TournamentCreateInput,
  ): Promise<Tournament> {
    return this.prisma.tournament.create({
      data: {
        ...data,
        tournamentFixture: { create: { matchDates: { create: [] } } },
      },
    });
  }

  async updateTournament(params: {
    where: Prisma.TournamentWhereUniqueInput;
    data: Prisma.TournamentUpdateInput;
  }): Promise<Tournament> {
    const { where, data } = params;
    return this.prisma.tournament.update({
      data,
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
