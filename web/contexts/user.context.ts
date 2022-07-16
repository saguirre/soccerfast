import { createContext, Dispatch, SetStateAction } from 'react';
import { UserService, IUserService } from '@services';
import { User } from '@models';

export interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  userService: IUserService;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  userService: new UserService(),
});
