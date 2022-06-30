import { useState } from "react";

import { User } from "@models";

export const useSignIn: (defaultValue?: User) => [User, (user: User) => void] = (
  defaultValue: User = {
    name: "",
    email: "",
    password: "",
  }
) => {
  const [user, setUser] = useState<User>(defaultValue);

  const setOrUpdateUser = (newUser: User) => {
    if (user) {
      setUser((current) => {
        return { ...current, ...newUser };
      });
    } else {
      setUser(newUser);
    }
  };

  return [user, setOrUpdateUser];
};
