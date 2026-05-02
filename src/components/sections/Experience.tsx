import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { EXPERIENCE } from '../../constants';
import { Briefcase, Calendar, CheckCircle2, Cuboid as Cube } from 'lucide-react';

export default function Experience() {
  return (
    <div className="py-24 px-6 relative perspective-1000">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-display">Professional</h2>
            <h2 className="text-4xl md:text-5xl font-bold font-display neon-text">Internships</h2>
          </div>
          <p className="text-white/40 max-w-sm text-right">
            Hands-on professional experience building real-world software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {EXPERIENCE.map((exp, idx) => (
             <div key={idx}>
               <InternshipCard exp={exp} index={idx} />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternshipCard({ exp, index }: { exp: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative cursor-pointer h-full"
    >
      {/* 3D Glow Backdrop */}
      <div className="absolute inset-8 bg-neon-blue/20 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="glass p-10 h-full rounded-[3rem] border-white/5 relative overflow-hidden transition-all duration-500 group-hover:border-neon-blue/30 group-hover:bg-white/[0.03]">
        
        <div style={{ transform: "translateZ(60px)" }} className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center border border-white/10 group-hover:rotate-[360deg] transition-transform duration-1000 shadow-lg">
              <Cube className="text-neon-blue" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white group-hover:text-glow transition-all">{exp.company}</h3>
              <div className="flex items-center gap-2 text-white/40 text-sm font-mono mt-1">
                <Calendar size={14} />
                {exp.duration}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple inline-block">
              {exp.role}
            </p>
            <ul className="space-y-4">
              {exp.points.map((point: string, k: number) => (
                <li key={k} className="flex items-start gap-4 text-white/60 group-hover:text-white transition-colors">
                  <div className="mt-1 w-5 h-5 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0 border border-neon-blue/20">
                    <CheckCircle2 size={12} className="text-neon-blue" />
                  </div>
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Floating background icon for depth */}
        <div 
          style={{ transform: "translateZ(-30px)" }}
          className="absolute -bottom-10 -right-10 text-white/[0.02] rotate-12 group-hover:rotate-45 transition-transform duration-1000 pointer-events-none"
        >
          <Briefcase size={220} />
        </div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
