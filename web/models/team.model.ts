import { User } from "./user.model";

export interface Team {
  name: string;
  logo: string;
  players?: User[];
}
