import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Camera, Heart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onOpenPhotoStudio: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onQuickView,
  onOpenPhotoStudio,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyKidsFriendly, setOnlyKidsFriendly] = useState(false);

  const categories: { id: ProductCategory; label: string; emoji: string }[] = [
    { id: 'all', label: 'All Cute Goods', emoji: '✨' },
    { id: 'diy-crafts', label: 'DIY Crafts & Photo', emoji: '🎨' },
    { id: 'pens-markers', label: 'Pastel Pens & Inks', emoji: '✏️' },
    { id: 'desk-fun', label: 'Cute Desk Organizers', emoji: '🧸' },
    { id: 'kids-favorites', label: "Kids' Favorites", emoji: '🌈' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        if (onlyKidsFriendly && !p.suitableForKids) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          return matchName || matchDesc || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, activeCategory, onlyKidsFriendly, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 lg:py-24 border-b border-[#F7D6C8] bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs text-[#E07A5F] tracking-wider uppercase font-bold mb-1 flex items-center gap-1.5">
              <span>MS.DIY Shop</span>
              <span aria-hidden="true">·</span>
              <span>Cute &amp; Friendly Supplies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2D42] tracking-tight">
              Stationery &amp; DIY Craft Delights
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Child friendly toggle */}
            <button
              onClick={() => setOnlyKidsFriendly(!onlyKidsFriendly)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyKidsFriendly
                  ? 'bg-[#E8F8F5] border-[#A8E6CF] text-[#2A7B66] shadow-xs'
                  : 'bg-white border-[#F7D6C8] text-[#4A4E69] hover:bg-[#FFF0EB]'
              }`}
            >
              <span>🧸 Safe for Kids &amp; Students</span>
              {onlyKidsFriendly && <span className="text-[11px] font-mono">✓</span>}
            </button>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border-2 border-[#F7D6C8] rounded-xl text-xs font-bold text-[#2B2D42] py-2 pl-3.5 pr-8 focus:outline-none focus:border-[#E07A5F] cursor-pointer"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="price-asc">Price: Lowest First</option>
                <option value="price-desc">Price: Highest First</option>
                <option value="rating">Top Rated by Kids &amp; Crafters</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#E07A5F] absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#E07A5F] text-white shadow-sm'
                  : 'bg-white border-2 border-[#F7D6C8]/70 text-[#4A4E69] hover:bg-[#FFF0EB] hover:text-[#E07A5F]'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results kicker */}
        <div className="text-xs text-[#6C757D] mb-6 flex items-center justify-between">
          <div>
            Showing <span className="font-mono tabular-nums font-bold text-[#2B2D42]">{filteredProducts.length}</span> items
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <button
            onClick={onOpenPhotoStudio}
            className="text-xs text-[#E07A5F] font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Want your own photo on a notebook or stickers? Click here!</span>
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onCustomPhotoClick={onOpenPhotoStudio}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border-2 border-[#F7D6C8]">
            <div className="w-12 h-12 rounded-full bg-[#FFF0EB] mx-auto flex items-center justify-center text-[#E07A5F] mb-3">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B2D42]">No supplies found</h3>
            <p className="text-xs text-[#6C757D] mt-1 max-w-sm mx-auto">
              We couldn't find items matching your search. Try resetting filters to explore all cute supplies!
            </p>
            <button
              onClick={() => {
                onCategoryChange('all');
                setOnlyKidsFriendly(false);
              }}
              className="mt-4 px-5 py-2.5 bg-[#E07A5F] text-white text-xs font-bold rounded-xl hover:bg-[#CC684F] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
