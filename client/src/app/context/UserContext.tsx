'use client'
import { ReactNode, createContext, useState } from "react";

interface IUser {
    userId: string;
    setUserId: Function;
    userName: string;
    setUserName: Function;
};

export const UserContext = createContext<IUser>({
    userId: '',
    setUserId: (userName: string) => {},
    userName: '',
    setUserName: (userName: string) => {},
});

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    console.log('abc', userName);
    
    return (
        <UserContext.Provider value={{
            userId,
            setUserId,
            userName,
            setUserName,
        }}>
            {children}
        </UserContext.Provider>
    );
};