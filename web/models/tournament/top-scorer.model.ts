import { Team } from '../team/team.model';
import { User } from '../user';

export interface TopScorer {
  id?: number;
  goals?: number;
  teamId?: number;
  team?: Team;
  user?: User;
  userId?: number;
}
