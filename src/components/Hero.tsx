import React from 'react';
import { ArrowRight, Sparkles, Smile, ShieldCheck, Heart, Camera } from 'lucide-react';
import { imgPhotoStationery } from '../data/products';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenPhotoStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onOpenPhotoStudio,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#F7D6C8] bg-gradient-to-b from-[#FFFDF9] to-[#FFF5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Prose & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#E07A5F] tracking-wider uppercase font-bold">
              <span>Super Cute Stationery</span>
              <span aria-hidden="true">·</span>
              <span>DIY Craft Kits</span>
              <span aria-hidden="true">·</span>
              <span>Custom Photo Prints</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#2B2D42] leading-[1.12] text-balance">
              Cute stationery, DIY fun &amp; custom photo memories.
            </h1>

            <p className="text-base sm:text-lg text-[#6C757D] leading-relaxed max-w-xl font-sans">
              Welcome to <strong>MS.DIY</strong>! The happiest stationery store for creative kids, students,
              and desk lovers. Shop adorable pastel supplies or upload your own photos to print on
              spiral journals, stickers, and acrylic desk stands!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPhotoStudio}
                className="px-6 py-3.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <Camera className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Upload Photo &amp; Customize</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollection}
                className="px-6 py-3.5 bg-white hover:bg-[#FFF2EE] text-[#2B2D42] border-2 border-[#F7D6C8] text-sm font-bold rounded-2xl transition-colors cursor-pointer"
              >
                Explore Supplies &amp; Kits
              </button>
            </div>

            {/* Trust Proof Pillars - Child-Friendly & Accessible */}
            <div className="pt-6 border-t border-[#F7D6C8] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl text-[#E07A5F] font-bold tabular-nums flex items-center gap-1">
                  <span>100%</span>
                  <Smile className="w-4 h-4 text-amber-500 inline" />
                </div>
                <div className="text-xs text-[#6C757D] mt-0.5">Child-Safe Non-Toxic</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#E07A5F] font-bold tabular-nums">
                  HD
                </div>
                <div className="text-xs text-[#6C757D] mt-0.5">Gloss Photo Quality</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#E07A5F] font-bold tabular-nums">
                  256<span className="text-xs font-sans font-normal text-[#6C757D]">-bit</span>
                </div>
                <div className="text-xs text-[#6C757D] mt-0.5">Secure Checkout</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gradient-to-tr from-[#FFE5DD] to-[#FFF0EB]">
              <img
                src={imgPhotoStationery}
                alt="MS.DIY custom photo spiral journal and photo desk stationery"
                className="w-full h-full object-cover object-center transform hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating cute callout */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-[#F7D6C8] flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF0EB] text-[#E07A5F] flex items-center justify-center font-bold text-lg">
                    📸
                  </div>
                  <div>
                    <div className="text-xs text-[#E07A5F] font-bold uppercase tracking-wider">Try MS.DIY Photo Studio</div>
                    <div className="font-serif text-sm text-[#2B2D42] font-bold">Turn any drawing or pet photo into stationery!</div>
                  </div>
                </div>
                <button
                  onClick={onOpenPhotoStudio}
                  className="px-3.5 py-2 bg-[#E07A5F] text-white text-xs font-bold rounded-xl hover:bg-[#CC684F] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
