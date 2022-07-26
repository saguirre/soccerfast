import { TeamBracketItem } from './team-bracket-item.model';

export interface TeamBracket {
  time?: string;
  leftTeam: TeamBracketItem;
  rightTeam: TeamBracketItem;
}
