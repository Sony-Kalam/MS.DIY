import React from 'react';
import { Sparkles, Heart, Smile, BookOpen, PenTool, CheckCircle, Camera } from 'lucide-react';
import { imgCreativeKids } from '../data/products';

interface KidsStudySectionProps {
  onBrowseKids: () => void;
  onOpenPhotoStudio: () => void;
}

export const KidsStudySection: React.FC<KidsStudySectionProps> = ({
  onBrowseKids,
  onOpenPhotoStudio,
}) => {
  return (
    <section id="kids-favorites" className="py-16 lg:py-24 bg-[#FFF5EE] border-b border-[#F7D6C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase (Left) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white aspect-[4/3] bg-white">
              <img
                src={imgCreativeKids}
                alt="Cute and playful stationery set for children and creative students"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#E07A5F] shadow-sm flex items-center gap-1.5 border border-[#F7D6C8]">
                <Smile className="w-4 h-4 text-amber-500" />
                <span>Loved by kids ages 5 to 15 &amp; fun stationery fans!</span>
              </div>
            </div>
          </div>

          {/* Content (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#E07A5F] tracking-wider uppercase font-bold">
              <span>🌈 The MS.DIY Kids' Corner</span>
              <span aria-hidden="true">·</span>
              <span>Screen-Free Joy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2D42] tracking-tight text-balance font-bold">
              Super cute, colorful &amp; 100% safe for little hands.
            </h2>

            <p className="text-sm sm:text-base text-[#6C757D] leading-relaxed">
              At <strong>MS.DIY</strong>, we believe every child is an artist! From woodland animal sticky tabs
              and cloud-shaped safety scissors to custom spiral journals printed with their very own crayon artwork,
              our supplies bring big smiles to school desks and crafting tables.
            </p>

            {/* 3 Friendly Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-[#FFF0EB] text-[#E07A5F] mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B2D42]">100% Child-Safe &amp; Non-Toxic</h4>
                  <p className="text-xs text-[#6C757D]">
                    Water-based dyes, solvent-free adhesives, and rounded safety tips certified safe for kids.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-[#FFF0EB] text-[#E07A5F] mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B2D42]">Turn Crayon Art into Real Notebooks</h4>
                  <p className="text-xs text-[#6C757D]">
                    Snap a photo of your child’s drawing and print it on a real spiral notebook or sticker pack!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-[#FFF0EB] text-[#E07A5F] mt-0.5">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2B2D42]">Instant-Drying Smudge-Proof Inks</h4>
                  <p className="text-xs text-[#6C757D]">
                    Zero smears on homework, worksheets, or hands—perfect for left-handed young writers!
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onBrowseKids}
                className="px-5 py-3 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-xs font-bold rounded-2xl transition-all shadow-xs cursor-pointer"
              >
                Shop Kids' Favorites 🧸
              </button>

              <button
                onClick={onOpenPhotoStudio}
                className="px-5 py-3 bg-white hover:bg-[#FFF2EE] text-[#2B2D42] border-2 border-[#F7D6C8] text-xs font-bold rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Upload Kid's Drawing Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
