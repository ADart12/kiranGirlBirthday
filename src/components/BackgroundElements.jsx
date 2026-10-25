import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundElements() {
  // Pre-generate confetti sprinkles matching the screenshots
  const confettiPieces = useMemo(() => {
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fcd34d', '#c084fc', '#38bdf8', '#34d399', '#f97316'];
    const pieces = [];
    for (let i = 0; i < 38; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'rect' : (Math.random() > 0.3 ? 'pill' : 'dot'),
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 4,
      });
    }
    return pieces;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dreamy Gradient Glow Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl" />

      {/* Floating Confetti and Sprinkles like in reference image */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [piece.rotation, piece.rotation + 45, piece.rotation],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: "easeInOut",
          }}
        >
          {piece.shape === 'rect' && (
            <div
              style={{
                width: `${piece.size}px`,
                height: `${piece.size * 0.45}px`,
                backgroundColor: piece.color,
                borderRadius: '1.5px',
                transform: `rotate(${piece.rotation}deg)`,
              }}
              className="shadow-sm"
            />
          )}
          {piece.shape === 'pill' && (
            <div
              style={{
                width: `${piece.size * 1.4}px`,
                height: `${piece.size * 0.35}px`,
                backgroundColor: piece.color,
                borderRadius: '9999px',
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          )}
          {piece.shape === 'dot' && (
            <div
              style={{
                width: `${piece.size * 0.6}px`,
                height: `${piece.size * 0.6}px`,
                backgroundColor: piece.color,
                borderRadius: '50%',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
