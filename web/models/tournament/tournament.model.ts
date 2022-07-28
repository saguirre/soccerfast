import { TournamentFixture } from '../fixture/tournament-fixture.model';
import { Team } from '../team/team.model';
import { TeamScore } from './team-score.model';

export interface Tournament {
  id: number;
  name: string;
  description?: string;
  active?: boolean;
  teams?: Team[];
  teamIds?: number[];
  tournamentTeamScore?: TeamScore[];
  tournamentFixture?: TournamentFixture;
}
