export interface PostUser {
  email: string;
  password: string;
  name: string;
  type: string;
  phone?: string;
  avatar?: string;
  birthday?: Date;
}
