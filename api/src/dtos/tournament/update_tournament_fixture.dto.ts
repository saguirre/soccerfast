import { Prisma, TeamBracket, Tournament } from '@prisma/client';

export interface UpdateTournamentFixture {
  title?: string;
  date?: string;
  teamBrackets?: Prisma.TeamBracketUpdateInput;
  tournament?: Tournament;
}
