import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';

export default function Layout() {
  const location = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden" id="top">
      {/* Ambient background — subtle lavender orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: 'hsl(var(--primary))', top: '-100px', left: '-100px' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: 'hsl(var(--primary-light))', bottom: '10%', right: '-50px' }}
        />
      </div>

      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <main className="relative z-10 pt-24">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}