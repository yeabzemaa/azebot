'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, CheckCircle, Package, Mail } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api, ENDPOINTS } from '@/lib/api';

export default function PaymentProofPage() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');
    const [proofImage, setProofImage] = useState<File | null>(null);

    useEffect(() => {
        // Validate state presence
        if (!location.state?.orderNumber || !location.state?.email) {
            setError('Invalid access. Please checkout first.');
        } else {
            setOrderNumber(location.state.orderNumber);
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProofImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!proofImage) {
            setError('Please upload your payment receipt.');
            return;
        }

        if (!orderNumber || !email) {
            setError('Missing order information. Please try checking out again.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('product_id', orderNumber); // Sending Order Number as product_id based on assumption that backend links proof to identifier
            formData.append('quantity', '1'); // Default value as field is required by backend schema
            formData.append('email', email);
            formData.append('proof_image', proofImage);

            await api.postFormData(ENDPOINTS.ORDERS.PURCHASE_PROOF, formData);
            setIsSuccess(true);
        } catch (err: any) {
            console.error('Submission failed:', err);
            setError(err.message || 'Failed to submit payment proof. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[--soft-cream] flex items-center justify-center p-4">
                <Container className="text-center py-16 bg-white rounded-lg shadow-sm border border-[--linen-beige] max-w-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[--ethiopian-green] text-white mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="mb-4">Proof Submitted!</h2>
                    <p className="text-[--warm-grey] mb-8">
                        Thank you for sending your payment receipt. We will verify your payment and process your order shortly.
                    </p>
                    <Button variant="primary" onClick={() => window.location.href = '/'}>
                        Return Home
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[--soft-cream] py-12">
            <Container className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border border-[--linen-beige] overflow-hidden">
                    <div className="p-6 border-b border-[--linen-beige] bg-[--linen-beige]/20">
                        <h1 className="text-2xl font-serif text-[--deep-charcoal]">Upload Payment Proof</h1>
                        <p className="text-[--warm-grey] mt-2">
                            Please attach the payment receipt for Order #{orderNumber}.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                <Package className="w-5 h-5 text-[--azebot-gold]" />
                                Order Details
                            </h3>

                            {/* Order Details Hidden/Read-only */}
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-[--soft-cream]/50 rounded-lg border border-[--linen-beige]">
                                <div>
                                    <label className="text-sm font-medium text-[--warm-grey] block mb-1">Order Number</label>
                                    <p className="text-[--deep-charcoal] font-medium font-mono">{orderNumber || '...'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[--warm-grey] block mb-1">Email</label>
                                    <p className="text-[--deep-charcoal] font-medium">{email || '...'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[--linen-beige] space-y-4">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                <Upload className="w-5 h-5 text-[--azebot-gold]" />
                                Payment Receipt
                            </h3>

                            <div className="border-2 border-dashed border-[--linen-beige] rounded-lg p-8 text-center hover:border-[--azebot-gold] transition-colors bg-[--soft-cream]/50">
                                <input
                                    type="file"
                                    id="proof-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                />
                                <label
                                    htmlFor="proof-upload"
                                    className="cursor-pointer flex flex-col items-center gap-2"
                                >
                                    <Upload className="w-8 h-8 text-[--warm-grey]" />
                                    <span className="text-[--deep-charcoal] font-medium">
                                        {proofImage ? proofImage.name : 'Click to upload receipt image'}
                                    </span>
                                    <span className="text-sm text-[--warm-grey]">
                                        Supported formats: JPG, PNG, PDF
                                    </span>
                                </label>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-[--sacred-red]/10 text-[--sacred-red] rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="pt-6">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                loading={isLoading}
                            >
                                Submit Payment Proof
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}
