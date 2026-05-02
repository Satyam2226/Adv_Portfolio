import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SKILLS } from '../../constants';
import * as Icons from 'lucide-react';

export default function Skills() {
  return (
    <div className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-purple/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tighter">
            Technological <span className="neon-text">Arsenal</span>
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {SKILLS.map((skill, idx) => (
            <div key={idx} className="h-full">
              <SkillCard skill={skill} index={idx} />
            </div>
          ))}
        </div>
        
        {/* Additional Tools & Skills */}
        <div className="mt-20">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-xs font-black uppercase tracking-[0.3em] mb-10"
          >
            Tools & Ecosystem
          </motion.h4>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "REST APIs", "Git/GitHub", "Teamwork", "Postman", 
              "Vercel", "VS Code", "IntelliJ IDEA", "Firebase",
              "Docker"
            ].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-6 py-2.5 glass rounded-full text-xs font-bold text-white/40 border-white/5 hover:border-neon-blue/40 hover:text-white hover:bg-white/5 transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = (Icons as any)[skill.icon];

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative cursor-pointer h-full"
    >
      <div className="glass p-6 rounded-3xl flex flex-col items-center justify-center gap-6 border-white/5 group-hover:border-neon-blue/40 transition-all duration-500 bg-[#0a0a0a]/40 h-full">
        {/* Skill Circular Progress */}
        <div style={{ transform: "translateZ(80px)" }} className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={251.2}
              initial={{ strokeDashoffset: 251.2 }}
              whileInView={{ strokeDashoffset: 251.2 - (251.2 * skill.level) / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-neon-blue drop-shadow-[0_0_12px_rgba(0,242,255,0.5)]"
            />
          </svg>
          <motion.div 
            style={{ transform: "translateZ(30px)" }}
            className="absolute inset-0 flex items-center justify-center text-white/20 group-hover:text-neon-blue transition-all"
          >
            {IconComponent && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="transition-transform duration-300"
              >
                <IconComponent size={32} />
              </motion.div>
            )}
          </motion.div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="text-center">
          <h3 className="text-lg font-bold text-white group-hover:text-neon-blue transition-colors">{skill.name}</h3>
          <p className="text-xs text-white/40 font-mono mt-1">{skill.level}% Proficiency</p>
        </div>
      </div>

      {/* Floating Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-neon-blue/0 via-neon-blue/10 to-neon-blue/0 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-2xl transition duration-700 -z-10" />
    </motion.div>
  );
}

