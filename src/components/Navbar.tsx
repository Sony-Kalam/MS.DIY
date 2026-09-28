import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, X, Heart, Smile } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenChat,
}) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-[#F7D6C8] transition-all">
      {/* Friendly colorful announcement banner */}
      <div className="bg-gradient-to-r from-[#FF9AA2] via-[#FFB7B2] to-[#FFDAC1] text-[#4A3E3D] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>Welcome to MS.DIY! Free Shipping on orders over $40</span>
        </span>
        <span aria-hidden="true" className="opacity-40">·</span>
        <span className="font-bold text-[#8C3A27]">Use code MSDIY10 for 10% off</span>
      </div>

      {/* Main Top Bar strictly fulfilling 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#E07A5F] hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>MS.DIY</span>
          <span className="text-lg">✨</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#4A4E69]">
          <button
            onClick={() => onNavigate('collection')}
            className="hover:text-[#E07A5F] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            Stationery Shop
          </button>
          <button
            onClick={() => onNavigate('custom-photo-studio')}
            className="hover:text-[#E07A5F] transition-colors py-1 cursor-pointer flex items-center gap-1.5 text-[#E07A5F] bg-[#FFF0EB] px-3 py-1.5 rounded-full whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Upload Photo DIY</span>
          </button>
          <button
            onClick={() => onNavigate('diy-kits')}
            className="hover:text-[#E07A5F] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            DIY Craft Kits
          </button>
          <button
            onClick={() => onNavigate('kids-favorites')}
            className="hover:text-[#E07A5F] transition-colors py-1 cursor-pointer whitespace-nowrap flex items-center gap-1"
          >
            <span>Kids &amp; School</span>
            <Smile className="w-3.5 h-3.5 text-[#FFB7B2]" />
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          {showSearchInput ? (
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pens, tapes, DIY kits..."
                autoFocus
                className="w-48 sm:w-64 text-xs bg-white border-2 border-[#F7D6C8] rounded-xl py-1.5 pl-8 pr-7 text-[#2B2D42] placeholder:text-[#A0A4B8] focus:outline-none focus:border-[#E07A5F]"
              />
              <Search className="w-3.5 h-3.5 text-[#A0A4B8] absolute left-2.5 pointer-events-none" />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2 text-[#A0A4B8] hover:text-[#2B2D42]"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-[#4A4E69] hover:text-[#E07A5F] transition-colors rounded-xl hover:bg-[#FFF0EB]"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Live n8n Chat Trigger */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="p-2 text-[#4A4E69] hover:text-[#E07A5F] transition-colors rounded-xl hover:bg-[#FFF0EB] flex items-center gap-1.5 cursor-pointer"
              title="Chat with MS.DIY Assistant"
              aria-label="Open chat"
            >
              <span className="text-base">💬</span>
              <span className="hidden lg:inline text-xs font-bold text-[#E07A5F]">Chat</span>
            </button>
          )}

          {/* Cart Bag trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CC684F] rounded-xl transition-all shadow-xs cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-sans">Bag</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#E07A5F] text-[11px] font-mono tabular-nums flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
