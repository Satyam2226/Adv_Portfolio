import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Mail, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

export default function SocialDock() {
  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[40] w-[95%] max-w-max">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-dark px-4 md:px-6 py-2.5 md:py-3 rounded-2xl flex items-center gap-4 md:gap-6 border-white/10 shadow-2xl justify-center"
      >
        <DockIcon icon={<Github size={18} className="md:w-5 md:h-5" />} href={PERSONAL_INFO.socials.github} label="GitHub" />
        <DockIcon icon={<Linkedin size={18} className="md:w-5 md:h-5" />} href={PERSONAL_INFO.socials.linkedin} label="LinkedIn" />
        <DockIcon icon={<Instagram size={18} className="md:w-5 md:h-5" />} href={PERSONAL_INFO.socials.instagram} label="Instagram" />
        <div className="w-px h-5 md:h-6 bg-white/10 mx-1 md:mx-2" />
        <DockIcon icon={<Mail size={18} className="md:w-5 md:h-5" />} href={`mailto:${PERSONAL_INFO.email}`} label="Email" />
        <motion.a
          href={PERSONAL_INFO.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-neon-blue/20 rounded-xl transition-all group"
        >
          <Download size={14} className="md:w-4 md:h-4 text-neon-blue group-hover:animate-bounce" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Resume</span>
        </motion.a>
      </motion.div>
    </div>
  );
}

function DockIcon({ icon, href, label }: { icon: any, href: string, label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.2, y: -4, color: '#00f2ff' }}
      className="text-white/40 hover:text-white transition-all relative group"
    >
      {icon}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
        {label}
      </span>
    </motion.a>
  );
}
