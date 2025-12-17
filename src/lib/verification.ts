import { api, ENDPOINTS } from './api';
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

    console.log('[sendOTP] Sending OTP to:', contact, 'Payload:', payload);

    const response = await api.post(ENDPOINTS.AUTH.SEND_OTP, payload);
    console.log('[sendOTP] Success! Response:', response);

    // Store contact in session storage for UI persistence
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('otp_contact', contact);
      sessionStorage.setItem('otp_sent_at', Date.now().toString());
    }
    return true;
  } catch (error: any) {
    console.error('[sendOTP] Failed to send OTP');
    console.error('[sendOTP] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error
    });
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

    console.log('[verifyOTP] Verifying OTP for:', contact, 'Code length:', code.length);
    console.log('[verifyOTP] Payload:', payload);

    const response = await api.post<OtpResponse>(ENDPOINTS.AUTH.VERIFY_OTP, payload);
    console.log('[verifyOTP] Success! Response:', response);

    if (response.access && response.user) {
      // Map backend user to frontend user
      const user = {
        id: response.user.id,
        name: [response.user.first_name, response.user.last_name].filter(Boolean).join(' ') || contact.split('@')[0],
        email: response.user.email,
        phone: response.user.phone
      };

      console.log('[verifyOTP] Setting auth for user:', user);
      // Update global auth store
      useAuthStore.getState().setAuth(user, response.access, response.refresh);

      // Clear session storage
      sessionStorage.removeItem('otp_contact');
      sessionStorage.removeItem('otp_sent_at');
      return true;
    }
    console.error('[verifyOTP] Invalid response - missing access token or user');
    return false;
  } catch (error: any) {
    console.error('[verifyOTP] Failed to verify OTP');
    console.error('[verifyOTP] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error
    });
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
