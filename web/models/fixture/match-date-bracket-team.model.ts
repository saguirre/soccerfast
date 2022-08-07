import { Team } from '../team/team.model';

export interface MatchDateBracketTeam {
  id: number;
  team?: Team;
  teamId?: number;
  goals?: number;
}
