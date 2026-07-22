import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flame } from 'lucide-react';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 350);
          return 100;
        }
        return prev + 3;
      });
    }, 40); // ~1.3 seconds total

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white select-none px-4"
    >
      {/* Warm Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-orange-600/25 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-amber-500/20 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        
        {/* Real Burger Layered Assembly Container - NO CADRE / PICTURE FRAME */}
        <div className="relative w-64 h-52 mb-4 flex flex-col items-center justify-end">
          
          {/* Backlight Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-600/35 to-amber-500/25 blur-2xl animate-pulse" />

          {/* Top Golden Sesame Bun */}
          <motion.div
            initial={{ y: -80, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 180 }}
            className="w-36 h-12 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t-full shadow-lg relative flex items-center justify-center z-30 border-t border-amber-300/60"
          >
            {/* Real Sesame seeds details */}
            <div className="absolute top-2.5 left-8 w-1.5 h-2 bg-amber-100/90 rounded-full rotate-45 shadow-xs" />
            <div className="absolute top-2 left-16 w-1.5 h-2 bg-amber-100/90 rounded-full -rotate-12 shadow-xs" />
            <div className="absolute top-3 right-8 w-1.5 h-2 bg-amber-100/90 rounded-full rotate-12 shadow-xs" />
            <div className="absolute top-4 left-24 w-1.5 h-2 bg-amber-100/90 rounded-full rotate-30 shadow-xs" />
          </motion.div>

          {/* Secret Orange Sauce & Red Onion Rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.35 }}
            className="w-32 h-2.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full -my-0.5 z-25 shadow-md flex items-center justify-around px-2"
          >
            <div className="w-3 h-3 border-2 border-purple-400 rounded-full" />
            <div className="w-3.5 h-3.5 border-2 border-purple-400 rounded-full" />
          </motion.div>

          {/* Ripe Red Tomato Slice */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            className="w-34 h-3 bg-red-600 rounded-full -my-0.5 z-20 shadow-md border-b border-red-700 flex items-center justify-center gap-4"
          >
            <div className="w-2.5 h-1 bg-red-400 rounded-full" />
            <div className="w-2.5 h-1 bg-red-400 rounded-full" />
          </motion.div>

          {/* Fresh Crisp Wave Lettuce */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="w-36 h-4 bg-emerald-500 rounded-full -my-1 z-15 border-b-2 border-emerald-700 shadow-md flex items-center justify-around px-2"
          >
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-inner" />
          </motion.div>

          {/* Melted Golden Cheddar Cheese Dripping */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-38 h-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-sm z-10 shadow-md relative"
          >
            {/* Drip corners */}
            <div className="absolute -bottom-2 left-3 w-3 h-3 bg-amber-400 rotate-45 rounded-xs shadow-xs" />
            <div className="absolute -bottom-2.5 right-6 w-3.5 h-3.5 bg-amber-400 rotate-45 rounded-xs shadow-xs" />
            <div className="absolute -bottom-1.5 left-16 w-2.5 h-2.5 bg-amber-300 rotate-45 rounded-xs" />
          </motion.div>

          {/* Sizzling Double Angus Patty */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="w-36 h-7 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl z-5 shadow-inner border border-amber-800/80 flex items-center justify-center relative"
          >
            {/* Grill marks */}
            <div className="w-full flex justify-around px-3">
              <div className="w-0.5 h-4 bg-stone-950/70 rotate-12" />
              <div className="w-0.5 h-4 bg-stone-950/70 rotate-12" />
              <div className="w-0.5 h-4 bg-stone-950/70 rotate-12" />
              <div className="w-0.5 h-4 bg-stone-950/70 rotate-12" />
              <div className="w-0.5 h-4 bg-stone-950/70 rotate-12" />
            </div>
          </motion.div>

          {/* Bottom Toasted Bun */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.02, duration: 0.3 }}
            className="w-36 h-5 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-b-2xl border-b-2 border-amber-900 shadow-xl z-0"
          />

          {/* Floating Steam / Sparkles */}
          <motion.div
            animate={{ y: [-4, -18, -4], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute -top-4 right-2 text-orange-400 z-40 drop-shadow-md"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <motion.div
            animate={{ y: [-2, -14, -2], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
            className="absolute -top-3 left-2 text-amber-400 z-40 drop-shadow-md"
          >
            <Flame className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black tracking-tight text-white mb-1 font-serif"
        >
          L'Orange <span className="text-orange-500">Gourmet</span>
        </motion.h1>

        <p className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 flex items-center gap-1.5 justify-center">
          <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
          Preparing Kitchen Queue...
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-stone-900 rounded-full h-2.5 p-0.5 border border-stone-800 mb-2 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-[11px] text-stone-400 font-mono">
          <span>Loading Table System...</span>
          <span className="text-orange-400 font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Quick Skip button */}
        <button
          onClick={onFinish}
          className="mt-5 text-[11px] text-stone-500 hover:text-orange-400 underline underline-offset-4 tracking-wider transition-colors cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </motion.div>
  );
};

