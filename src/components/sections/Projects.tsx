import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { PROJECTS } from '../../constants';
import { ExternalLink, Github, Code2 } from 'lucide-react';

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
      className="relative group h-[480px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full glass rounded-[2.5rem] overflow-hidden border-white/5 group-hover:border-white/20 transition-all duration-500 flex flex-col">
        <div className="h-[180px] shrink-0 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-6 flex flex-col flex-1 justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map((t: string) => (
                <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/40 group-hover:text-neon-blue transition-colors uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:neon-text transition-all line-clamp-2 leading-tight">{project.title}</h3>
            <p className="text-xs text-white/50 line-clamp-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
            <div className="flex gap-2.5">
              <a href={project.github} className="p-2 glass-dark rounded-xl hover:text-neon-blue transition-colors border-white/10">
                <Github size={18} />
              </a>
              <a href={project.link} className="p-2 glass-dark rounded-xl hover:text-neon-blue transition-colors border-white/10">
                <ExternalLink size={18} />
              </a>
            </div>
            
            <div className="text-neon-blue flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer">
               <span className="text-[10px] font-black tracking-widest uppercase">Details</span>
               <Code2 size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <div className="py-24 px-6 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-black font-display opacity-10 absolute left-1/2 -translate-x-1/2 -translate-y-12 select-none tracking-widest uppercase">
            Featured
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold font-display relative z-10">
            Innovative <span className="neon-text">Creations</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">Exploring the boundaries of technology through functional and aesthetic digital experiences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
