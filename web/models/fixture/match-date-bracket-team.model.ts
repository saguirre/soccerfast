import { Team } from '../team/team.model';
import { MatchDateBracket } from './match-date-bracket.model';

export interface MatchDateBracketTeam {
  id: number;
  team?: Team;
  goals?: number;
  scorers?: number;
  firstMatchDateBracket?: MatchDateBracket;
  secondMatchDateBracket?: MatchDateBracket;
}
