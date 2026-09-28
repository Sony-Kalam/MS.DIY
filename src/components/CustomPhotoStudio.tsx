import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Camera,
  Heart,
  Check,
  RotateCcw,
  Palette,
  Image as ImageIcon,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { CustomPhotoStationeryConfig } from '../types';
import { useCart } from '../context/CartContext';
import { imgPhotoStationery } from '../data/products';

// Sample adorable photos for kids and users to try immediately
const SAMPLE_PHOTOS = [
  {
    name: 'Fluffy Puppy',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    emoji: '🐶',
  },
  {
    name: 'Sweet Kitten',
    url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    emoji: '🐱',
  },
  {
    name: "Kid's Crayon Art",
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    emoji: '🖍️',
  },
  {
    name: 'Sunny Vacation',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    emoji: '🏖️',
  },
  {
    name: 'Pastel Garden',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
    emoji: '🌸',
  },
];

const STATIONERY_TYPES = [
  {
    id: 'photo-notebook',
    label: 'Spiral Photo Journal',
    price: 22.0,
    desc: 'Glossy A5 spiral notebook with your photo on the cover. 140 pages.',
    badge: 'Most Popular',
    emoji: '📔',
  },
  {
    id: 'acrylic-stand',
    label: 'Acrylic Desk Standee',
    price: 15.0,
    desc: 'Crystal-clear acrylic photo stand on a natural beechwood base.',
    badge: 'Desk Buddy',
    emoji: '📌',
  },
  {
    id: 'sticker-sheet',
    label: 'Custom Photo Stickers (Pack of 12)',
    price: 12.0,
    desc: 'Glossy, waterproof die-cut stickers of your photo. Fun for laptops & cases.',
    badge: 'Kids Love It',
    emoji: '🎨',
  },
  {
    id: 'photo-bookmarks',
    label: 'Holographic Photo Bookmarks (Set of 2)',
    price: 9.5,
    desc: 'Glitter laminated double-sided bookmarks with pastel silky tassels.',
    badge: 'Cute Gift',
    emoji: '🔖',
  },
  {
    id: 'fridge-magnets',
    label: 'Photo Wooden Magnets (Set of 4)',
    price: 14.0,
    desc: 'Birch wood square magnets for school lockers and fridge displays.',
    badge: 'Craft Pick',
    emoji: '🧲',
  },
];

const THEME_COLORS = [
  { name: 'Strawberry Milk', hex: '#FFB6C1', border: '#FFA1B0' },
  { name: 'Mint Marshmallow', hex: '#A8E6CF', border: '#8FE0C3' },
  { name: 'Sunshine Buttercup', hex: '#FFEAA7', border: '#FDD779' },
  { name: 'Lavender Dream', hex: '#D1C4E9', border: '#BEAEE0' },
  { name: 'Baby Sky Blue', hex: '#B3E5FC', border: '#9DDDFB' },
  { name: 'Warm Cream Oat', hex: '#FDF8F0', border: '#EFE7DA' },
];

const FRAME_STYLES = [
  { id: 'polaroid', label: 'Retro Polaroid', desc: 'Instant photo border with handwritten bottom' },
  { id: 'kawaii-stickers', label: 'Cute Bear Ears & Doodles', desc: 'Adorable animal ears and cute sticker overlays' },
  { id: 'sparkles', label: 'Magical Sparkles', desc: 'Glittering anime star shine effects' },
  { id: 'pastel-border', label: 'Scalloped Pastel', desc: 'Soft pastel border with cute rounded frame' },
  { id: 'clean', label: 'Edge-to-Edge Clean', desc: 'Modern borderless full-bleed photo' },
];

