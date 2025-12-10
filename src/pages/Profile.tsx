'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { EthiopianCross } from '@/components/ui/EthiopianPatterns';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, requireAuth } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            requireAuth('/profile');
            navigate('/login');
        }
    }, [isAuthenticated, navigate, requireAuth]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[--soft-cream] py-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-elegant mb-2">My Profile</h1>
                            <p className="text-[--warm-grey]">Manage your account and orders</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar / User Info */}
                        <div className="md:col-span-1 space-y-6">
                            {/* User Card */}
                            <div className="bg-white rounded-lg shadow-sm p-6 text-center border-t-4 border-[--azebot-gold]">
                                <div className="relative inline-block mx-auto mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=d4af37&color=fff`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-full shadow-sm">
                                        <EthiopianCross className="w-4 h-4 text-[--azebot-gold]" />
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                                <p className="text-[--warm-grey] text-sm break-all">{user.email}</p>
                            </div>

                            {/* Navigation */}
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <nav className="flex flex-col">
                                    <button className="flex items-center gap-3 px-6 py-4 bg-[--linen-beige]/30 text-[--azebot-gold] font-medium border-l-4 border-[--azebot-gold]">
                                        <User className="w-5 h-5" />
                                        Account Details
                                    </button>
                                    <button className="flex items-center gap-3 px-6 py-4 text-[--deep-charcoal] hover:bg-[--linen-beige]/30 transition-colors border-l-4 border-transparent">
                                        <Package className="w-5 h-5 text-[--warm-grey]" />
                                        Orders
                                    </button>
                                    <button className="flex items-center gap-3 px-6 py-4 text-[--deep-charcoal] hover:bg-[--linen-beige]/30 transition-colors border-l-4 border-transparent">
                                        <Heart className="w-5 h-5 text-[--warm-grey]" />
                                        Wishlist
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Recent Orders Placeholder */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-[--azebot-gold]" />
                                    Recent Orders
                                </h3>

                                <div className="text-center py-12 bg-[--soft-cream]/50 rounded-lg border border-dashed border-[--warm-grey]/30">
                                    <Package className="w-12 h-12 mx-auto text-[--warm-grey]/50 mb-4" />
                                    <p className="text-[--warm-grey] mb-2">No orders found</p>
                                    <Button variant="ghost" onClick={() => navigate('/shop')}>
                                        Start Shopping
                                    </Button>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-[--azebot-gold]" />
                                    Account Information
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[--warm-grey] mb-1">Full Name</label>
                                            <div className="p-3 bg-[--soft-cream] rounded-md text-[--deep-charcoal]">{user.name}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[--warm-grey] mb-1">Email Address</label>
                                            <div className="p-3 bg-[--soft-cream] rounded-md text-[--deep-charcoal]">{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
