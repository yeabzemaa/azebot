import { Link } from 'react-router-dom';
import { Facebook, Instagram, Send, Video } from 'lucide-react';
import { Container } from './Container';
import { TibebPattern, EthiopianCross } from '@/components/ui/EthiopianPatterns';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Women', href: '/shop?category=women' },
      { name: 'Men', href: '/shop?category=men' },
      { name: 'Kids', href: '/shop?category=kids' },
      { name: 'Accessories', href: '/shop?category=accessories' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Our Story', href: '/about#story' },
    ],
    support: [
      { name: 'Shipping Info', href: '/contact#shipping' },
      { name: 'Returns', href: '/contact#returns' },
      { name: 'Size Guide', href: '/contact#sizing' },
      { name: 'FAQ', href: '/contact#faq' },
    ],
  };

  return (
    <footer className="bg-white mt-20 border-t border-[--linen-beige]">
      {/* Tibeb Border Top */}
      <div className="w-full h-2">
        <TibebPattern className="w-full h-full" />
      </div>

      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-gold shimmer-gold shadow-lg">
                <span className="text-white text-xl md:text-2xl font-elegant">A</span>
              </div>
              <span className="text-2xl font-elegant text-[--deep-charcoal]">Azebot</span>
            </div>
            <p className="text-[--warm-grey] mb-4 max-w-sm leading-relaxed">
              Celebrating Ethiopian heritage through modern, accessible fashion. Each piece tells a story of culture, craftsmanship, and community.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[--deep-charcoal]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[--deep-charcoal]" />
              </a>
              <a
                href="https://telegram.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 text-[--deep-charcoal]" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5 text-[--deep-charcoal] fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.38 6.38 0 0 1-1.89-1.89c-.01 1.44-.01 2.89-.01 4.33 0 2.87-.25 5.85-2 8.23-1.63 2.22-4.4 3.4-7.07 3.26-2.73-.13-5.26-1.74-6.49-4.19-1.39-2.73-.83-6.26 1.48-8.4a6.66 6.66 0 0 1 5.31-1.7v4.01c-1.38-.2-2.83.21-3.79 1.25-.86.94-1.12 2.3-.61 3.51.52 1.24 1.83 2.05 3.16 2.02 1.43.05 2.76-.92 3.12-2.31.2-.74.19-1.52.19-2.29V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-elegant text-[--deep-charcoal] font-semibold">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[--warm-grey] hover:text-[--azebot-gold] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-elegant text-[--deep-charcoal] font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[--warm-grey] hover:text-[--azebot-gold] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-elegant text-[--deep-charcoal] font-semibold">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[--warm-grey] hover:text-[--azebot-gold] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center py-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-md"></div>
          <EthiopianCross className="w-8 h-8 mx-4 flex-shrink-0" color="var(--azebot-gold)" />
          <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent w-full max-w-md"></div>
        </div>

        {/* Bottom */}
        <div className="pb-6 text-center text-sm">
          <p className="mb-2 text-[--warm-grey]">
            &copy; {currentYear} <span className="font-elegant text-[--azebot-gold] font-semibold">Azebot</span>. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-2 text-[--warm-grey]">
            Handcrafted with <span className="text-[--sacred-red] text-lg">❤️</span> in <span className="font-elegant text-[--azebot-gold] font-semibold">Ethiopia</span>
          </p>
        </div>
      </Container>

      {/* Subtle Bottom Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent opacity-30"></div>
    </footer>
  );
}