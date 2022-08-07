import { TopScorer } from './top-scorer.model';

export interface TournamentTopScorer {
  tournamentId?: number;
  topScorerId?: number;
  topScorer?: TopScorer;
}
