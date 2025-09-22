// client/context/AuthContext.tsx
'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export interface User {
    id: string;
    user_type: 'student' | 'admin';
    role?: 'super-admin' | 'faculty-admin'; // <-- ADD THIS LINE
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); 

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser: User = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                localStorage.removeItem('authToken');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        const decodedUser: User = jwtDecode(token);
        setUser(decodedUser);
        // DO NOT CHANGE THE URL HERE. The page.tsx component will see the user change and handle it.
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        // Similarly, we let page.tsx handle the state change after logout.
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};