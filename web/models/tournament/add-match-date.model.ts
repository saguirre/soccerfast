import { MatchDateBracket } from '../fixture/match-date-bracket.model';

export interface AddMatchDateModel {
  title?: string;
  date?: string;
  matchDateBrackets?: MatchDateBracket[];
}
