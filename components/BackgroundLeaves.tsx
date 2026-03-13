import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface LeafParticle {
  id: number;
  x: number; // Percent 0-100
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
}

export const BackgroundLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Create random leaves
    const count = 15;
    const newLeaves: LeafParticle[] = [];
    for (let i = 0; i < count; i++) {
      newLeaves.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 20, // 15-35s duration
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ 
            y: -100, 
            x: `${leaf.x}vw`, 
            opacity: 0, 
            rotate: leaf.rotation 
          }}
          animate={{ 
            y: '110vh', 
            x: `${leaf.x + (Math.random() * 20 - 10)}vw`, // slight drift
            opacity: [0, 0.4, 0.4, 0], 
            rotate: leaf.rotation + 360 
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <Leaf 
            className={`
              ${theme === 'dark' ? 'text-emerald-800/20' : 'text-emerald-400/20'}
            `}
            size={40 * leaf.scale}
          />
        </motion.div>
      ))}
      
      {/* Add a subtle ambient gradient blob */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};