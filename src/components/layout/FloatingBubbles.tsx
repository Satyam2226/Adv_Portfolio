import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 10,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20,
      color: i % 3 === 0 ? 'rgba(0, 242, 255, 0.15)' : i % 3 === 1 ? 'rgba(188, 19, 254, 0.15)' : 'rgba(255, 0, 234, 0.1)',
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ opacity: 0, y: "110vh" }}
          animate={{
            opacity: [0, 0.5, 0.5, 0],
            y: ["110vh", "-10vh"],
            x: [
              `${bubble.x}vw`, 
              `${bubble.x + Math.sin(bubble.id) * 5}vw`,
              `${bubble.x - Math.sin(bubble.id) * 3}vw`,
              `${bubble.x}vw`
            ],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
          className="absolute rounded-full blur-[1px] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          style={{
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
            left: 0,
          }}
        />
      ))}
    </div>
  );
}
