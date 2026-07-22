import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, ArrowRight, Clock, ShieldCheck, Plus, Sparkles, Heart, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface HeroIntroProps {
  onExploreMenu: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onExploreMenu,
  onAddToCart,
}) => {
  const signatureDishes = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 3);

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 bg-stone-950 text-white border-b border-orange-500/20">
      {/* Real Flying Burgers Floating Background Behind Introduction & About/Story (NO CADRE / NO BORDER FRAME) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        {/* Warm Background Radial Glows */}
        <div className="absolute w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-2xl" />

        {/* Top Main Floating Flying Gourmet Burger */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [-6, 6, -6],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 opacity-35 dark:opacity-30 blur-[0.5px] transform scale-125 sm:scale-150 max-w-lg w-full aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
            alt="Flying Gourmet Burger Background"
            className="w-full h-full object-cover filter contrast-125 drop-shadow-[0_20px_50px_rgba(249,115,22,0.4)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Mid-Section Floating Flying Burger Behind About & Story */}
        <motion.div
          animate={{
            y: [-16, 16, -16],
            rotate: [5, -5, 5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute top-[42%] opacity-30 blur-[0.5px] transform scale-125 sm:scale-140 max-w-md w-full aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
            alt="Flying Bacon Burger Background About"
            className="w-full h-full object-cover filter contrast-125 drop-shadow-[0_20px_50px_rgba(249,115,22,0.35)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header - Clean layout without cadre box */}
        <div className="relative py-6 sm:py-10 mb-16 text-center flex flex-col items-center">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/90 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-lg"
          >
            <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
            <span>{RESTAURANT_INFO.tagline}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-serif leading-[1.1] mb-6 max-w-4xl drop-shadow-md"
          >
            Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 drop-shadow-sm">Smash Burgers</span>, Tacos & Woodfired Pizza
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-200 text-base sm:text-xl leading-relaxed mb-8 max-w-2xl font-normal drop-shadow-xs"
          >
            {RESTAURANT_INFO.description}
          </motion.p>

          {/* Key Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8 border-y border-stone-800/80 py-5">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-950/90 text-orange-400 border border-orange-500/30 shadow-md">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-white">{RESTAURANT_INFO.rating} Stars</div>
                <div className="text-xs font-mono text-stone-400">{RESTAURANT_INFO.reviewsCount}+ Reviews</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-950/90 text-orange-400 border border-orange-500/30 shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-white">12-15 Min</div>
                <div className="text-xs font-mono text-stone-400">Avg Kitchen Prep</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-950/90 text-orange-400 border border-orange-500/30 shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-white">Fresh Daily</div>
                <div className="text-xs font-mono text-stone-400">Organic Ingredients</div>
              </div>
            </div>
          </div>

          {/* Explore Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full sm:w-auto"
          >
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-orange-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer border border-orange-400/30 active:scale-95"
            >
              <span>Explore Interactive Menu</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

        </div>

        {/* ABOUT & OUR STORY SECTION - Floating directly on the flying burger background (NO CADRE FRAME) */}
        <div id="about" className="py-12 border-t border-stone-800/80 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 block mb-2">
              Our Passion & Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-4 drop-shadow-md">
              The Story Behind <span className="text-orange-500">L'Orange Gourmet</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Founded on a simple rule: no compromises on meat quality, flame temperature, or sauce craft. We smash 100% grass-fed Angus beef directly on searing iron plates to lock in rich crispy caramelized edges, paired with our secret citrus chili reductions and artisan sourdough buns.
            </p>
          </div>

          {/* Story Pillars - Frameless floating elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/90 text-orange-400 border border-orange-500/40 flex items-center justify-center mb-4 shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">500°F Sear Craft</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Every smash burger patty is smashed live to order on blazing hot cast iron to create ultra-crispy lace edges while keeping the center tender and juicy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/90 text-orange-400 border border-orange-500/40 flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">Signature Orange Glaze</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                House-infused orange chili reductions, hot citrus honey drizzles, and hand-whipped aioli crafted fresh every morning in our kitchen.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/90 text-orange-400 border border-orange-500/40 flex items-center justify-center mb-4 shadow-lg">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif mb-2">Organic & Local</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                48-hour fermented woodfired sourdough pizza bases, authentic slow-braised consomé birria tacos, and locally sourced organic produce.
              </p>
            </div>
          </div>
        </div>

        {/* Signature Dishes Showcase Section */}
        <div id="signature" className="pt-10 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-orange-400 block mb-1">
                Curated Culinary Delights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Our Signature Trio
              </h2>
            </div>
            <button
              onClick={onExploreMenu}
              className="text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider flex items-center gap-1 cursor-pointer group"
            >
              <span>View Full Interactive Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signatureDishes.map((dish) => (
              <motion.div
                key={dish.id}
                whileHover={{ y: -6 }}
                className="bg-stone-900 rounded-2xl p-4 border border-orange-500/25 shadow-lg hover:border-orange-500/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-stone-950 border border-stone-800">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      Popular Choice
                    </div>
                    <div className="absolute top-3 right-3 bg-stone-950/90 backdrop-blur-md text-orange-400 text-xs font-mono font-bold px-2 py-0.5 rounded-md border border-orange-500/30">
                      {dish.calories} kcal
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white font-serif group-hover:text-orange-400 transition-colors">{dish.name}</h3>
                    <span className="text-base font-black text-orange-400 font-mono">{dish.price.toLocaleString()} DA</span>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                  <div className="flex flex-wrap gap-1">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[10px] font-medium bg-stone-950 text-stone-300 px-2 py-0.5 rounded-md border border-stone-800">
                        {ing}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onAddToCart(dish)}
                    className="p-2.5 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/30 cursor-pointer"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

