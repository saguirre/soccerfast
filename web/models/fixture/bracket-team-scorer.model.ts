import { TournamentTopScore } from '../tournament/tournament-top-score.model';
import { User } from '../user/user.model';
import { MatchDateBracketTeam } from './match-date-bracket-team.model';

export interface BracketTeamScorer {
  id: number;
  scorer?: User;
  goals?: number;
  matchDateBracketTeam?: MatchDateBracketTeam;
  matchDateBracketTeamId?: number;
  userId?: number;
  tournamentTopScore?: TournamentTopScore;
  tournamentTopScoreId?: number;
}
