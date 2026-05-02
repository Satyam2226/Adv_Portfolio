import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { EDUCATION } from '../../constants';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <div className="py-24 px-6 relative bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display inline-block relative">
            Academic Journey
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            A track record of academic excellence and continuous learning.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

          <div className="space-y-12">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.8)] z-10" />

                <div className="w-full md:w-1/2 pl-16 md:pl-0 text-left md:text-right flex flex-col items-end">
                   {idx % 2 === 0 ? (
                     <EducationalCard edu={edu} />
                   ) : (
                     <div className="hidden md:block" />
                   )}
                </div>

                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                   {idx % 2 !== 0 ? (
                     <EducationalCard edu={edu} isRight />
                   ) : (
                     <div className="hidden md:block" />
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationalCard({ edu, isRight = false }: { edu: any, isRight?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`glass p-8 rounded-3xl border-white/5 relative group transition-colors hover:border-neon-blue/30 max-w-lg cursor-pointer ${!isRight ? 'md:ml-12' : 'md:mr-12'}`}
    >
      <div style={{ transform: "translateZ(40px)" }} className={`flex items-start gap-4 mb-4 ${!isRight ? 'flex-row' : 'md:flex-row-reverse'}`}>
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-neon-blue/50 group-hover:bg-neon-blue/10 transition-all">
          <GraduationCap className="text-neon-blue" />
        </div>
        <div className={!isRight ? 'text-left' : 'md:text-right text-left'}>
           <span className="text-xs font-bold text-neon-blue tracking-widest uppercase">{edu.year}</span>
           <h3 className="text-xl font-bold text-white mt-1 group-hover:neon-text transition-all">{edu.institution}</h3>
        </div>
      </div>
      
      <div style={{ transform: "translateZ(30px)" }} className={`space-y-4 ${!isRight ? 'text-left' : 'md:text-right text-left'}`}>
        <p className="text-neon-purple font-semibold text-sm">{edu.degree} — {edu.grade}</p>
        <p className="text-white/50 text-sm leading-relaxed">{edu.description}</p>
        
        <div className={`flex items-center gap-3 pt-4 ${!isRight ? 'justify-start' : 'md:justify-end justify-start'}`}>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/40 flex items-center gap-1 group-hover:text-white transition-colors">
            <BookOpen size={12} />
            Academic
          </span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/40 flex items-center gap-1 group-hover:text-white transition-colors">
            <Award size={12} />
            Certified
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
    </motion.div>
  );
}

