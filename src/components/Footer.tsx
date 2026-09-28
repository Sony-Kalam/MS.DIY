import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPhotoStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPhotoStudio }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#2B2D42] text-white pt-16 pb-12 font-sans border-t-4 border-[#E07A5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-700">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#FFB7B2]">MS.DIY</span>
              <span className="text-xl">✨</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The happiest stationery store &amp; custom photo craft studio for creative kids, students,
              teachers, and stationery lovers everywhere.
            </p>
            <div className="pt-2 text-xs text-[#A8E6CF] flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#A8E6CF]" />
              <span>100% Non-Toxic · Safe for Children · 256-Bit SSL Checkout</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FFDAC1] font-bold">
              Cute Goods
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Stationery
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPhotoStudio}
                  className="hover:text-white transition-colors cursor-pointer text-[#FFB7B2] font-bold"
                >
                  📸 Upload Photo DIY
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diy-kits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  DIY Craft Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kids-favorites')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kids' Favorites 🧸
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pastel Pens &amp; Inks
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FFDAC1] font-bold">
              MS.DIY Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <span className="text-slate-400">Shipping:</span> Free on orders over $40
              </li>
              <li>
                <span className="text-slate-400">Custom Photo Turnaround:</span> 48 Hours
              </li>
              <li>
                <span className="text-slate-400">School &amp; Birthday Packs:</span> hello@msdiy.com
              </li>
              <li>
                <span className="text-slate-400">Happiness Guarantee:</span> 30-Day Free Returns
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FFDAC1] font-bold">
              Join the MS.DIY Club!
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get free printable coloring pages, new pastel drops, and 10% off your first order!
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/60 rounded-xl text-xs text-[#A8E6CF] flex items-center gap-2 border border-emerald-700">
                <Check className="w-4 h-4" />
                <span>You're in the club! Use code <strong>MSDIY10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2 text-xs bg-slate-800 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E07A5F]"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Join &amp; Get 10% Off ✨
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 MS.DIY Studio. All cute rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms &amp; Fun</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Child Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
