import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostTournament, PutTournament, Tournament } from '@dtos';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<Tournament> {
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

  @Post()
  async createTournament(
    @Body() tournamentData: PostTournament,
  ): Promise<Tournament> {
    return this.tournamentService.createTournament(tournamentData);
  }

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

  @Delete('inactivate/:id')
  async inactivateTournament(@Param('id') id: string): Promise<Tournament> {
    return this.tournamentService.inactivateTournament(
      { id: Number(id) },
      { active: false },
    );
  }

  @Delete('/:id')
  async deleteTournament(@Param('id') id: string): Promise<Tournament> {
    return this.tournamentService.deleteTournament({ id: Number(id) });
  }
}
