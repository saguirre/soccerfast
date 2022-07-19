import { TeamScore } from './team-score.model';

export interface Tournament {
  id: number;
  name: string;
  description?: string;
  teamIds?: number[];
  tournamentTeamScore?: TeamScore[];
}
