import React from 'react';
import { ShoppingBag, Utensils, Clock, Flame, Sparkles } from 'lucide-react';
import { Order } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeOrder: Order | null;
  onOpenOrderStatus: () => void;
  tableNumber: string;
  onSelectCategory: (category: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  activeOrder,
  onOpenOrderStatus,
  tableNumber,
  setActiveSection,
}) => {
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-orange-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform border border-orange-400/30">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white font-serif block leading-none">
              L'Orange <span className="text-orange-500">Gourmet</span>
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-orange-400/90 uppercase flex items-center gap-1 mt-1">
              <Sparkles className="w-2.5 h-2.5 text-orange-400" />
              Burgers • Tacos • Pizza
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-300">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-orange-400 transition-colors cursor-pointer py-1"
          >
            About & Story
          </button>
          <button
            onClick={() => scrollToSection('signature')}
            className="hover:text-orange-400 transition-colors cursor-pointer py-1"
          >
            Signature Dishes
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="hover:text-orange-400 transition-colors cursor-pointer py-1 text-orange-400 flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5" />
            Interactive Menu
          </button>
        </nav>

        {/* Actions & Badges */}
        <div className="flex items-center gap-3">
          
          {/* Active Table Number Badge */}
          {tableNumber && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-950/80 text-orange-300 border border-orange-500/30 rounded-full text-xs font-mono font-bold">
              <Utensils className="w-3.5 h-3.5 text-orange-400" />
              <span>Table #{tableNumber}</span>
            </div>
          )}

          {/* Active Order Status Tracker Button */}
          {activeOrder && (
            <button
              onClick={onOpenOrderStatus}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full text-xs font-bold shadow-lg shadow-orange-600/30 hover:brightness-110 transition-all cursor-pointer animate-pulse"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Order Live</span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            id="cart-button"
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white transition-all rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 cursor-pointer group border border-orange-400/30"
          >
            <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-stone-950 text-orange-400 text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center border border-orange-500/30">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden md:inline border-l border-orange-400/40 pl-2 text-xs font-mono font-bold text-amber-200">
                {cartTotal.toLocaleString()} DA
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
