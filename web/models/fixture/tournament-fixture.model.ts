import { MatchDate } from './match-date.model';

export interface TournamentFixture {
  id: number;
  title: string;
  date?: string;
  matchDates: MatchDate[];
}
