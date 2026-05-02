/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Background from './components/layout/Background';
import FloatingBubbles from './components/layout/FloatingBubbles';
import CustomCursor from './components/layout/CustomCursor';
import Hero from './components/sections/Hero';
import SectionWrapper from './components/layout/SectionWrapper';
import About from './components/sections/About';
import Education from './components/sections/Education';
import SchoolHighlights from './components/sections/SchoolHighlights';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import TerminalSection from './components/sections/TerminalSection';
import TechMarquee from './components/sections/TechMarquee';
import SocialDock from './components/layout/SocialDock';
import BackToTop from './components/layout/BackToTop';
import Contact from './components/sections/Contact';

export default function App() {
  useEffect(() => {
    // Smooth scroll polyfill functionality
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative selection:bg-neon-blue selection:text-black">
      <CustomCursor />
      <Background />
      <FloatingBubbles />
      <SocialDock />
      <BackToTop />
      <Navbar />

      <main>
        <Hero />
        <TechMarquee />
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>
        <SectionWrapper>
          <TerminalSection />
        </SectionWrapper>
        <SectionWrapper id="education">
          <Education />
        </SectionWrapper>
        <SectionWrapper>
          <SchoolHighlights />
        </SectionWrapper>
        <SectionWrapper id="experience">
          <Experience />
        </SectionWrapper>
        <SectionWrapper id="skills">
          <Skills />
        </SectionWrapper>
        <SectionWrapper id="projects">
          <Projects />
        </SectionWrapper>
        <SectionWrapper id="achievements">
          <Achievements />
        </SectionWrapper>
        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
}
