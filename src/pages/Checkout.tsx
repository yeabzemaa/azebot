'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, CheckCircle, Smartphone, Globe, CreditCard, Building2, Wallet } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { sendOTP, verifyOTP } from '@/lib/verification';
import { api, ENDPOINTS } from '@/lib/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user, isAuthenticated, requireAuth } = useAuth();

  const [step, setStep] = useState<'info' | 'complete'>('info');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  // const [otp, setOtp] = useState(''); // OTP removed
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Payment Method State
  const [paymentScope, setPaymentScope] = useState<'local' | 'international'>('local');

  // Shipping info
  const [username, setUsername] = useState('');
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
    return null;
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact) {
      setError('Please enter your email or phone number');
      return;
    }

    if (!username || !fullName || !address1 || !city || !region || !phone) {
      setError('Please fill in all required shipping information');
      return;
    }

    setIsLoading(true);
    try {
      // Direct Order Creation (Bypassing OTP)
      const newOrderNumber = await createOrder();

      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 1000);

      // Redirect to payment proof for local payments
      if (paymentScope === 'local') {
        navigate('/payment-proof', {
          state: {
            orderNumber: newOrderNumber,
            email: contact
          }
        });
        return;
      }

      setOrderNumber(newOrderNumber);
      setStep('complete');

    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const orderItems = cart.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        color: item.selectedColor?.name || null,
        size: item.selectedSize || null,
      }));

      const payload = {
        email: contact, // Using verified contact
        username: username,
        shipping_address: {
          full_name: fullName,
          address1,
          address2,
          city,
          region,
          phone
        },
        payment_method: paymentScope === 'local' ? 'bank_transfer' : 'stripe',
        items: orderItems
      };

      const response = await api.post<{ order_number: string }>(ENDPOINTS.ORDERS.CHECKOUT, payload, true);
      return response.order_number;
    } catch (err: any) {
      console.error('Order creation failed:', err);
      throw new Error(err.message || 'Failed to create order');
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
          {orderNumber && <p className="text-xl font-bold mb-4">Order #{orderNumber}</p>}

          <p className="text-[--warm-grey] mb-8 max-w-md mx-auto">
            {paymentScope === 'local'
              ? `Thank you for your order. Please complete your bank transfer using the details below. We've sent instructions to ${contact}.`
              : `Thank you for your order. We've sent a confirmation to ${contact}. Your order will be shipped soon.`
            }
          </p>

          {paymentScope === 'local' && (
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto mb-8 border border-[--linen-beige]">
              <h3 className="text-lg font-semibold mb-4 text-[--deep-charcoal]">Bank Transfer Details</h3>
              <div className="space-y-4 text-left">
                <div className="flex justify-between border-b border-[--linen-beige] pb-2">
                  <span className="text-[--warm-grey]">Bank:</span>
                  <span className="font-medium">Commercial Bank of Ethiopia</span>
                </div>
                <div className="flex justify-between border-b border-[--linen-beige] pb-2">
                  <span className="text-[--warm-grey]">Account Name:</span>
                  <span className="font-medium">Azebot Store PLC</span>
                </div>
                <div className="flex justify-between border-b border-[--linen-beige] pb-2">
                  <span className="text-[--warm-grey]">Account Number:</span>
                  <span className="font-medium">1000123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--warm-grey]">Telebirr:</span>
                  <span className="font-medium">+251 911 22 33 44</span>
                </div>
              </div>
            </div>
          )}

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
              {/* Payment Scope Selection */}
              <h3 className="mb-4">Payment Method</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentScope('local')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${paymentScope === 'local'
                    ? 'border-[--azebot-gold] bg-[--soft-cream]'
                    : 'border-[--linen-beige] hover:border-[--azebot-gold]/50'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${paymentScope === 'local' ? 'bg-[--azebot-gold] text-white' : 'bg-[--linen-beige] text-[--warm-grey]'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg text-[--deep-charcoal]">Local</span>
                  </div>
                  <p className="text-sm text-[--warm-grey]">Direct Bank Transfer / Telebirr</p>
                  {paymentScope === 'local' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-[--azebot-gold]" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentScope('international')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${paymentScope === 'international'
                    ? 'border-[--azebot-gold] bg-[--soft-cream]'
                    : 'border-[--linen-beige] hover:border-[--azebot-gold]/50'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${paymentScope === 'international' ? 'bg-[--azebot-gold] text-white' : 'bg-[--linen-beige] text-[--warm-grey]'}`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg text-[--deep-charcoal]">International</span>
                  </div>
                  <p className="text-sm text-[--warm-grey]">Credit Card (Stripe)</p>
                  {paymentScope === 'international' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-[--azebot-gold]" />
                    </div>
                  )}
                </button>
              </div>

              {/* Payment Details Preview */}
              {paymentScope === 'local' ? (
                <div className="mb-8 p-4 bg-[--soft-cream] rounded-lg border border-[--azebot-gold]/20">
                  <h4 className="flex items-center gap-2 font-medium text-[--deep-charcoal] mb-2">
                    <Wallet className="w-4 h-4 text-[--azebot-gold]" />
                    Bank Transfer Instructions
                  </h4>
                  <p className="text-sm text-[--warm-grey] leading-relaxed">
                    You will need to transfer the total amount to our Commercial Bank of Ethiopia or Telebirr account. Your order will be processed once we receive the payment confirmation. Account details will be shown after you place the order.
                  </p>
                </div>
              ) : (
                <div className="mb-8 p-4 bg-[--soft-cream] rounded-lg border border-[--azebot-gold]/20">
                  <h4 className="flex items-center gap-2 font-medium text-[--deep-charcoal] mb-2">
                    <CreditCard className="w-4 h-4 text-[--azebot-gold]" />
                    Secure Payment via Stripe
                  </h4>
                  <p className="text-sm text-[--warm-grey] leading-relaxed">
                    Pay securely using your Visa, Mastercard, or American Express. Redirects to Stripe's secure checkout (Coming Soon - Mock Integration).
                  </p>
                </div>
              )}

              <h3 className="mb-6 pt-6 border-t border-[--linen-beige]">Shipping Information</h3>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <Input
                  label="Username"
                  value={username}
                  onChange={setUsername}
                  required
                  placeholder="Enter your username"
                />

                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={setFullName}
                  required
                />

                <Input
                  label="Address Line 1"
                  value={address1}
                  onChange={setAddress1}
                  required
                />

                <Input
                  label="Address Line 2 (Optional)"
                  value={address2}
                  onChange={setAddress2}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={city}
                    onChange={setCity}
                    required
                  />

                  <Input
                    label="Region"
                    value={region}
                    onChange={setRegion}
                    required
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  icon={<Phone className="w-4 h-4" />}
                />

                <div className="pt-4 border-t border-[--linen-beige]">
                  <h3 className="mb-4">Contact Information</h3>
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${contactMethod === 'email'
                        ? 'border-[--azebot-gold] bg-[--azebot-gold]/5'
                        : 'border-[--warm-grey]/30'
                        }`}
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
                    {paymentScope === 'international' ? 'Pay with Stripe' : 'Place Order'}
                  </Button>
                )}
              </form>
            </div>


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

