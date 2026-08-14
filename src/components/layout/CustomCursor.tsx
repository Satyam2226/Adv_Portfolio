import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

const BUBBLE_COUNT = 12;

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // We create an array of springs for each bubble to create a trail effect
  const springs = Array.from({ length: BUBBLE_COUNT }).map((_, i) => ({
    x: useSpring(0, { damping: 20 + i * 2, stiffness: 100 + i * 10 }),
    y: useSpring(0, { damping: 20 + i * 2, stiffness: 100 + i * 10 })
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springs.forEach((spring) => {
        spring.x.set(e.clientX);
        spring.y.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [springs]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] block overflow-hidden">
      {springs.map((spring, i) => {
        const size = 6 + (BUBBLE_COUNT - i) * 2;
        const color = i % 3 === 0 ? '#00f2ff' : i % 3 === 1 ? '#bc13fe' : '#ff00ea';
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[6px]"
            style={{
              x: spring.x,
              y: spring.y,
              width: size,
              height: size,
              backgroundColor: color,
              opacity: (1 - i / BUBBLE_COUNT) * 0.35,
              translateX: "-50%",
              translateY: "-50%",
              scale: isHovering ? 1.2 : 1,
            }}
          />
        );
      })}
      
      {/* Main Cursor Core */}
      <motion.div
        className="absolute w-6 h-6 rounded-full z-10 border-2 border-white bg-transparent shadow-[0_0_12px_rgba(124,58,237,0.25)]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        style={{ translateX: "-50%", translateY: "-50%", mixBlendMode: 'difference' as any }}
      />
    </div>
  );
}
