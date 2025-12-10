'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { TibebPattern, EthiopianCross } from '@/components/ui/EthiopianPatterns';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                // Check for redirect URL
                const redirectUrl = sessionStorage.getItem('auth_redirect');
                sessionStorage.removeItem('auth_redirect');
                navigate(redirectUrl || '/');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-warm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pattern-woven">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="cultural-card shadow-2xl">
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold shimmer-gold shadow-lg">
                                <span className="text-white text-3xl font-elegant">A</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-elegant text-[--deep-charcoal] mb-2">Welcome Back</h1>
                        <p className="text-[--warm-grey]">Sign in to continue shopping</p>
                    </div>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-xs"></div>
                        <EthiopianCross className="w-6 h-6 mx-3 flex-shrink-0" color="var(--azebot-gold)" />
                        <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-xs"></div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[--deep-charcoal] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--warm-grey]" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="you@example.com"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[--deep-charcoal] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--warm-grey]" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--warm-grey] hover:text-[--azebot-gold] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-[--azebot-gold] border-[--linen-beige] rounded focus:ring-[--azebot-gold]"
                                />
                                <span className="ml-2 text-sm text-[--warm-grey]">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-[--azebot-gold] hover:text-[--amber-gold] transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full hover-lift"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[--linen-beige]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[--raw-cotton] text-[--warm-grey]">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[--linen-beige] rounded-lg hover:bg-[--linen-beige] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-sm font-medium text-[--deep-charcoal]">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[--linen-beige] rounded-lg hover:bg-[--linen-beige] transition-colors">
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-sm font-medium text-[--deep-charcoal]">Facebook</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-[--warm-grey]">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[--azebot-gold] hover:text-[--amber-gold] font-semibold transition-colors">
                            Create one now
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-sm text-[--warm-grey] hover:text-[--azebot-gold] transition-colors">
                        ← Back to shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
