import { motion } from 'motion/react';

const TECH_ITEMS = [
  "React", "Python", "Django", "JavaScript", "SQL", 
  "HTML5", "CSS3", "Java", "MongoDB", "Postman",
  "Vercel", "Firebase", "Node.js", "Git", "GitHub"
];

export default function TechMarquee() {
  return (
    <div className="py-10 bg-white/[0.02] border-y border-white/5 overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-4xl md:text-6xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-blue/40 to-neon-purple/40 hover:from-neon-blue hover:to-neon-pink transition-all cursor-default">
              {item}
            </span>
            <div className="w-3 h-3 rounded-full bg-neon-pink shadow-[0_0_10px_rgba(255,0,234,1)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
