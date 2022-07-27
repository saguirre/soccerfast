import { TeamScore } from './team-score.model';

export interface Tournament {
  id: number;
  name: string;
  description?: string;
  active?: boolean;
  teamIds?: number[];
  tournamentTeamScore?: TeamScore[];
}