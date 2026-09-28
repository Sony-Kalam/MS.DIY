import React from 'react';
import { Eye, Plus, Star, Sparkles, Camera } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onCustomPhotoClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onCustomPhotoClick,
}) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isCustomPhotoItem && onCustomPhotoClick) {
      onCustomPhotoClick();
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-3xl border-2 border-[#F7D6C8]/70 hover:border-[#E07A5F] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer relative"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-[#FFF5EE] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Cute tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 text-xs font-bold tracking-wide text-[#E07A5F] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-[#F7D6C8]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{product.tag}</span>
          </div>
        )}

        {/* Child Safe Badge */}
        {product.suitableForKids && (
          <div className="absolute top-3 right-3 text-[10px] font-bold text-[#2B2D42] bg-[#E8F8F5] px-2 py-0.5 rounded-full border border-[#A8E6CF]">
            Kid Safe 🧸
          </div>
        )}

        {/* Quick action buttons on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 bg-white text-[#2B2D42] rounded-xl shadow-md hover:bg-slate-50 transition-all transform translate-y-2 group-hover:translate-y-0 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Details</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2 bg-[#E07A5F] text-white rounded-xl shadow-md hover:bg-[#CC684F] transition-all transform translate-y-2 group-hover:translate-y-0 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            aria-label="Add to bag"
          >
            {product.isCustomPhotoItem ? (
              <>
                <Camera className="w-3.5 h-3.5 text-amber-200" />
                <span>Upload Photo</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="text-xs text-[#E07A5F] font-bold flex items-center justify-between mb-1.5">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono text-xs tabular-nums text-[#2B2D42] font-bold">
                {product.rating}
              </span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-bold text-[#2B2D42] group-hover:text-[#E07A5F] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#6C757D] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F8EBE3] flex items-center justify-between">
          <div className="font-mono text-base font-bold text-[#2B2D42] tabular-nums">
            ${product.price.toFixed(2)}
          </div>

          <span className="text-xs font-bold text-[#E07A5F] group-hover:underline">
            {product.isCustomPhotoItem ? '📸 Custom Photo →' : 'Quick View →'}
          </span>
        </div>
      </div>
    </div>
  );
};
