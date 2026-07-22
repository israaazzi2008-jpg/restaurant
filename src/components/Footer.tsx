import React from 'react';
import { Flame, MapPin, Phone, Clock, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-600/30 border border-orange-400/30">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-xl font-black font-serif text-white">
                L'Orange <span className="text-orange-500">Gourmet</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {RESTAURANT_INFO.description}
            </p>

            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-orange-950 text-orange-400 border border-orange-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Burger Intro Animation</span>
            </button>
          </div>

          {/* Quick Menu Categories */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-4 font-mono">
              Culinary Menu
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {['Smash Burgers & Double Cheese', 'Authentic Braised Consomé Tacos', 'Woodfired Orange Honey Pizza', 'Craft Citrus Lemonades', 'Truffle Garlic Fries & Churros'].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      const elem = document.getElementById('menu');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-orange-500/60">›</span>
                    <span>{link}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-orange-400 mb-4 font-serif">
              Visit Us
            </h3>

            <div className="flex items-start gap-2.5 text-stone-300">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-stone-300">
              <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>{RESTAURANT_INFO.phone}</span>
            </div>

            <div className="flex items-start gap-2.5 text-stone-300">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>{RESTAURANT_INFO.hours}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} L'Orange Gourmet. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-orange-400 transition-colors cursor-pointer font-bold"
          >
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  );
};
