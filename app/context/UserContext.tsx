"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  name: string;
  email: string;
  userType: string;
  password?: string;
  highestEducation?: string;
  rate?: string;
  location?: string;
  aboutMe?: string;
  subjectsTeachable?: string;
  levelsTeachable?: string;
  specialSkills?: string;
  resume?: File | null;
  experience?: string;
  school?: string;
  level?: string;
  subjects?: string;
  address?: string;
  phoneNumber?: string;
}

interface UserContextType {
  user: UserData;
  setUser: (user: UserData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "", email: "", userType: "" };
  });

  const saveUser = (user: UserData) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return <UserContext.Provider value={{ user, setUser: saveUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
