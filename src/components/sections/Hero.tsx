import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../constants';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-xs font-bold tracking-widest text-neon-blue uppercase"
        >
          Available for Opportunities
        </motion.span>

        <h1 className="text-5xl md:text-8xl font-black font-display leading-tight overflow-hidden py-1">
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink drop-shadow-[0_0_15px_rgba(188,19,254,0.3)]">{PERSONAL_INFO.name.split(' ')[0]}</span>
          </motion.span>
        </h1>

        <div className="text-xl md:text-2xl text-white/70 font-medium overflow-hidden py-2">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I build <span className="text-neon-pink">modern web apps</span> and explore <span className="text-neon-purple">AI</span>.
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-white/60 text-lg leading-relaxed"
        >
          {PERSONAL_INFO.intro}
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 242, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all text-center"
          >
            Check Out My Work
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>

      {/* Floating geometric elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-[10%] w-12 h-12 border border-neon-blue/30 rounded-lg hidden md:block"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-[10%] w-16 h-16 border border-neon-purple/30 rounded-full hidden md:block"
      />
    </section>
  );
}
