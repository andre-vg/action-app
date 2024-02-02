import React, { useEffect, useState, createContext } from "react";
import { router } from "expo-router";

export interface IUserContext {
  user: IUser | null;
  setUser: (user: any) => void;
}

interface IUser {
  likedGenres: Number[];
}

const UserContext = createContext<IUserContext>({} as IUserContext);
const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
