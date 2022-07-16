export interface User {
  id: number;
  email: string;
  name: string;
  type: string;
  phone?: string;
  avatar?: string;
  active: boolean;
  birthday?: Date;
  token?: string;
  preferredLanguage: string;
}
