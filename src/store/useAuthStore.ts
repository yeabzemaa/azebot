import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    // Simulate API delay
                    await new Promise((resolve) => setTimeout(resolve, 800));

                    // Mock validation
                    if (email && password.length >= 6) {
                        const mockUser: User = {
                            id: Math.random().toString(36).substr(2, 9),
                            name: email.split('@')[0],
                            email: email,
                            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=d4af37&color=fff`,
                        };

                        set({ user: mockUser, isAuthenticated: true });
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },

            register: async (name: string, email: string, password: string) => {
                try {
                    // Simulate API delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    // Mock validation
                    if (name && email && password.length >= 6) {
                        const mockUser: User = {
                            id: Math.random().toString(36).substr(2, 9),
                            name: name,
                            email: email,
                            avatar: `https://ui-avatars.com/api/?name=${name}&background=d4af37&color=fff`,
                        };

                        set({ user: mockUser, isAuthenticated: true });
                        return true;
                    }
                    return false;
                } catch (error) {
                    console.error('Registration error:', error);
                    return false;
                }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'azebot_auth_storage', // Item name in localStorage
        }
    )
);
