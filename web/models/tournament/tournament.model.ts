import { TournamentMatchDate } from './tournament-match-date.model';
import { TournamentFixture } from '../fixture/tournament-fixture.model';
import { Team } from '../team/team.model';
import { TeamScore } from './team-score.model';
import { TournamentTopScorer } from './tournament-top-scorer.model';

export interface Tournament {
  id: number;
  name: string;
  description?: string;
  active?: boolean;
  tournamentTeams?: { team: Team }[];
  teamIds?: number[];
  tournamentTeamScores?: TeamScore[];
  tournamentTopScorers?: TournamentTopScorer[];
  tournamentMatchDates?: TournamentMatchDate[];
}
