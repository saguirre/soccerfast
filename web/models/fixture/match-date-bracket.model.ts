import { MatchDate } from './match-date.model';
import { MatchDateBracketTeam } from './match-date-bracket-team.model';

export interface MatchDateBracket {
  id: number;
  time?: string;
  firstTeam?: MatchDateBracketTeam;
  secondTeam?: MatchDateBracketTeam;
  firstTeamId?: number;
  secondTeamId?: number;
  matchDate?: MatchDate;
  matchDateId?: number;
}
