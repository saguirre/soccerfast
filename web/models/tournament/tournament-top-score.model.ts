import { BracketTeamScorer } from '../fixture/bracket-team-scorer.model';
import { Tournament } from './tournament.model';

export interface TournamentTopScore {
  id: number;
  scorers?: BracketTeamScorer;
  tournament?: Tournament;
}
