import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../constants';
import { User, Code2, Rocket, Terminal } from 'lucide-react';

export default function About() {
  const cards = [
    { icon: <Code2 className="text-neon-blue" />, title: "Full Stack Dev", text: "Expertise in React & Python" },
    { icon: <Terminal className="text-neon-purple" />, title: "Python Developer", text: "Scalable backend solutions" },
    { icon: <Rocket className="text-neon-blue" />, title: "Problem Solver", text: "Algorithm specialist" },
  ];

  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Container */}
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-[2rem] opacity-20 group-hover:opacity-40 blur-2xl transition duration-500" />
            <div className="relative glass p-4 rounded-[2rem] overflow-hidden">
               <img 
                 src={PERSONAL_INFO.profileImage} 
                 alt={PERSONAL_INFO.name} 
                 className="w-full h-auto rounded-3xl grayscale group-hover:grayscale-0 transition duration-700 hover:scale-105"
                 referrerPolicy="no-referrer"
               />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl border-neon-blue/20">
              <span className="block text-4xl font-black neon-text">B.Tech</span>
              <span className="text-xs uppercase tracking-widest text-white/50">CSE Student</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold font-display flex items-center gap-4">
                <User className="text-neon-blue" size={32} />
                About Me
              </h2>
              <p className="text-lg text-white/70 leading-relaxed italic">
                "Driven by curiosity, powered by lines of code."
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                I am a passionate <span className="text-white">Full Stack Developer</span> and <span className="text-white">Python Developer</span> based in India. Currently pursuing my B.Tech in Computer Science at GIFT Autonomous, I focus on building scalable web applications and exploring the depths of high-performance backend systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-2xl border-white/5 hover:border-neon-blue/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-xs text-white/50">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
