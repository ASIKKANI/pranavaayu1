import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  type: 'petal' | 'dust';
  x: number; // 0-100 vw
  scale: number;
  rotation: number;
  duration: number;
  delay: number;
  sway: number;
}

export const LivingBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particle system on mount
    const particleCount = 120; // Increased from 40 to 120
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = Math.random() > 0.6; // 40% petals, 60% dust
      newParticles.push({
        id: i,
        type: isPetal ? 'petal' : 'dust',
        x: Math.random() * 100,
        scale: isPetal ? 0.5 + Math.random() * 0.8 : 0.1 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 25, // Slow fall between 15s and 40s
        delay: Math.random() * -20, // Start at different points in the cycle
        sway: 10 + Math.random() * 20, // Horizontal sway amount
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900 transition-colors duration-1000">
      {/* Ambient Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-200/20 dark:bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-teal-200/20 dark:bg-teal-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 left-0 will-change-transform"
          initial={{ 
            y: '-10vh', 
            x: `${p.x}vw`, 
            opacity: 0, 
            rotate: p.rotation,
            scale: p.scale 
          }}
          animate={{
            y: '110vh',
            x: [`${p.x}vw`, `${p.x + p.sway/5}vw`, `${p.x - p.sway/5}vw`, `${p.x}vw`],
            opacity: p.type === 'petal' ? [0, 0.8, 0.8, 0] : [0, 0.4, 0.4, 0],
            rotate: p.type === 'petal' ? [p.rotation, p.rotation + 180, p.rotation + 360] : p.rotation,
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.8, // Sway slightly faster/slower than fall
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
            rotate: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1]
            }
          }}
        >
          {p.type === 'petal' ? (
             // Stylized Petal SVG
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2C12 2 14 8 18 12C22 16 12 22 12 22C12 22 2 16 6 12C10 8 12 2 12 2Z" 
                     className="fill-emerald-200/40 dark:fill-emerald-400/10 stroke-emerald-300/20" strokeWidth="1" />
             </svg>
          ) : (
            // Oxygen Dust
            <div className="w-2 h-2 rounded-full bg-white dark:bg-emerald-200 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};