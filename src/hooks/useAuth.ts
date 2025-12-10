import { useAuthStore } from '@/store/useAuthStore';

export function useAuth() {
    const store = useAuthStore();

    const requireAuth = (redirectUrl?: string): boolean => {
        if (!store.isAuthenticated) {
            if (redirectUrl) {
                sessionStorage.setItem('auth_redirect', redirectUrl);
            }
            return false;
        }
        return true;
    };

    return {
        ...store,
        requireAuth,
    };
}
