import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, ChevronRight, Binary } from 'lucide-react';

export default function TerminalSection() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "python3 profile_loader.py --user Satyam --mode developer\n> Initializing neural networks...\n> Loading skill-base: React, JavaScript, Python...\n> Optimization complete.\n> Ready to build the future.";

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-neon-pink/10">
          {/* Terminal Header */}
          <div className="bg-white/10 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/30">
              <TerminalIcon size={12} />
              Developer System Terminal
            </div>
            <div className="w-10" />
          </div>

          {/* Terminal Body */}
          <div className="bg-black/90 p-8 font-mono text-sm md:text-base min-h-[300px] relative">
            <div className="absolute top-0 right-0 p-8 text-neon-pink opacity-5 pointer-events-none">
              <Binary size={150} />
            </div>
            
            <div className="space-y-2 whitespace-pre-wrap leading-relaxed">
              <span className="text-neon-blue">satyam@system:~$</span> {text}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2.5 h-5 bg-neon-pink ml-1 align-middle"
              />
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
               {['--ai-ready', '--optimized', '--full-stack'].map((param) => (
                 <div key={param} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/40">
                   {param}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
