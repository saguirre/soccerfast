import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostTeam, PutTeam, Team } from '@dtos';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<Team> {
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

  @Post()
  async createTeam(@Body() teamData: PostTeam): Promise<Team> {
    return this.teamService.createTeam(teamData);
  }

  @Put('/:id')
  async updateTeamProfile(
    @Param('id') id: string,
    @Body() updateTeamData: PutTeam,
  ): Promise<Team> {
    const data: PutTeam = {};

    if (updateTeamData.name) data.name = updateTeamData.name;
    if (updateTeamData.description)
      data.description = updateTeamData.description;
    if (updateTeamData.logo) data.logo = updateTeamData.logo;
    if (updateTeamData.ownerId) data.ownerId = updateTeamData.ownerId;
    if (updateTeamData.tournamentId)
      data.tournamentId = updateTeamData.tournamentId;

    return this.teamService.updateTeam({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete('inactivate/:id')
  async inactivateTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.inactivateTeam(
      { id: Number(id) },
      { active: false },
    );
  }

  @Delete('/:id')
  async deleteTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.deleteTeam({ id: Number(id) });
  }
}
