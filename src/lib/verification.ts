import { api } from './api';
import { useAuthStore } from '@/store/useAuthStore';

interface OtpResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
}

export const sendOTP = async (contact: string): Promise<boolean> => {
  try {
    // Determine if email or phone (simple check)
    const isEmail = contact.includes('@');
    const payload = isEmail ? { email: contact } : { phone: contact };

    await api.post('/auth/send-otp/', payload);

    // Store contact in session storage for UI persistence
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('otp_contact', contact);
    }
    return true;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    return false;
  }
};

export const verifyOTP = async (contact: string, code: string): Promise<boolean> => {
  try {
    const isEmail = contact.includes('@');
    const payload = {
      [isEmail ? 'email' : 'phone']: contact,
      code: code
    };

    const response = await api.post<OtpResponse>('/auth/verify-otp/', payload);

    if (response.access && response.user) {
      // Map backend user to frontend user
      const user = {
        id: response.user.id,
        name: [response.user.first_name, response.user.last_name].filter(Boolean).join(' ') || contact.split('@')[0],
        email: response.user.email,
        phone: response.user.phone
      };

      // Update global auth store
      useAuthStore.getState().setAuth(user, response.access, response.refresh);

      // Clear session storage
      sessionStorage.removeItem('otp_contact');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to verify OTP:', error);
    return false;
  }
};

export const isVerified = (): boolean => {
  // Check global auth store
  return useAuthStore.getState().isAuthenticated;
};

export const getVerifiedContact = (): string | null => {
  const user = useAuthStore.getState().user;
  return user?.email || user?.phone || null;
};

export const clearVerification = (): void => {
  // Check if we want to logout? or just clear local session?
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('otp_contact');
  }
};
