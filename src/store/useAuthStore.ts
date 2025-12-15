import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthTokens, clearAuthTokens } from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    // Deprecated/Adapters for existing UI calls if needed, 
    // but ideally we switch to verifyOTP
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setAuth: (user, accessToken, refreshToken) => {
                setAuthTokens(accessToken, refreshToken);
                set({ user, isAuthenticated: true });
            },

            updateUser: (updates) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null
                }));
            },

            logout: () => {
                clearAuthTokens();
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'azebot_auth_storage',
        }
    )
);
