import { PERSONAL_INFO } from '../../constants';
import { Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold font-display neon-text mb-2">{PERSONAL_INFO.name}</h2>
          <p className="text-white/50 max-w-sm">{PERSONAL_INFO.intro}</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6">
            <a href={PERSONAL_INFO.socials.github} className="hover:text-neon-blue transition-colors"><Github size={20} /></a>
            <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-neon-blue transition-colors"><Linkedin size={20} /></a>
            <a href={PERSONAL_INFO.socials.instagram} className="hover:text-neon-blue transition-colors"><Instagram size={20} /></a>
          </div>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Satyam Kumar. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />
    </footer>
  );
}
