import { MatchDate } from '../fixture/match-date.model';

export interface TournamentMatchDate {
  matchDateId: number;
  tournamentId: number;
  matchDate: MatchDate;
}
