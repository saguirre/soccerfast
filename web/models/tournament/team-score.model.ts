import { Team } from '../team/team.model';

export interface TeamScore {
  id: number;
  teamId: number;
  tournamentId: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  matchesTied: number;
  goalsAhead: number;
  goalsAgainst: number;
  points: number;
  team: Team;
}
