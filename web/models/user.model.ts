export interface User {
  id: number;
  email: string;
  name: string;
  type: string;
  phone?: string;
  avatar?: string;
  active: boolean;
  birthday?: Date;
  preferredLanguage: string;
  token: string;
}
