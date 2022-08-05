import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Team, Prisma } from '@prisma/client';
import { PostTeam, PutTeam } from '@dtos';

export type TeamWithOwnersAndPlayers = Prisma.TeamGetPayload<{
  include: { userTeams: true };
}>;

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async team(
    teamWhereUniqueInput: Prisma.TeamWhereUniqueInput,
  ): Promise<TeamWithOwnersAndPlayers | null> {
    return this.prisma.team.findUnique({
      where: teamWhereUniqueInput,
      include: { userTeams: true },
    });
  }

  async teams(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TeamWhereUniqueInput;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput;
  }): Promise<Team[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.team.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTeam(data: PostTeam): Promise<Team> {
    const { tournamentId, ownerIds, playerIds, ...teamData } = data;
    return this.prisma.team.create({
      data: teamData,
    });
  }

  async updateTeam(params: {
    where: Prisma.TeamWhereUniqueInput;
    data: PutTeam;
  }): Promise<TeamWithOwnersAndPlayers> {
    const { where, data } = params;
    const { ownerIds, playerIds, tournamentId, ...tournamentData } = data;
    return this.prisma.team.update({
      data: tournamentData,
      where,
      include: {
        userTeams: true,
      },
    });
  }

  async inactivateTeam(
    where: Prisma.TeamWhereUniqueInput,
    data: Prisma.TeamUpdateInput,
  ): Promise<Team> {
    return this.prisma.team.update({
      where,
      data,
    });
  }

  async deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team> {
    return this.prisma.team.delete({
      where,
    });
  }
}
