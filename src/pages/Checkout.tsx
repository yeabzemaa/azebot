'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { sendOTP, verifyOTP } from '@/lib/verification';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user, isAuthenticated, requireAuth } = useAuth();

  const [step, setStep] = useState<'info' | 'verify' | 'complete'>('info');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping info
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');

  // Protect route and autofill user info
  useEffect(() => {
    if (!isAuthenticated) {
      requireAuth('/checkout');
      navigate('/login');
    } else if (user) {
      if (user.name) setFullName(user.name);
      if (user.email) {
        setContact(user.email);
        setContactMethod('email');
      }
    }
  }, [isAuthenticated, navigate, requireAuth, user]);

  if (!isAuthenticated) {
    return null; // Don't render checkout content until authenticated
  }

  if (cart.items.length === 0 && step !== 'complete') {
    return (
      <Container className="py-16 text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact) {
      setError('Please enter your email or phone number');
      return;
    }

    if (!fullName || !address1 || !city || !region || !phone) {
      setError('Please fill in all required shipping information');
      return;
    }

    setIsLoading(true);
    try {
      await sendOTP(contact);
      setStep('verify');
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
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
        setStep('complete');
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
        }, 3000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-[--soft-cream] flex items-center justify-center">
        <Container className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[--ethiopian-green] text-white mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="mb-4">Order Confirmed!</h1>
          <p className="text-[--warm-grey] mb-8 max-w-md mx-auto">
            Thank you for your order. We&apos;ve sent a confirmation to {contact}. Your order will be shipped soon.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      <Container className="py-8">
        <h1 className="mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="mb-6">Shipping Information</h3>
              <form onSubmit={handleSendOTP} className="space-y-4">
                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={setFullName}
                  required
                  disabled={step === 'verify'}
                />

                <Input
                  label="Address Line 1"
                  value={address1}
                  onChange={setAddress1}
                  required
                  disabled={step === 'verify'}
                />

                <Input
                  label="Address Line 2 (Optional)"
                  value={address2}
                  onChange={setAddress2}
                  disabled={step === 'verify'}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={city}
                    onChange={setCity}
                    required
                    disabled={step === 'verify'}
                  />

                  <Input
                    label="Region"
                    value={region}
                    onChange={setRegion}
                    required
                    disabled={step === 'verify'}
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  disabled={step === 'verify'}
                  icon={<Phone className="w-4 h-4" />}
                />

                <div className="pt-4 border-t border-[--linen-beige]">
                  <h3 className="mb-4">Contact Verification</h3>
                  <p className="text-sm text-[--warm-grey] mb-4">
                    We&apos;ll send a verification code to confirm your order. For demo purposes, use code: <strong>123456</strong>
                  </p>

                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${contactMethod === 'email'
                        ? 'border-[--azebot-gold] bg-[--azebot-gold]/5'
                        : 'border-[--warm-grey]/30'
                        }`}
                      disabled={step === 'verify'}
                    >
                      <Mail className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm">Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${contactMethod === 'phone'
                        ? 'border-[--azebot-gold] bg-[--azebot-gold]/5'
                        : 'border-[--warm-grey]/30'
                        }`}
                      disabled={step === 'verify'}
                    >
                      <Phone className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm">Phone</span>
                    </button>
                  </div>

                  <Input
                    label={contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    type={contactMethod === 'email' ? 'email' : 'tel'}
                    value={contact}
                    onChange={setContact}
                    required
                    disabled={step === 'verify'}
                    icon={contactMethod === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-[--sacred-red]/10 text-[--sacred-red] rounded-md text-sm">
                    {error}
                  </div>
                )}

                {step === 'info' && (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    className="w-full"
                  >
                    Send Verification Code
                  </Button>
                )}
              </form>
            </div>

            {/* OTP Verification */}
            {step === 'verify' && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="mb-4">Enter Verification Code</h3>
                <p className="text-sm text-[--warm-grey] mb-6">
                  We&apos;ve sent a 6-digit code to {contact}. Enter it below to complete your order.
                </p>

                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <Input
                    label="Verification Code"
                    type="text"
                    value={otp}
                    onChange={setOtp}
                    placeholder="Enter 6-digit code"
                    required
                    className="text-center text-2xl tracking-widest"
                  />

                  {error && (
                    <div className="p-3 bg-[--sacred-red]/10 text-[--sacred-red] rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep('info')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isLoading}
                      className="flex-1"
                    >
                      Verify & Place Order
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary subtotal={total} showActions={false} />
          </div>
        </div>
      </Container>
    </div>
  );
}

