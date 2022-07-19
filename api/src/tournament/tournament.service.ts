import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tournament, Prisma } from '@prisma/client';

export type TournamentWithTeamScores = Prisma.TournamentGetPayload<{
  include: { tournamentTeamScore: { include: { team: true } } };
}>;
@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}

  async tournament(
    tournamentWhereUniqueInput: Prisma.TournamentWhereUniqueInput,
  ): Promise<TournamentWithTeamScores | null> {
    return this.prisma.tournament.findUnique({
      where: tournamentWhereUniqueInput,
      include: {
        tournamentTeamScore: {
          include: {
            team: true,
          },
        },
      },
    });
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
      data,
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
