import { Role } from './role.model';

export interface DecodedUserToken {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}
