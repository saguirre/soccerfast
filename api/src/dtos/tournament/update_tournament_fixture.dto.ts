import { Prisma, TournamentFixture, Tournament } from '@prisma/client';

export interface UpdateTournamentFixture {
  title?: string;
  date?: string;
  tournamentFixture?: Prisma.TournamentFixtureCreateInput;
  tournament?: Tournament;
}
