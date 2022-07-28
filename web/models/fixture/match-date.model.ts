import { MatchDateBracket } from './match-date-bracket.model';

export interface MatchDate {
  id: number;
  title?: string;
  date?: string;
  teamBrackets?: MatchDateBracket[];
  tournamentFixtureId?: number;
}
