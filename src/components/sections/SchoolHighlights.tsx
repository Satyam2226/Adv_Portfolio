import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, Users, Trophy, BookOpen } from 'lucide-react';
import { SCHOOL_HIGHLIGHTS } from '../../constants';

const ICON_MAP: Record<string, any> = {
  Star: <Star className="text-neon-blue" size={20} />,
  Users: <Users className="text-neon-purple" size={20} />,
  Trophy: <Trophy className="text-neon-blue" size={20} />,
  BookOpen: <BookOpen className="text-neon-purple" size={20} />,
};

export default function SchoolHighlights() {
  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Schooling <span className="neon-text">Highlights</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              My foundation at R.S. Sr. Sec. School was built on rigorous academics and diverse extracurricular activities. Here are some key achievements that shaped my early career.
            </p>
            
            <div className="flex flex-col gap-4">
               <div className="glass p-6 rounded-2xl border-neon-blue/20">
                  <h4 className="text-neon-blue font-bold mb-2">10th Class (Secondary)</h4>
                  <p className="text-2xl font-black">84.5%</p>
               </div>
               <div className="glass p-6 rounded-2xl border-neon-purple/20">
                  <h4 className="text-neon-purple font-bold mb-2">12th Class (Senior Secondary)</h4>
                  <p className="text-2xl font-black">66.7%</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
            {SCHOOL_HIGHLIGHTS.map((item, idx) => (
              <div key={idx}>
                <HighlightCard item={item} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ item, index }: { item: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass p-6 rounded-3xl border-white/5 hover:border-neon-blue/30 transition-all flex flex-col gap-4 group cursor-pointer"
    >
      <div style={{ transform: "translateZ(50px)" }} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-blue/40 group-hover:bg-neon-blue/10 transition-all">
        {ICON_MAP[item.icon] || <Star className="text-neon-blue" size={20} />}
      </div>
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{item.title}</h3>
        <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
      </div>
      <span 
        style={{ transform: "translateZ(40px)" }}
        className="mt-auto self-start text-[10px] font-bold uppercase tracking-widest text-neon-blue/60 group-hover:text-neon-blue"
      >
         {item.tag}
      </span>
      
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
    </motion.div>
  );
}

