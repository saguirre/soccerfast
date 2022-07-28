import { User } from '../user/user.model';

export interface BracketScorer {
  id?: number;
  scorer?: User;
  goals?: number;
  userId?: number;
}
