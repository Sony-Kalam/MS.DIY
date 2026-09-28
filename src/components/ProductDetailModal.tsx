import React, { useState, useEffect } from 'react';
import { X, Star, Check, ShieldCheck, Truck, RotateCcw, Sparkles, Camera, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenPhotoStudio: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenPhotoStudio,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setActiveTab('details');
    setAddedNotice(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (product.isCustomPhotoItem) {
      onClose();
      onOpenPhotoStudio();
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#F7D6C8] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-[#2B2D42] bg-white/90 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column (Left) */}
        <div className="md:w-1/2 bg-[#FFF9F5] p-6 sm:p-8 flex flex-col justify-between">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#F7D6C8]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 text-xs font-bold tracking-wide text-[#E07A5F] bg-white/95 px-3 py-1 rounded-full border border-[#F7D6C8] shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-[#F7D6C8] space-y-2 text-xs text-[#6C757D]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E07A5F]" />
              <span>Free delivery on orders over $40</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified child-safe, non-toxic materials</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#E07A5F]" />
              <span>30-day friendly return &amp; happiness guarantee</span>
            </div>
          </div>
        </div>

        {/* Details & Purchase Module (Right) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#E07A5F] font-bold mb-2">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-mono tabular-nums font-bold text-[#2B2D42]">
                  {product.rating}
                </span>
                <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2D42] leading-tight">
              {product.name}
            </h2>

            <div className="mt-3 font-mono text-2xl font-bold text-[#E07A5F] tabular-nums">
              ${product.price.toFixed(2)}
            </div>

            {/* Sub-Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#FFF0EB] rounded-xl mt-6 mb-4">
              {(['details', 'specs', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-[#E07A5F] shadow-xs'
                      : 'text-slate-600 hover:text-[#2B2D42]'
                  }`}
                >
                  {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab}
                </button>
              ))}
            </div>

            {/* Content Tabs */}
            <div className="text-xs sm:text-sm text-[#4A4E69] leading-relaxed min-h-[140px]">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  {product.suitableForKids && (
                    <div className="p-3 bg-[#E8F8F5] rounded-xl border border-[#A8E6CF] text-xs text-[#2A7B66] font-medium">
                      🧸 <strong>Kid Friendly:</strong> Rounded safety edges, quick-dry washable ink, and easy-to-use ergonomic grips.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <dt className="text-slate-400">Dimensions</dt>
                    <dd className="font-bold text-[#2B2D42] text-right">{product.specs.dimensions}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <dt className="text-slate-400">Materials</dt>
                    <dd className="font-bold text-[#2B2D42] text-right max-w-[200px] truncate">{product.specs.materials}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <dt className="text-slate-400">Origin</dt>
                    <dd className="font-bold text-[#2B2D42] text-right">{product.specs.origin}</dd>
                  </div>
                  <div className="pt-2">
                    <span className="font-bold text-[#2B2D42]">Key Features:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                      {product.specs.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </dl>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-[#FFF9F5] rounded-xl border border-[#F7D6C8]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#2B2D42]">{rev.author}</span>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="text-[11px] text-[#E07A5F] font-medium mb-1">{rev.role}</div>
                      <p className="text-xs text-[#4A4E69] italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
            {product.isCustomPhotoItem ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenPhotoStudio();
                }}
                className="w-full py-3.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Camera className="w-4 h-4 text-amber-200" />
                <span>Upload Photo in MS.DIY Studio</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-[#F7D6C8] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-[#FFF0EB] rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-mono text-xs tabular-nums font-bold text-[#2B2D42]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-[#FFF0EB] rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedNotice}
                  className="flex-1 py-3.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-80"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Bag! 🎉</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
