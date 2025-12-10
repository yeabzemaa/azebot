export const sendOTP = async (contact: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In dev, log the "sent" OTP
  console.log(`✉️ OTP sent to ${contact}: 123456`);
  
  // Store contact in session storage
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('otp_contact', contact);
    sessionStorage.setItem('otp_sent_at', Date.now().toString());
  }
  
  return true;
};

export const verifyOTP = async (contact: string, otp: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (typeof window === 'undefined') return false;
  
  const storedContact = sessionStorage.getItem('otp_contact');
  
  // Accept specific test code (123456) or any 6-digit code for demo purposes
  if (contact === storedContact && (otp === '123456' || /^\d{6}$/.test(otp))) {
    sessionStorage.setItem('verified_contact', contact);
    return true;
  }
  
  return false;
};

export const isVerified = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!sessionStorage.getItem('verified_contact');
};

export const getVerifiedContact = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('verified_contact');
};

export const clearVerification = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('otp_contact');
  sessionStorage.removeItem('otp_sent_at');
  sessionStorage.removeItem('verified_contact');
};
