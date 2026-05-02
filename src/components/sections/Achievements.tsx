import { motion } from 'motion/react';
import { ACHIEVEMENTS } from '../../constants';
import * as Icons from 'lucide-react';

export default function Achievements() {
  return (
    <div className="py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tighter">
            Recognitions & <span className="neon-text">Stats</span>
          </h2>
          <p className="text-white/40 mt-2">Milestones reached in my professional journey.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
          {/* Main Stat Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            whileTap={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 glass p-8 rounded-[2rem] border-white/5 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-10">
               <h3 className="text-sm font-bold uppercase tracking-widest text-neon-blue mb-4">Core Philosophy</h3>
               <p className="text-3xl font-black leading-tight group-hover:neon-text transition-all">
                 Building systems that don't just work, but <span className="text-neon-pink">perform</span>.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10 pt-12">
               <div>
                  <div className="text-5xl font-black neon-text">15+</div>
                  <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Projects Completed</div>
               </div>
               <div>
                  <div className="text-5xl font-black text-white">50k+</div>
                  <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Lines of Code</div>
               </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </motion.div>

          {/* Achievement Cards */}
          {ACHIEVEMENTS.map((item, idx) => {
            const IconComponent = (Icons as any)[item.icon];
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.02 }}
                className="glass p-5 rounded-[2rem] border-white/5 flex flex-col gap-3 group hover:border-neon-purple/40 transition-all bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-black/20">
                  {IconComponent && <IconComponent className="text-neon-purple" size={20} />}
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{item.year}</span>
                  <h3 className="font-bold text-white leading-tight mt-0.5 text-xs md:text-sm">{item.title}</h3>
                  {item.company && <p className="text-[9px] text-neon-blue/60 mt-0.5 font-bold uppercase tracking-wider">{item.company}</p>}
                  {item.desc && <p className="text-[10px] text-white/40 mt-2 line-clamp-2">{item.desc}</p>}
                </div>
                {item.certificateUrl && (
                  <a 
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto pt-2 flex items-center gap-1.5 text-[9px] font-bold text-white/40 hover:text-white transition-colors group/link"
                  >
                    VIEW CERTIFICATE
                    <Icons.ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </motion.div>
            );
          })}

          {/* Small Stat Box */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }}
            className="glass-dark p-6 rounded-[2rem] border-white/10 flex items-center justify-center text-center group"
          >
             <div>
                <div className="text-3xl font-black text-neon-pink group-hover:scale-110 transition-transform">100%</div>
                <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Git Commitment</div>
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }}
            className="glass flex items-center justify-center p-6 rounded-[2rem] border-white/5 bg-neon-blue/5"
          >
             <div className="text-center">
                <Icons.Coffee className="mx-auto mb-2 text-neon-blue" size={24} />
                <div className="text-xl font-bold">Infinite</div>
                <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Caffeine Consumed</div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
