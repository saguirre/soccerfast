import { RoleModel } from '../role/role.dto';

export interface UserModel {
  id: number;
  email: string;
  name: string;
  type: string;
  phone?: string;
  avatar?: string;
  roles?: RoleModel[];
  active: boolean;
  birthday?: Date;
  token?: string;
  preferredLanguage: string;
}
