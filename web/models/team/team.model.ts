import { User } from '../user/user.model';

export interface Team {
  id: number;
  name: string;
  description?: string;
  logo: string;
  owners: User[];
  players: User[];
  active?: boolean;
}
