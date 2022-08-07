import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Logger,
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
import { RoleEnum } from '../enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma, Team } from '@prisma/client';

@Controller('tournament')
export class TournamentController {
  private logger: Logger = new Logger(TournamentController.name);
  constructor(private readonly tournamentService: TournamentService) {}

  @Get('/:id')
  async getTournamentById(
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
  @Post('/:tournamentId')
  async addMatchDate(@Param('tournamentId') tournamentId: number, @Body() bracket) {
    return this.tournamentService.addMatchDate(tournamentId, bracket);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/:tournamentId/:matchDateId')
  async addBracketToMatchDate(
    @Param('tournamentId') tournamentId: number,
    @Param('matchDateId') matchDateId: number,
    @Body() match: PostMatchDateBracket,
  ) {
    this.logger.debug(JSON.stringify(match));

    return this.tournamentService.addBracketToMatchDate(
      tournamentId,
      matchDateId,
      match,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(RoleEnum.Admin)
  async createTournament(@Body() data: PostTournament): Promise<Tournament> {
    return this.tournamentService.createTournament(data);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Put('/:id')
  async updateTournamentProfile(
    @Param('id') id: string,
    @Body() updateTournamentData: PutTournament,
  ): Promise<Tournament> {
    return this.tournamentService.updateTournament({
      where: { id: Number(id) },
      data: updateTournamentData,
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
