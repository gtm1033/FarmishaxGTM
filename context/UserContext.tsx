'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
    _id: string;
    fullName: string;
    phone: string;
    PIN: string;
    password: string;
    __v: number;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' }); 
            setUser(null); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
