import { RoleEnum } from 'common/enums';

export interface Role {
  id: number;
  role: RoleEnum;
  userId: number;
}
