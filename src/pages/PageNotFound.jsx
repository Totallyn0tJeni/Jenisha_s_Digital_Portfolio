import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display font-bold text-8xl md:text-9xl glow-text mb-4">404</h1>
        <p className="text-slate-400 text-lg mb-8">This page wandered off into the void.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white text-slate-900 hover:bg-violet-50 transition">
          <HomeIcon className="w-4 h-4" /> Back Home
        </Link>
      </motion.div>
    </div>
  );
}