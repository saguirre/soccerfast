import { Team } from '../team/team.model';

export interface MatchModel {
  id: number;
  leftTeam: Team;
  leftTeamGoals: number;
  rightTeam: Team;
  rightTeamGoals: number;
}
