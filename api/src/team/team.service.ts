import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Team, Prisma } from '@prisma/client';
import { PostTeam, PutTeam } from '@dtos';

export type TeamWithOwnersAndPlayers = Prisma.TeamGetPayload<{
  include: {
    userTeams: {
      include: { user: { select: { id: true; email: true; name: true } } };
    };
  };
}>;

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async team(
    teamWhereUniqueInput: Prisma.TeamWhereUniqueInput,
  ): Promise<TeamWithOwnersAndPlayers | null> {
    const team = await this.prisma.team.findUnique({
      where: teamWhereUniqueInput,
      include: {
        userTeams: {
          where: { teamId: Number(teamWhereUniqueInput.id) },
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
    });
    Logger.debug(JSON.stringify(team));
    return team;
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

  async teamImages(id: number) {
    return (
      await this.prisma.teamImage.findMany({ where: { teamId: Number(id) } })
    )?.map((image) => image.url);
  }

  async createTeam(data: PostTeam): Promise<Team> {
    const { tournamentId, ownerIds, playerIds, ...teamData } = data;
    const newTeam = await this.prisma.team.create({
      data: teamData,
    });
    for (const userId of playerIds) {
      await this.prisma.userTeam.create({
        data: { teamId: newTeam.id, userId: Number(userId), userTeamRoleId: 2 },
      });
    }
    for (const userId of ownerIds) {
      await this.prisma.userTeam.create({
        data: { teamId: newTeam.id, userId: Number(userId), userTeamRoleId: 1 },
      });
    }
    return newTeam;
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
        userTeams: {
          include: { user: { select: { id: true, email: true, name: true } } },
        },
      },
    });
  }

  async addTeamImage(teamId: number, url: string) {
    await this.prisma.teamImage.create({
      data: {
        teamId,
        url,
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
