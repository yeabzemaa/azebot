import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[--deep-charcoal]" />
              </a>
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-[--linen-beige] rounded-full transition-all hover-lift border border-[--linen-beige]"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[--deep-charcoal]" />
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