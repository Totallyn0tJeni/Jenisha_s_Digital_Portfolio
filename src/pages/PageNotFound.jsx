import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative z-10 overflow-x-clip">
      <h1 className="font-display font-semibold text-xl md:text-2xl text-muted-foreground">There's some issues</h1>
      <div className="nf-code font-display" aria-label="404" role="img">
        <span><span>4</span></span>
        <span>0</span>
        <span><span>4</span></span>
      </div>
      <p className="text-muted-foreground text-base mb-8">This page wandered off into the void.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
        <HomeIcon className="w-4 h-4" /> Back Home
      </Link>
    </div>
  );
}
