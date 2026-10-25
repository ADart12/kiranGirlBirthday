import React from 'react';
import { motion } from 'framer-motion';

export default function CakeIllustration({ candlesLit = true, onBlowCandles, className = "" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Floating Sparkles around cake */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-4 -left-6 text-xl pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-2 -right-6 text-xl pointer-events-none"
      >
        🌸
      </motion.div>

      {/* Main Cake SVG illustration styled after reference */}
      <svg
        viewBox="0 0 340 380"
        className="w-full max-w-[280px] sm:max-w-[320px] drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="standGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="purpleTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="pinkTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="60%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="whiteDrip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(253, 224, 71, 0.8)" />
            <stop offset="60%" stopColor="rgba(249, 115, 22, 0.4)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
          </radialGradient>
          <filter id="cakeShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#f43f5e" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- CERAMIC STAND --- */}
        {/* Stand Base */}
        <ellipse cx="170" cy="340" rx="55" ry="12" fill="url(#standGrad)" stroke="#e2e8f0" strokeWidth="1.5" />
        {/* Stand Stem */}
        <path d="M155 285 Q170 310 150 338 L190 338 Q170 310 185 285 Z" fill="url(#standGrad)" />
        {/* Stand Plate Top */}
        <ellipse cx="170" cy="285" rx="100" ry="20" fill="url(#standGrad)" stroke="#e2e8f0" strokeWidth="2" filter="url(#cakeShadow)" />
        <ellipse cx="170" cy="284" rx="94" ry="17" fill="#ffffff" />

        {/* --- BOTTOM TIER (Lavender / Purple Cake) --- */}
        <g id="bottomTier">
          {/* Base Cylinder */}
          <path d="M90 235 L90 270 Q170 295 250 270 L250 235 Z" fill="url(#purpleTier)" />
          {/* Top Ellipse */}
          <ellipse cx="170" cy="235" rx="80" ry="18" fill="#e9d5ff" />

          {/* Sprinkles on bottom tier */}
          <rect x="110" y="248" width="6" height="2.5" rx="1" fill="#38bdf8" transform="rotate(20 110 248)" />
          <rect x="135" y="258" width="5" height="2.5" rx="1" fill="#fcd34d" transform="rotate(-30 135 258)" />
          <rect x="160" y="250" width="6" height="2.5" rx="1" fill="#fda4af" transform="rotate(45 160 250)" />
          <rect x="190" y="260" width="5" height="2.5" rx="1" fill="#34d399" transform="rotate(-15 190 260)" />
          <rect x="220" y="250" width="6" height="2.5" rx="1" fill="#fb7185" transform="rotate(30 220 250)" />
          <rect x="145" y="267" width="5" height="2.5" rx="1" fill="#ffffff" transform="rotate(10 145 267)" />
          <rect x="180" y="268" width="6" height="2.5" rx="1" fill="#f43f5e" transform="rotate(-40 180 268)" />

          {/* Cream pearl border along bottom tier base */}
          {[100, 115, 130, 146, 162, 178, 194, 210, 226, 240].map((x, i) => (
            <circle key={i} cx={x} cy={272 + Math.sin(i * 0.35) * 5} r="4" fill="#ffffff" stroke="#e9d5ff" strokeWidth="0.8" />
          ))}
        </g>

        {/* --- MACARONS & MERINGUES ON TIER RIDGE --- */}
        {/* Macaron Left (Mint Green) */}
        <g transform="translate(108, 222)">
          <ellipse cx="10" cy="8" rx="10" ry="6" fill="#6ee7b7" />
          <rect x="0" y="7" width="20" height="2" fill="#ffffff" rx="1" />
          <ellipse cx="10" cy="6" rx="9" ry="5" fill="#a7f3d0" />
        </g>
        {/* Macaron Center-Left (Yellow) */}
        <g transform="translate(136, 226)">
          <ellipse cx="10" cy="8" rx="9" ry="6" fill="#fde047" />
          <rect x="1" y="7" width="18" height="2" fill="#ffffff" rx="1" />
          <ellipse cx="10" cy="6" rx="8" ry="5" fill="#fef08a" />
        </g>
        {/* Meringue Dollop (White) */}
        <path d="M170 220 Q164 232 176 232 Q170 230 170 220 Z" fill="#ffffff" />
        <ellipse cx="170" cy="232" rx="7" ry="3" fill="#ffffff" />
        {/* Macaron Center-Right (Yellow/Peach) */}
        <g transform="translate(186, 226)">
          <ellipse cx="10" cy="8" rx="9" ry="6" fill="#fde047" />
          <rect x="1" y="7" width="18" height="2" fill="#ffffff" rx="1" />
          <ellipse cx="10" cy="6" rx="8" ry="5" fill="#fef08a" />
        </g>
        {/* Macaron Right (Mint Green) */}
        <g transform="translate(214, 221)">
          <ellipse cx="10" cy="8" rx="9" ry="6" fill="#6ee7b7" />
          <rect x="1" y="7" width="18" height="2" fill="#ffffff" rx="1" />
          <ellipse cx="10" cy="6" rx="8" ry="5" fill="#a7f3d0" />
        </g>

        {/* --- TOP TIER (Strawberry Pink with White Drip) --- */}
        <g id="topTier">
          {/* Main Pink Cylinder */}
          <path d="M115 168 L115 220 Q170 236 225 220 L225 168 Z" fill="url(#pinkTier)" />
          {/* Top Ellipse */}
          <ellipse cx="170" cy="168" rx="55" ry="14" fill="#fce7f3" />

          {/* White Frosting Drips */}
          <path
            d="M115 168 
               C115 185 122 188 126 182 
               C129 178 132 196 138 196 
               C143 196 145 178 150 180 
               C155 182 158 204 165 204 
               C172 204 175 178 180 178 
               C186 178 190 198 196 198 
               C202 198 206 182 212 182 
               C218 182 222 190 225 168 
               Z"
            fill="url(#whiteDrip)"
          />
        </g>

        {/* Top Tier Toppings: Red Heart + Macarons + Dollops */}
        {/* Red Heart Topping */}
        <path
          d="M170 156 C167 150 158 150 158 158 C158 166 170 172 170 172 C170 172 182 166 182 158 C182 150 173 150 170 156 Z"
          fill="#ef4444"
          filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))"
        />
        {/* Macaron Top Left (Strawberry) */}
        <g transform="translate(135, 156) rotate(-10)">
          <ellipse cx="8" cy="6" rx="7" ry="4.5" fill="#f43f5e" />
          <ellipse cx="8" cy="4" rx="6" ry="3.5" fill="#fb7185" />
        </g>
        {/* Macaron Top Right (Mint) */}
        <g transform="translate(192, 154) rotate(10)">
          <ellipse cx="8" cy="6" rx="7" ry="4.5" fill="#34d399" />
          <ellipse cx="8" cy="4" rx="6" ry="3.5" fill="#6ee7b7" />
        </g>

        {/* --- CANDLES --- */}
        {/* Candle 1 (Purple - Left) */}
        <g id="candle1">
          <rect x="128" y="125" width="5.5" height="35" rx="2" fill="#c084fc" />
          <line x1="130.7" y1="125" x2="130.7" y2="120" stroke="#475569" strokeWidth="1.2" />
          {candlesLit && (
            <g className="animate-pulse">
              <circle cx="130.7" cy="116" r="10" fill="url(#flameGlow)" />
              <path d="M130.7 110 Q127 116 130.7 120 Q134.4 116 130.7 110 Z" fill="url(#flameGrad)" />
            </g>
          )}
        </g>

        {/* Candle 2 (Pink - Center-Left) */}
        <g id="candle2">
          <rect x="144" y="115" width="5.5" height="45" rx="2" fill="#f43f5e" />
          <line x1="146.7" y1="115" x2="146.7" y2="110" stroke="#475569" strokeWidth="1.2" />
          {candlesLit && (
            <g className="animate-pulse" style={{ animationDelay: '0.2s' }}>
              <circle cx="146.7" cy="106" r="12" fill="url(#flameGlow)" />
              <path d="M146.7 99 Q143 106 146.7 110 Q150.4 106 146.7 99 Z" fill="url(#flameGrad)" />
            </g>
          )}
        </g>

        {/* Candle 3 (Yellow/Gold - Center) */}
        <g id="candle3">
          <rect x="167" y="128" width="5.5" height="32" rx="2" fill="#fbbf24" />
          <line x1="169.7" y1="128" x2="169.7" y2="123" stroke="#475569" strokeWidth="1.2" />
          {candlesLit && (
            <g className="animate-pulse" style={{ animationDelay: '0.4s' }}>
              <circle cx="169.7" cy="119" r="10" fill="url(#flameGlow)" />
              <path d="M169.7 113 Q166 119 169.7 123 Q173.4 119 169.7 113 Z" fill="url(#flameGrad)" />
            </g>
          )}
        </g>

        {/* Candle 4 (Mint Blue - Center-Right) */}
        <g id="candle4">
          <rect x="188" y="120" width="5.5" height="40" rx="2" fill="#2dd4bf" />
          <line x1="190.7" y1="120" x2="190.7" y2="115" stroke="#475569" strokeWidth="1.2" />
          {candlesLit && (
            <g className="animate-pulse" style={{ animationDelay: '0.1s' }}>
              <circle cx="190.7" cy="111" r="11" fill="url(#flameGlow)" />
              <path d="M190.7 104 Q187 111 190.7 115 Q194.4 111 190.7 104 Z" fill="url(#flameGrad)" />
            </g>
          )}
        </g>

        {/* Candle 5 (Lavender - Far Right) */}
        <g id="candle5">
          <rect x="204" y="127" width="5" height="33" rx="2" fill="#e879f9" />
          <line x1="206.5" y1="127" x2="206.5" y2="122" stroke="#475569" strokeWidth="1.2" />
          {candlesLit && (
            <g className="animate-pulse" style={{ animationDelay: '0.3s' }}>
              <circle cx="206.5" cy="118" r="9" fill="url(#flameGlow)" />
              <path d="M206.5 112 Q203 118 206.5 122 Q210 118 206.5 112 Z" fill="url(#flameGrad)" />
            </g>
          )}
        </g>

        {/* Candle Smoke effect when blown out */}
        {!candlesLit && (
          <g opacity="0.6">
            <path d="M130 118 Q125 105 132 95 Q135 85 128 75" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <path d="M146 108 Q152 95 145 85 Q140 75 148 65" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <path d="M170 120 Q165 110 172 100" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <path d="M190 112 Q195 100 188 90" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          </g>
        )}
      </svg>

      {/* Interactive button to blow or relight candles */}
      {onBlowCandles && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBlowCandles}
          className="mt-2 text-xs font-medium px-3 py-1 rounded-full bg-white/80 hover:bg-white text-rose-600 shadow-sm border border-rose-200 transition-colors flex items-center gap-1.5 backdrop-blur-sm"
        >
          {candlesLit ? (
            <>
              <span>🎂</span> Blow out the candles!
            </>
          ) : (
            <>
              <span>✨</span> Relight candles
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}
