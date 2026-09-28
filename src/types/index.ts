export type ProductCategory = 'all' | 'diy-crafts' | 'pens-markers' | 'notebooks' | 'desk-fun' | 'kids-favorites';

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: string;
  shortDesc: string;
  description: string;
  specs: {
    dimensions: string;
    materials: string;
    origin: string;
    features: string[];
  };
  inStock: boolean;
  isCustomPhotoItem?: boolean;
  suitableForKids: boolean;
  reviews: ProductReview[];
}

export interface CustomPhotoStationeryConfig {
  itemType: 'photo-notebook' | 'acrylic-stand' | 'sticker-sheet' | 'photo-bookmarks' | 'fridge-magnets';
  itemLabel: string;
  photoUrl: string;
  photoName: string;
  caption: string;
  frameStyle: 'polaroid' | 'pastel-border' | 'kawaii-stickers' | 'clean' | 'sparkles';
  filter: 'none' | 'pastel-bright' | 'warm-sun' | 'vintage-mono';
  accentColor: string;
  paperRuling?: 'dot-grid' | 'lined' | 'blank';
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customPhotoConfig?: CustomPhotoStationeryConfig;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'standard' | 'express';
  giftMessage?: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'paypal';
  cardNumber?: string;
  cardExp?: string;
  cardCvv?: string;
  cardName?: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails;
}
