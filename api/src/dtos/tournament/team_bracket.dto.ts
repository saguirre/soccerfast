import { TeamBracketItem } from '@prisma/client';

export interface TeamBracket {
  time?: string | null;
  leftTeamBracketItem: TeamBracketItem;
  rightTeamBracketItem: TeamBracketItem;
}
