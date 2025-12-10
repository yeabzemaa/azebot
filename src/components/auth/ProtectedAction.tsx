'use client';

import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { X, LogIn, UserPlus } from 'lucide-react';

interface ProtectedActionProps {
    children: ReactNode;
    fallback?: ReactNode;
    onAction?: () => void;
    className?: string;
    redirectTo?: string;
}

export function ProtectedAction({
    children,
    fallback,
    onAction,
    className = '',
    redirectTo
}: ProtectedActionProps) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (isAuthenticated) {
            if (onAction) {
                onAction();
            }
        } else {
            e.preventDefault();
            e.stopPropagation();

            // Store current location or specific redirect for post-login
            const redirectPath = redirectTo || location.pathname;
            sessionStorage.setItem('auth_redirect', redirectPath);

            setShowModal(true);
        }
    };

    const handleLogin = () => {
        navigate('/login');
        setShowModal(false);
    };

    const handleRegister = () => {
        navigate('/register');
        setShowModal(false);
    };

    if (isAuthenticated) {
        return (
            <div onClick={onAction} className={className}>
                {children}
            </div>
        );
    }

    return (
        <>
            <div onClick={handleClick} className={className}>
                {children}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowModal(false);
                            }}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 shimmer-gold">
                                <LogIn className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-elegant text-[--deep-charcoal] mb-2">
                                Sign in to continue
                            </h3>

                            <p className="text-[--warm-grey] mb-6">
                                Please sign in or create an account to access this feature. It only takes a moment!
                            </p>

                            <div className="space-y-3">
                                <Button
                                    width="full"
                                    variant="primary"
                                    icon={<LogIn className="w-4 h-4" />}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleLogin();
                                    }}
                                >
                                    Sign In
                                </Button>

                                <Button
                                    width="full"
                                    variant="outline"
                                    icon={<UserPlus className="w-4 h-4" />}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleRegister();
                                    }}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowModal(false);
                                }}
                                className="text-sm text-[--warm-grey] hover:text-[--deep-charcoal] transition-colors"
                            >
                                No thanks, I'll browse first
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
