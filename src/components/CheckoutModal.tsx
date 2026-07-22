import React, { useState } from 'react';
import { Utensils, ArrowRight, X, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  totalPrice: number;
  onOrderSubmitted: (order: Order) => void;
  initialTableNumber?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  tax,
  serviceFee,
  totalPrice,
  onOrderSubmitted,
  initialTableNumber = '',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState(initialTableNumber || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !tableNumber.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: orderId,
        items: [...cartItems],
        customerName: customerName.trim(),
        tableNumber: tableNumber.trim(),
        specialInstructions: '',
        subtotal,
        tax,
        serviceFee,
        totalPrice,
        status: 'received',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: 'cash_table',
        estimatedTimeMinutes: 15,
        progressPercent: 10,
      };

      onOrderSubmitted(newOrder);
      setIsSubmitting(false);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ea580c', '#fb923c', '#10b981']
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 text-white rounded-3xl max-w-lg w-full shadow-2xl border border-orange-500/40 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-950 p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md border border-orange-400/30">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Table Direct Order</h2>
              <p className="text-xs font-mono text-orange-400">
                No payment card required • Direct to kitchen
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer border border-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
          
          {/* Customer Name & Table Number ONLY */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1.5">
                1. Customer Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name (e.g. Alex)"
                className="w-full p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1.5">
                2. Table Number *
              </label>
              <input
                type="text"
                required
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Enter your table number..."
                className="w-full p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white font-mono font-bold placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all"
              />
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] font-mono text-stone-400">Quick select table:</span>
                {['1', '5', '8', '12', '18', 'Patio 2'].map((tbl) => (
                  <button
                    type="button"
                    key={tbl}
                    onClick={() => setTableNumber(tbl)}
                    className="text-[10px] font-mono bg-stone-950 hover:bg-orange-950 text-stone-300 hover:text-orange-400 px-2 py-1 rounded-md border border-stone-800 hover:border-orange-500/40 transition-colors cursor-pointer"
                  >
                    #{tbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Food Items & Specific Customer Comments Breakdown */}
          <div className="bg-stone-950 rounded-2xl p-4 border border-stone-800 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 flex justify-between items-center">
              <span>Order Summary ({cartItems.length} items)</span>
              <span className="text-stone-300 font-normal">Table #{tableNumber || '?'}</span>
            </div>

            <div className="max-h-44 overflow-y-auto space-y-2.5 pr-1">
              {cartItems.map((ci, i) => (
                <div key={i} className="bg-stone-900 p-3 rounded-xl border border-stone-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">
                      {ci.quantity}x {ci.menuItem.name}
                    </span>
                    <span className="font-mono text-orange-400 font-bold">
                      {(ci.menuItem.price * ci.quantity).toLocaleString()} DA
                    </span>
                  </div>

                  {/* Selected Options */}
                  {ci.selectedOptions && ci.selectedOptions.length > 0 && (
                    <div className="text-[11px] text-stone-400 font-medium">
                      Options: {ci.selectedOptions.join(', ')}
                    </div>
                  )}

                  {/* Specific Kitchen Comments/Notes for this food item */}
                  {ci.specialNotes ? (
                    <div className="text-xs bg-orange-950/80 border border-orange-500/40 text-orange-200 p-2 rounded-lg flex items-start gap-1.5 mt-1 font-mono">
                      <MessageSquare className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-orange-300">Specific Request: </span>
                        <span>"{ci.specialNotes}"</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm font-bold text-white">
              <span>Total Price:</span>
              <span className="text-xl font-mono text-orange-400 font-black">{totalPrice.toLocaleString()} DA</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2.5 transition-all text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 border border-orange-400/30 active:scale-95"
          >
            {isSubmitting ? (
              <span>Sending Order to Kitchen...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit Order ({totalPrice.toLocaleString()} DA)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
