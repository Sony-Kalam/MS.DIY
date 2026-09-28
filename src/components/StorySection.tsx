import React from 'react';
import { imgDiyCraftSupplies } from '../data/products';
import { Sparkles, Heart, Palette, Smile } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="diy-kits" className="py-16 lg:py-24 border-b border-[#F7D6C8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#E07A5F] tracking-wider uppercase font-bold">
              <span>The MS.DIY Story</span>
              <span aria-hidden="true">·</span>
              <span>Crafting With Heart</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2D42] tracking-tight leading-tight font-bold">
              Making everyday study, journaling &amp; crafting feel like pure fun.
            </h2>

            <p className="text-sm sm:text-base text-[#6C757D] leading-relaxed">
              <strong>MS.DIY</strong> started with a simple belief: stationery shouldn’t be boring or grey!
              Whether you are an adult bullet journaler wanting a pastel desk oasis, a student highlighting biology notes,
              or a child authoring their first comic strip, our colorful kits bring joyful tactile happiness.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E07A5F]">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#2B2D42]">Vibrant &amp; Pastel</span>
                </div>
                <p className="text-xs text-[#6C757D]">
                  Curated color palettes that are cheerful, aesthetic, and delightful to organize on any desk.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E07A5F]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#2B2D42]">Easy DIY Crafting</span>
                </div>
                <p className="text-xs text-[#6C757D]">
                  Beginner-friendly wax sealing kits, washi tapes, and snap-in photo keyrings anyone can make.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E07A5F]">
                  <Smile className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#2B2D42]">Kid Tested &amp; Loved</span>
                </div>
                <p className="text-xs text-[#6C757D]">
                  Tested by elementary and middle schoolers for fun factor, comfort, and durability.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E07A5F]">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold text-[#2B2D42]">Quality Guaranteed</span>
                </div>
                <p className="text-xs text-[#6C757D]">
                  Heavy bleed-resistant papers and Japanese precision tips that won’t skip or smear.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#FFF5EE] aspect-[4/3]">
              <img
                src={imgDiyCraftSupplies}
                alt="Cute DIY craft supplies, pastel washi tapes, cloud scissors, and stamp kit"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-serif italic text-sm">"The cutest ideas start on a fresh piece of paper."</span>
                <span className="block text-[11px] opacity-80 mt-0.5">— MS.DIY Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
