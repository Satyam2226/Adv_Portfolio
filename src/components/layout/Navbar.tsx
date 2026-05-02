import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Internships', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-0 md:p-0">
      <motion.div 
        className="h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink origin-left absolute top-0 left-0 right-0 z-[60]"
        style={{ scaleX }}
      />
      
      <div className="p-4 md:p-6 transition-all duration-500">
        <nav 
          className={cn(
            "max-w-7xl mx-auto px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500",
            isScrolled ? "glass shadow-2xl backdrop-blur-2xl ring-1 ring-white/10" : "bg-transparent"
          )}
        >
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            className="text-xl font-bold font-display neon-text"
          >
            SK.
          </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-medium hover:text-neon-blue transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Socials & CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={PERSONAL_INFO.socials.github} target="_blank" className="hover:text-neon-blue"><Github size={20} /></a>
          <a href={PERSONAL_INFO.socials.linkedin} target="_blank" className="hover:text-neon-blue"><Linkedin size={20} /></a>
          <a href="#contact" className="px-5 py-2 bg-white/10 hover:bg-neon-blue/20 border border-white/20 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 glass rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium hover:text-neon-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl text-center font-bold text-white">
                  Hire Me
                </a>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex gap-6 justify-center pb-4">
                <a href={PERSONAL_INFO.socials.github} target="_blank" className="hover:text-neon-blue"><Github size={24} /></a>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" className="hover:text-neon-blue"><Linkedin size={24} /></a>
                <a href={PERSONAL_INFO.socials.instagram} target="_blank" className="hover:text-neon-blue"><Instagram size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
