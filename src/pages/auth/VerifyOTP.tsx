'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendOTP, verifyOTP } from '@/lib/verification';
import { EthiopianCross } from '@/components/ui/EthiopianPatterns';

export default function VerifyOTPPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        // Get contact (email or phone) from navigation state or session
        const stateContact = location.state?.contact; // Fixed: was location.state?.email
        const storedContact = sessionStorage.getItem('otp_contact');

        console.log('[VerifyOTP] State contact:', stateContact);
        console.log('[VerifyOTP] Stored contact:', storedContact);

        const finalContact = stateContact || storedContact;

        if (finalContact) {
            setContact(finalContact);
            console.log('[VerifyOTP] Using contact:', finalContact);
            // Auto-send OTP on load if not already sent recently
            if (!sessionStorage.getItem('otp_sent_at')) {
                console.log('[VerifyOTP] Auto-sending OTP');
                sendOTP(finalContact);
                sessionStorage.setItem('otp_sent_at', Date.now().toString());
            }
        } else {
            console.error('[VerifyOTP] No contact found, redirecting to login');
            // If no contact found, redirect back to login
            navigate('/login');
        }
    }, [location.state, navigate]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (otp.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        setIsLoading(true);
        try {
            const verified = await verifyOTP(contact, otp);
            if (verified) {
                // Success! Redirect to home or intended destination
                navigate('/');
            } else {
                setError('Invalid code. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setIsLoading(true);
        try {
            await sendOTP(contact);
            // Show success toast or message?
            alert(`Code resent to ${contact}`);
        } catch (err) {
            setError('Failed to resend code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[--linen-beige] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pattern-woven">
            <div className="max-w-md w-full">
                <div className="cultural-card shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold shimmer-gold shadow-lg">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-elegant text-gray-900 mb-2">Verify Account</h1>
                        <p className="text-gray-600">
                            We've sent a 6-digit verification code to<br />
                            <span className="font-semibold text-gray-900">{contact}</span>
                        </p>
                    </div>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-xs"></div>
                        <EthiopianCross className="w-6 h-6 mx-3 flex-shrink-0" color="var(--azebot-gold)" />
                        <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-xs"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <Input
                                label="Verification Code"
                                value={otp}
                                onChange={setOtp}
                                placeholder="123456"
                                className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={isLoading}
                        >
                            Verify Email
                        </Button>
                    </form>

                    {/* Resend */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResend}
                                className="text-[--azebot-gold] font-semibold hover:underline"
                                disabled={isLoading}
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
