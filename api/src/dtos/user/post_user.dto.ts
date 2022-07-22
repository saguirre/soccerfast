export interface PostUser {
  email: string;
  password: string;
  name: string;
  type: string;
  roles: number[];
  phone?: string;
  avatar?: string;
  birthday?: Date;
}
