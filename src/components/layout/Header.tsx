'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User, LogOut, Heart, Package } from 'lucide-react';
import { Container } from './Container';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSwitcher, CurrencySwitcher } from '@/components/ui/LanguageCurrencySwitcher';
import { TibebPattern } from '@/components/ui/EthiopianPatterns';

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-md">
      {/* Tibeb Border Top */}
      <div className="w-full h-2">
        <TibebPattern className="w-full h-full" />
      </div>

      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Ethiopian Touch */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-gold shimmer-gold shadow-lg">
              <span className="text-white text-xl md:text-2xl font-elegant">A</span>
            </div>
            <span className="text-xl md:text-2xl font-elegant tracking-tight group-hover:text-[--azebot-gold] transition-colors">
              Azebot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[--deep-charcoal] hover:text-[--azebot-gold] transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            {/* Currency Switcher - Desktop */}
            <div className="hidden md:flex">
              <CurrencySwitcher />
            </div>

            {/* User Profile or Login */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-[--linen-beige] rounded-full transition-colors"
                  aria-label="User menu"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-[--linen-beige] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[--linen-beige]">
                      <p className="text-sm font-semibold text-[--deep-charcoal]">{user?.name}</p>
                      <p className="text-xs text-[--warm-grey] truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[--linen-beige] transition-colors"
                    >
                      <User className="w-4 h-4 text-[--warm-grey]" />
                      <span className="text-sm text-[--deep-charcoal]">My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[--linen-beige] transition-colors"
                    >
                      <Package className="w-4 h-4 text-[--warm-grey]" />
                      <span className="text-sm text-[--deep-charcoal]">My Orders</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[--linen-beige] transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[--warm-grey]" />
                      <span className="text-sm text-[--deep-charcoal]">Wishlist</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left border-t border-[--linen-beige]"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-gold text-white rounded-lg hover-lift font-medium transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-[--linen-beige] rounded-full transition-colors group"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover:text-[--azebot-gold] transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[--linen-beige] rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[--linen-beige] bg-[--soft-cream]/50 backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-2 text-[--deep-charcoal] hover:text-[--azebot-gold] hover:bg-[--linen-beige] rounded-lg transition-all font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language & Currency */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-[--linen-beige]">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
          </nav>
        )}
      </Container>

      {/* Subtle Bottom Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent opacity-30"></div>
    </header>
  );
}