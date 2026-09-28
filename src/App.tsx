import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomPhotoStudio } from './components/CustomPhotoStudio';
import { ProductGrid } from './components/ProductGrid';
import { KidsStudySection } from './components/KidsStudySection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { N8nChat } from './components/N8nChat';

function MainStore() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPhotoStudio = () => {
    handleNavigate('custom-photo-studio');
  };

  const handleBrowseKids = () => {
    setActiveCategory('kids-favorites');
    handleNavigate('collection');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2D42] flex flex-col font-sans selection:bg-[#FFD6BA] selection:text-[#2B2D42]">
      {/* MS.DIY Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCollection={() => handleNavigate('collection')}
          onOpenPhotoStudio={handleOpenPhotoStudio}
        />

        {/* Brand New: Custom Photo Stationery Creator */}
        <CustomPhotoStudio />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onQuickView={(p) => setSelectedProduct(p)}
          onOpenPhotoStudio={handleOpenPhotoStudio}
        />

        {/* Kids & Young Crafters Spotlight */}
        <KidsStudySection
          onBrowseKids={handleBrowseKids}
          onOpenPhotoStudio={handleOpenPhotoStudio}
        />

        {/* MS.DIY Values & Craft Story */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPhotoStudio={handleOpenPhotoStudio}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenPhotoStudio={handleOpenPhotoStudio}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* n8n Live Chat Assistant */}
      <N8nChat
        isOpenExternal={isChatOpen}
        onCloseExternal={() => setIsChatOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStore />
    </CartProvider>
  );
}