export const CustomPhotoStudio: React.FC = () => {
  const { addToCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedItemType, setSelectedItemType] = useState<string>('photo-notebook');
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_PHOTOS[0].url);
  const [photoName, setPhotoName] = useState<string>('Fluffy Puppy');
  const [caption, setCaption] = useState<string>('Mochi & Best Adventures');
  const [frameStyle, setFrameStyle] = useState<any>('polaroid');
  const [themeColor, setThemeColor] = useState<string>('#FFB6C1');
  const [filterStyle, setFilterStyle] = useState<'none' | 'pastel-bright' | 'warm-sun' | 'vintage-mono'>('none');
  const [paperRuling, setPaperRuling] = useState<'dot-grid' | 'lined' | 'blank'>('dot-grid');
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const currentItem = STATIONERY_TYPES.find((t) => t.id === selectedItemType) || STATIONERY_TYPES[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setPhotoName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomToBag = () => {
    const customConfig: CustomPhotoStationeryConfig = {
      itemType: selectedItemType as any,
      itemLabel: currentItem.label,
      photoUrl,
      photoName,
      caption: caption || 'MS.DIY Custom Memory',
      frameStyle,
      filter: filterStyle,
      accentColor: themeColor,
      paperRuling: selectedItemType === 'photo-notebook' ? paperRuling : undefined,
    };

    addToCart({
      productId: `custom-${selectedItemType}`,
      name: `${currentItem.label} ("${caption || photoName}")`,
      price: currentItem.price,
      image: photoUrl || imgPhotoStationery,
      quantity: 1,
      customPhotoConfig: customConfig,
    });

    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 2400);
  };

  const getFilterCss = () => {
    switch (filterStyle) {
      case 'pastel-bright':
        return 'contrast-105 brightness-110 saturate-110 hue-rotate-5';
      case 'warm-sun':
        return 'sepia-25 saturate-120 brightness-105 contrast-95';
      case 'vintage-mono':
        return 'grayscale contrast-110 brightness-95';
      default:
        return '';
    }
  };

  return (
    <section id="custom-photo-studio" className="py-16 lg:py-24 bg-[#FFF9F3] border-b border-[#F0E6DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Friendly Kid & Creator Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E07A5F] mb-2">
            <span>✨ MS.DIY Custom Photo Studio</span>
            <span aria-hidden="true">·</span>
            <span>Make Your Own Stationery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2D42] tracking-tight">
            Turn your favorite photos &amp; drawings into custom stationery!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6C757D] leading-relaxed">
            Upload your pet puppy, your kid's crayon artwork, best friends selfie, or family vacation memory.
            Pick your product and watch your personalized stationery come to life right on screen!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Live Preview Stage (Left Column) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#F7D6C8] shadow-sm flex flex-col items-center relative overflow-hidden">
              {/* Cute top pill badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF0EB] rounded-full text-xs font-medium text-[#E07A5F] mb-6">
                <Smile className="w-4 h-4 text-[#E5AA38]" />
                <span>Live DIY 3D Preview: {currentItem.label}</span>
              </div>

              {/* Physical Product Simulation Box */}
              <div className="w-full max-w-sm aspect-[4/5] flex items-center justify-center p-2 relative">
                {/* 1. SPIRAL NOTEBOOK PREVIEW */}
                {selectedItemType === 'photo-notebook' && (
                  <div
                    className="relative w-64 sm:w-72 h-[380px] bg-white rounded-r-2xl shadow-xl border border-[#E9ECEF] flex flex-col p-4 transition-all duration-300"
                    style={{ backgroundColor: themeColor }}
                  >
                    {/* Metal Wire Spiral Rings on the Left Edge */}
                    <div className="absolute -left-3 top-3 bottom-3 w-6 flex flex-col justify-between pointer-events-none z-30">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-2.5 rounded-full bg-gradient-to-r from-slate-400 via-white to-slate-400 shadow-sm border border-slate-300 transform -rotate-6"
                        />
                      ))}
                    </div>

                    {/* Book Cover Frame & User Photo */}
                    <div className="w-full h-full bg-white rounded-xl p-3 shadow-inner flex flex-col justify-between relative overflow-hidden">
                      {/* Kawaii Bear Ears if selected */}
                      {frameStyle === 'kawaii-stickers' && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex justify-between w-32 pointer-events-none">
                          <span className="text-2xl transform -rotate-12">🐻</span>
                          <span className="text-2xl transform rotate-12">🐻</span>
                        </div>
                      )}

                      {/* Sparkles Overlay */}
                      {frameStyle === 'sparkles' && (
                        <div className="absolute inset-0 pointer-events-none z-20 flex justify-between p-2">
                          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                          <Sparkles className="w-4 h-4 text-pink-400 animate-bounce" />
                        </div>
                      )}

                      {/* Photo Image Frame */}
                      <div
                        className={`relative w-full flex-1 rounded-lg overflow-hidden bg-slate-100 border ${
                          frameStyle === 'polaroid'
                            ? 'border-4 border-white shadow-md'
                            : frameStyle === 'pastel-border'
                            ? 'border-4 border-dashed border-[#FFAAA6]'
                            : 'border-slate-200'
                        }`}
                      >
                        <img
                          src={photoUrl}
                          alt="Uploaded memory preview"
                          className={`w-full h-full object-cover transition-all ${getFilterCss()}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Caption & Handwritten style footer */}
                      <div className="pt-2 text-center">
                        <div className="font-serif font-semibold text-sm text-[#2B2D42] tracking-wide truncate">
                          {caption || 'My Custom Notebook'}
                        </div>
                        <div className="text-[10px] text-[#8D99AE] font-mono mt-0.5">
                          MS.DIY Edition · {paperRuling.toUpperCase()} PAGES
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ACRYLIC DESK STANDEE PREVIEW */}
                {selectedItemType === 'acrylic-stand' && (
                  <div className="flex flex-col items-center">
                    {/* Clear Acrylic Plaque with glossy reflection */}
                    <div className="relative w-52 h-64 rounded-2xl bg-white/70 backdrop-blur-md border-2 border-white/80 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-40 bg-gradient-to-bl from-white/60 to-transparent pointer-events-none transform rotate-12" />
                      <div className="w-full flex-1 rounded-xl overflow-hidden relative border border-white">
                        <img
                          src={photoUrl}
                          alt="Acrylic stand photo"
                          className={`w-full h-full object-cover ${getFilterCss()}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="pt-2 text-center">
                        <div className="font-serif font-bold text-xs text-[#2B2D42] truncate">
                          {caption || 'Desk Buddy'}
                        </div>
                      </div>
                    </div>
                    {/* Wooden Standee Base Slot */}
                    <div className="w-60 h-6 bg-[#D7BA9D] rounded-lg shadow-lg border-b-4 border-[#B89674] flex items-center justify-center -mt-2 z-10">
                      <div className="w-48 h-1 bg-[#8C6D4F] rounded-full opacity-60" />
                    </div>
                  </div>
                )}

                {/* 3. CUSTOM PHOTO STICKERS PREVIEW */}
                {selectedItemType === 'sticker-sheet' && (
                  <div className="relative w-64 h-80 bg-white rounded-2xl shadow-xl border-2 border-[#E9ECEF] p-4 flex flex-col justify-between">
                    <div className="text-center pb-2 border-b border-dashed border-slate-200">
                      <div className="text-xs font-bold text-[#E07A5F] flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>MS.DIY Peel &amp; Stick Sheet</span>
                      </div>
                      <div className="text-[10px] text-slate-400">12 Waterproof Gloss Stickers</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 my-auto">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-full p-0.5 border-2 border-dashed border-pink-300 shadow-xs overflow-hidden transform hover:scale-105 transition-transform"
                        >
                          <img
                            src={photoUrl}
                            alt="Sticker die cut"
                            className={`w-full h-full object-cover rounded-full ${getFilterCss()}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-2 text-[11px] font-medium text-slate-600 truncate border-t border-slate-100">
                      "{caption || 'Custom Stickers'}"
                    </div>
                  </div>
                )}

                {/* 4. PHOTO BOOKMARKS PREVIEW */}
                {selectedItemType === 'photo-bookmarks' && (
                  <div className="flex gap-4 items-center justify-center">
                    {[1, 2].map((bm) => (
                      <div
                        key={bm}
                        className="relative w-24 h-72 rounded-xl shadow-xl border border-slate-200 p-2 flex flex-col justify-between overflow-hidden"
                        style={{ backgroundColor: themeColor }}
                      >
                        {/* Silk Ribbon Tassel at the Top Hole */}
                        <div className="w-3 h-3 rounded-full bg-white mx-auto border border-slate-300 shadow-inner flex items-center justify-center -mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        </div>
                        <div className="w-full flex-1 rounded-lg overflow-hidden my-2 shadow-xs border border-white">
                          <img
                            src={photoUrl}
                            alt="Bookmark photo"
                            className={`w-full h-full object-cover ${getFilterCss()}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-[10px] font-bold text-center text-[#2B2D42] truncate">
                          {caption || 'My Bookmark'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. PHOTO FRIDGE MAGNETS PREVIEW */}
                {selectedItemType === 'fridge-magnets' && (
                  <div className="grid grid-cols-2 gap-3.5">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-26 h-26 rounded-xl bg-[#EFE8DC] p-1.5 shadow-lg border-2 border-[#D8CABE] flex flex-col justify-between transform hover:rotate-1 transition-transform"
                      >
                        <div className="w-full flex-1 rounded-lg overflow-hidden border border-white">
                          <img
                            src={photoUrl}
                            alt="Magnet photo"
                            className={`w-full h-full object-cover ${getFilterCss()}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-[9px] font-bold text-center text-[#2B2D42] truncate pt-0.5">
                          {caption || 'Happy Memory'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Item Info Summary */}
              <div className="mt-4 pt-4 border-t border-[#F0E6DC] w-full text-center">
                <span className="text-xs text-[#6C757D]">
                  {currentItem.desc}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Controls Panel (Right Column) */}
          <div className="lg:col-span-6 space-y-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F7D6C8] shadow-xs">
            {/* Step 1: Choose Product Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-2">
                Step 1: Choose What Stationery to Make
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STATIONERY_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedItemType(type.id)}
                    className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-center justify-between ${
                      selectedItemType === type.id
                        ? 'border-[#E07A5F] bg-[#FFF2EE] shadow-xs'
                        : 'border-[#E9ECEF] hover:border-[#F7D6C8] bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{type.emoji}</span>
                      <div>
                        <div className="text-xs font-bold text-[#2B2D42]">{type.label}</div>
                        <div className="text-[11px] font-medium text-[#E07A5F]">{type.badge}</div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#2B2D42]">
                      ${type.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Upload or Choose Sample Photo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold">
                  Step 2: Upload Your Photo or Kid's Drawing
                </label>
                <span className="text-[11px] text-[#6C757D]">JPEG, PNG, WEBP</span>
              </div>

              {/* Upload Drop Zone / Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-[#E07A5F] rounded-2xl bg-[#FFF6F3] hover:bg-[#FFEFEA] transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFE5DD] group-hover:scale-110 transition-transform flex items-center justify-center text-[#E07A5F]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2B2D42]">
                    Click to Upload Any Photo from Phone / Computer
                  </span>
                  <p className="text-[11px] text-[#6C757D] mt-0.5">
                    Pet photos, kids art, vacation selfies, anime drawings!
                  </p>
                </div>
              </div>

              {/* Sample Photo Fast Selectors */}
              <div className="mt-3">
                <div className="text-[11px] text-[#6C757D] mb-1.5 font-medium">
                  Or test with one of these cute sample photos:
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_PHOTOS.map((sample) => (
                    <button
                      key={sample.name}
                      onClick={() => {
                        setPhotoUrl(sample.url);
                        setPhotoName(sample.name);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium shrink-0 cursor-pointer transition-all ${
                        photoUrl === sample.url
                          ? 'border-[#E07A5F] bg-[#FFF2EE] text-[#E07A5F] font-bold shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <span>{sample.emoji}</span>
                      <span>{sample.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Custom Caption & Theme Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-1.5">
                  Step 3: Title or Caption
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Maya's Magic Diary"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F] text-[#2B2D42]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-1.5">
                  Theme Color
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setThemeColor(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        themeColor === c.hex ? 'scale-120 ring-2 ring-offset-2 ring-[#E07A5F]' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex, borderColor: c.border }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Frame / Sticker Style */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-2">
                Step 4: Decorative Frame &amp; Overlays
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FRAME_STYLES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrameStyle(f.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      frameStyle === f.id
                        ? 'border-[#E07A5F] bg-[#FFF2EE] text-[#E07A5F] font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold">{f.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Ruling if Notebook */}
            {selectedItemType === 'photo-notebook' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-2">
                  Interior Paper Style (140 Bleed-Proof Pages)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dot-grid', label: 'Dot Grid', desc: 'Bullet journal & drawing' },
                    { id: 'lined', label: 'College Lined', desc: 'School notes & diary' },
                    { id: 'blank', label: 'Blank Drawing', desc: 'Crayons & sketches' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setPaperRuling(r.id as any)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                        paperRuling === r.id
                          ? 'border-[#E07A5F] bg-[#FFF2EE] text-[#E07A5F] font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Filter Tones */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-2">
                Cute Photo Filter
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'none', label: 'Original Photo' },
                  { id: 'pastel-bright', label: '🌸 Pastel Pop' },
                  { id: 'warm-sun', label: '☀️ Sunny Warm' },
                  { id: 'vintage-mono', label: '✏️ Manga Sketch' },
                ].map((flt) => (
                  <button
                    key={flt.id}
                    onClick={() => setFilterStyle(flt.id as any)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                      filterStyle === flt.id
                        ? 'border-[#E07A5F] bg-[#FFF2EE] text-[#E07A5F]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Final CTA Bar */}
            <div className="pt-4 border-t border-[#F0E6DC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500 font-medium">Custom Printed Just For You</div>
                <div className="font-mono text-2xl font-bold text-[#2B2D42]">
                  ${currentItem.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={handleAddCustomToBag}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSuccessToast ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added to Bag! 🎉</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>Add Custom Photo Stationery to Bag</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6C757D] justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full-color high-definition print · Safe non-toxic inks · Ships in 48 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
