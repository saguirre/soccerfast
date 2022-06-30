import { createContext, Dispatch, SetStateAction } from "react";

export interface IAuthContext {
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthContext>({
  userToken: "",
  setUserToken: () => {},
});
