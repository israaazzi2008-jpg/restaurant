import React from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  subtotal: number;
  tax: number;
  serviceFee: number;
  totalPrice: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  subtotal,
  tax,
  serviceFee,
  totalPrice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 text-white shadow-2xl flex flex-col justify-between border-l border-orange-500/30 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold border border-orange-400/30 shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-serif">Your Order Cart</h2>
                <p className="text-xs font-mono text-orange-400">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 py-12">
                <div className="w-20 h-20 rounded-full bg-orange-950 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/30">
                  <Utensils className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-white font-serif mb-1">Your cart is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs mb-6">
                  Browse our burgers, tacos, and pizza menu to add delicious items to your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer border border-orange-400/30"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-stone-950 rounded-2xl p-4 border border-stone-800 flex items-start gap-3.5 relative group hover:border-orange-500/40 transition-colors"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-900 flex-shrink-0 border border-stone-800"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="text-sm font-bold text-white truncate font-serif">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs font-mono font-bold text-orange-400 mb-2">
                      {(item.menuItem.price * item.quantity).toLocaleString()} DA
                      <span className="text-stone-400 text-[10px] font-normal ml-1">
                        ({item.menuItem.price.toLocaleString()} DA each)
                      </span>
                    </div>

                    {/* Options & Notes */}
                    {((item.selectedOptions && item.selectedOptions.length > 0) || item.specialNotes) && (
                      <div className="text-[10px] text-stone-300 space-y-1 mb-2 bg-stone-900 p-2 rounded-lg border border-stone-800">
                        {item.selectedOptions?.map((opt, i) => (
                          <div key={i} className="font-medium text-stone-300">• {opt}</div>
                        ))}
                        {item.specialNotes && (
                          <div className="italic text-orange-300 bg-orange-950/60 p-1.5 rounded border border-orange-500/30 font-mono">
                            <span className="font-bold">Comment: </span>"{item.specialNotes}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-stone-800 bg-stone-900 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-stone-950 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition-colors cursor-pointer border border-stone-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-stone-950 hover:bg-stone-800 text-stone-300 flex items-center justify-center transition-colors cursor-pointer border border-stone-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between font-mono">
                  <span>Items Subtotal</span>
                  <span className="font-medium text-white">{subtotal.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-white">{tax.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Kitchen Service Fee</span>
                  <span className="font-medium text-white">{serviceFee.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-800 text-base font-black text-white">
                  <span>Total Due</span>
                  <span className="text-orange-400 font-mono">{totalPrice.toLocaleString()} DA</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-between px-6 transition-all text-xs uppercase tracking-wider cursor-pointer border border-orange-400/30 active:scale-95"
              >
                <span>Proceed to Table Checkout</span>
                <div className="flex items-center gap-1.5 font-mono text-sm font-black">
                  <span>{totalPrice.toLocaleString()} DA</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
