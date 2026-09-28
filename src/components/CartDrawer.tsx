import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck, Camera, Smile } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discount,
    promoCode,
    total,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 40.0;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) {
      setPromoMessage({ text: res.message });
      setInputCode('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l-2 border-[#F7D6C8] flex flex-col justify-between shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#F7D6C8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#E07A5F]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-lg font-bold text-[#2B2D42]">
                Your MS.DIY Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-[#2B2D42] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3.5 bg-[#FFF5EE] border-b border-[#F7D6C8]">
            <div className="text-xs text-[#E07A5F] flex justify-between font-bold mb-1.5">
              <span>
                {remainingForFreeShipping > 0
                  ? `Add $${remainingForFreeShipping.toFixed(2)} for Free Shipping!`
                  : '🎉 You unlocked Free Delivery!'}
              </span>
              <span className="font-mono">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-2 bg-[#FBD5C5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E07A5F] transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FFF0EB] mx-auto flex items-center justify-center text-3xl">
                  🎒
                </div>
                <h3 className="font-serif text-base font-bold text-[#2B2D42]">Your bag is empty!</h3>
                <p className="text-xs text-[#6C757D] max-w-xs mx-auto">
                  Pick some cute pastel highlighters, DIY craft kits, or upload your photo to make a custom journal!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#E07A5F] text-white text-xs font-bold rounded-xl hover:bg-[#CC684F] transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-2xl border-2 border-[#F7D6C8] flex gap-3.5 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-[#2B2D42] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Photo Configuration specs if present */}
                      {item.customPhotoConfig && (
                        <div className="mt-2 p-2 bg-[#FFF8F5] rounded-xl border border-[#FADCD0] text-[11px] text-[#4A4E69] space-y-0.5">
                          <div className="flex items-center gap-1 font-bold text-[#E07A5F]">
                            <Camera className="w-3 h-3 text-[#E07A5F]" />
                            <span>Photo: "{item.customPhotoConfig.caption}"</span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Frame: {item.customPhotoConfig.frameStyle}
                            {item.customPhotoConfig.paperRuling && ` · ${item.customPhotoConfig.paperRuling.toUpperCase()}`}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#F7D6C8] rounded-xl bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-[#FFF0EB] rounded-lg cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-mono text-xs tabular-nums font-bold text-[#2B2D42]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-[#FFF0EB] rounded-lg cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-[#2B2D42] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F7D6C8] bg-white space-y-4">
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#E8F8F5] rounded-xl border border-[#A8E6CF] text-xs text-[#2A7B66] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code Active: {promoCode}</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (e.g. MSDIY10)"
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase focus:outline-none focus:border-[#E07A5F] font-bold"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#FFF0EB] hover:bg-[#FFE5DD] text-[#E07A5F] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <div className={`text-[11px] mt-1 font-bold ${promoMessage.error ? 'text-red-500' : 'text-emerald-600'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6C757D]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#2B2D42] tabular-nums font-bold">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#2B2D42]">
                    {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated next'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2B2D42] pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="font-mono text-base tabular-nums text-[#E07A5F]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-4 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
