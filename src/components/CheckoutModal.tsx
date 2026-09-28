import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Download,
  ArrowLeft,
  Sparkles,
  Gift,
  Camera,
  Smile,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingDetails, PaymentDetails, OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, discount, completeOrder } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'confirmed'>('details');

  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: 'Maya Lin',
    email: 'maya.diy@example.com',
    address: '77 Sweet Blossom Way',
    city: 'Sunnyvale',
    postalCode: '94086',
    country: 'United States',
    deliveryMethod: 'standard',
    giftMessage: '',
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    method: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '09/28',
    cardCvv: '742',
    cardName: 'Maya Lin',
  });

  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const shippingCost = shipping.deliveryMethod === 'express' ? 9.5 : cartSubtotal >= 40 ? 0 : 4.5;
  const giftWrapCost = includeGiftWrap ? 3.5 : 0;
  const grandTotal = Number((cartSubtotal - discount + shippingCost + giftWrapCost).toFixed(2));

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const order = completeOrder(shipping, payment);
      setConfirmedOrder(order);
      setStep('confirmed');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative bg-[#FFFDF9] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#F7D6C8] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#F7D6C8] bg-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFF0EB] text-[#E07A5F] rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2B2D42] flex items-center gap-1.5">
                <span>MS.DIY Secure Checkout</span>
                <span className="text-base">✨</span>
              </h2>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Bank-Grade Encryption · Safe for Kids &amp; Families</span>
              </div>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#2B2D42] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Shipping Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-1">
                Step 1 of 2: Shipping
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2B2D42]">
                Where should we send your cute stationery?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2B2D42] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2B2D42] mb-1">Email (for cute tracking notifications)</label>
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2B2D42] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2B2D42] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B2D42] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shipping.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B2D42] mb-1">Country</label>
                  <select
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Courier Options */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-2">
                Shipping Speed
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    shipping.deliveryMethod === 'standard'
                      ? 'border-[#E07A5F] bg-[#FFF2EE]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={shipping.deliveryMethod === 'standard'}
                      onChange={() => setShipping({ ...shipping, deliveryMethod: 'standard' })}
                      className="text-[#E07A5F] focus:ring-[#E07A5F]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2B2D42]">Standard Cute Delivery</div>
                      <div className="text-[11px] text-slate-500">3–5 business days</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2B2D42]">
                    {cartSubtotal >= 40 ? 'FREE' : '$4.50'}
                  </span>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    shipping.deliveryMethod === 'express'
                      ? 'border-[#E07A5F] bg-[#FFF2EE]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={shipping.deliveryMethod === 'express'}
                      onChange={() => setShipping({ ...shipping, deliveryMethod: 'express' })}
                      className="text-[#E07A5F] focus:ring-[#E07A5F]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2B2D42]">Priority Express Air</div>
                      <div className="text-[11px] text-slate-500">1–2 days with tracking</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2B2D42]">$9.50</span>
                </label>
              </div>
            </div>

            {/* Gift Wrap with cute sticker */}
            <div className="p-4 bg-white rounded-2xl border-2 border-[#F7D6C8] space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-5 h-5 text-[#E07A5F]" />
                  <div>
                    <span className="text-xs font-bold text-[#2B2D42]">
                      Add Cute MS.DIY Gift Box &amp; Sticker Ribbon (+$3.50)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Packed in pastel confetti tissue with customized gift card!
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeGiftWrap}
                  onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                  className="rounded text-[#E07A5F] focus:ring-[#E07A5F] w-4 h-4"
                />
              </label>

              {includeGiftWrap && (
                <textarea
                  rows={2}
                  value={shipping.giftMessage}
                  onChange={(e) => setShipping({ ...shipping, giftMessage: e.target.value })}
                  placeholder="Enter your cute gift note (e.g., 'Happy 9th Birthday Maya! Keep creating magic!')..."
                  className="w-full px-3 py-2 text-xs bg-[#FFFDF9] border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                />
              )}
            </div>

            {/* Total and Next Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total Due</span>
                <div className="font-mono text-xl font-bold text-[#E07A5F] tabular-nums">
                  ${grandTotal.toFixed(2)}
                </div>
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-xs font-bold rounded-2xl transition-all shadow-md cursor-pointer"
              >
                Proceed to Payment →
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Details */}
        {step === 'payment' && (
          <form onSubmit={handleProcessPayment} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#E07A5F] font-bold mb-1">
                  Step 2 of 2: Secure Payment
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2D42]">
                  Payment Authorization
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-500 hover:text-[#2B2D42] flex items-center gap-1 cursor-pointer font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'apple_pay', label: 'Apple / Google Pay', icon: Lock },
                { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment({ ...payment, method: m.id as any })}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    payment.method === m.id
                      ? 'border-[#E07A5F] bg-[#FFF2EE] text-[#E07A5F] shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {payment.method === 'card' ? (
              <div className="p-5 bg-white rounded-2xl border-2 border-[#F7D6C8] space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#2B2D42]">Encrypted Card Details</span>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-slate-600">
                    <span>VISA</span>
                    <span>·</span>
                    <span>MASTERCARD</span>
                    <span>·</span>
                    <span>AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2D42] mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2B2D42] mb-1">Expiration</label>
                    <input
                      type="text"
                      required
                      value={payment.cardExp}
                      onChange={(e) => setPayment({ ...payment, cardExp: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2B2D42] mb-1">CVV Code</label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={payment.cardCvv}
                      onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2D42] mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={payment.cardName}
                    onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border-2 border-[#F7D6C8] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFF0EB] mx-auto flex items-center justify-center text-[#E07A5F]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#2B2D42]">
                  Instant 1-Touch Express Checkout
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Clicking the button below will securely authorize ${grandTotal.toFixed(2)} via {payment.method === 'apple_pay' ? 'Apple Pay / Google Pay' : 'PayPal'}.
                </p>
              </div>
            )}

            {/* Price breakdown summary */}
            <div className="p-4 bg-[#FFF5EE] rounded-2xl border border-[#F7D6C8] space-y-1.5 text-xs text-[#6C757D]">
              <div className="flex justify-between">
                <span>Items ({cart.length} supplies)</span>
                <span className="font-mono text-[#2B2D42] font-bold">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Savings</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({shipping.deliveryMethod})</span>
                <span className="font-mono text-[#2B2D42] font-bold">${shippingCost.toFixed(2)}</span>
              </div>
              {includeGiftWrap && (
                <div className="flex justify-between">
                  <span>Gift Box &amp; Sticker Ribbon</span>
                  <span className="font-mono text-[#2B2D42] font-bold">$3.50</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#2B2D42] pt-2 border-t border-[#F8DACD]">
                <span>Total</span>
                <span className="font-mono text-base tabular-nums text-[#E07A5F]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                type="submit"
                className="w-full py-4 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-sm font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-200" />
                <span>Complete MS.DIY Order · ${grandTotal.toFixed(2)}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Simulated Processing */}
        {step === 'processing' && (
          <div className="p-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-full border-4 border-[#E07A5F] border-t-transparent animate-spin mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#2B2D42]">
              Encrypting &amp; Authorizing Payment...
            </h3>
            <p className="text-xs text-slate-500">
              Connecting to secure payment gateway. Please hold on!
            </p>
          </div>
        )}

        {/* Step 4: Confirmed Order View */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#E8F8F5] text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2B2D42]">
                Order Confirmed — Yay! 🎉
              </h3>
              <p className="text-xs text-slate-500">
                Your receipt and shipment tracking have been sent to{' '}
                <span className="font-bold text-[#2B2D42]">{shipping.email}</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 bg-white rounded-2xl border-2 border-[#F7D6C8] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="text-xs text-slate-400 font-bold">Order ID</div>
                  <div className="font-mono text-sm font-bold text-[#E07A5F]">
                    {confirmedOrder.orderId}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Order Placed</div>
                  <div className="text-xs font-bold text-[#2B2D42]">{confirmedOrder.date}</div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#2B2D42] uppercase tracking-wider">
                  Your Cute Manifest
                </div>
                {confirmedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#2B2D42]">
                        {it.quantity}x {it.name}
                      </span>
                      {it.customPhotoConfig && (
                        <div className="text-[11px] text-[#E07A5F] flex items-center gap-1 font-medium">
                          <Camera className="w-3 h-3" />
                          <span>Caption: "{it.customPhotoConfig.caption}"</span>
                        </div>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#2B2D42] tabular-nums">
                      ${(it.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-0.5">
                <div className="font-bold text-[#2B2D42]">Shipment Address:</div>
                <div>{shipping.fullName}</div>
                <div>{shipping.address}, {shipping.city} {shipping.postalCode}, {shipping.country}</div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm font-bold text-[#2B2D42]">
                <span>Total Paid</span>
                <span className="font-mono text-base tabular-nums text-[#E07A5F]">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-xs font-bold text-[#2B2D42] rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Cute Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:flex-1 py-3 bg-[#E07A5F] hover:bg-[#CC684F] text-white text-xs font-bold rounded-2xl transition-colors cursor-pointer"
              >
                Continue Shopping at MS.DIY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
