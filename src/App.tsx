import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  GraduationCap, 
  Coffee, 
  Compass, 
  Briefcase, 
  Users,
  Search,
  ChevronRight,
  TrendingUp,
  Menu,
  X,
  Contrast
} from 'lucide-react';
import { cn } from './lib/utils';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import Academics from './components/Academics';
import SeniorInsights from './components/SeniorInsights';
import Navigator from './components/Navigator';
import CareerHub from './components/CareerHub';
import Profile from './components/Profile';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chat', label: 'Ask instiGPT', icon: MessageSquare },
  { path: '/map', label: 'Navigator', icon: Compass },
];

function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-bg border-r border-white/5 flex flex-col p-4 shrink-0 z-50 transition-transform lg:relative lg:translate-x-0 lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="mb-10 flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-accent/20 text-white">
              iG
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">instiGPT</h1>
              <p className="text-[9px] text-text-dim uppercase tracking-widest font-bold">Campus OS</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-text-dim hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                  isActive 
                    ? "bg-accent/10 border border-accent/20 text-accent font-bold" 
                    : "text-text-dim hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-accent" : ""
                )} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-accent rounded-full -translate-x-4" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2 px-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-[10px] font-semibold text-text-dim uppercase tracking-wider">System Linked</span>
          </div>
          <div className="px-2">
            <p className="text-[10px] text-text-dim">Institute DB Linked</p>
          </div>
        </div>
      </div>
    </>
  );
}

function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-text-dim max-w-sm">This module is coming soon to your insti experience. Stay tuned!</p>
        <Link to="/chat" className="mt-6 inline-block px-6 py-2 bg-accent text-bg rounded-full font-semibold transition-all">
          Ask instiGPT instead
        </Link>
      </div>
    </div>
  );
}

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('theme') === 'high-contrast';
  });
  const location = useLocation();

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('theme', 'high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('theme', 'standard');
    }
  }, [isHighContrast]);

  return (
    <div className="flex h-screen bg-[#040806] text-text-main font-sans overflow-hidden selection:bg-accent selection:text-bg relative">
      {/* Glossy Abstract Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none organic-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none organic-glow" />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-hidden flex flex-col relative">
          <header className="h-20 border-b border-white/5 bg-bg/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-text-dim hover:text-white bg-white/5 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative flex-1 group hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ask anything about campus..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-accent/5 focus:border-accent/40 outline-none transition-all text-white placeholder:text-text-dim"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/chat?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
                    }
                  }}
                />
              </div>
              <div className="sm:hidden flex items-center gap-3">
                 <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center font-bold text-sm text-white">iG</div>
                 <span className="font-bold tracking-tight text-white">instiGPT</span>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <button 
                onClick={() => setIsHighContrast(!isHighContrast)}
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-text-dim hover:text-white hover:border-accent transition-all flex items-center gap-2 group relative"
                title="Toggle High Contrast"
              >
                <Contrast className={`w-5 h-5 transition-transform duration-500 ${isHighContrast ? 'rotate-180' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:block">Contrast</span>
              </button>

              <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-2xl hidden xs:flex">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-text-dim uppercase tracking-wider">Lvl. 17 CS</span>
              </div>
              <Link to="/profile" className="flex items-center gap-3 group">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-bold text-white group-hover:text-accent transition-colors">Michael</div>
                  <div className="text-[10px] text-text-dim">ID: 2022CSB1001</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-accent/20 cursor-pointer hover:scale-105 transition-transform active:scale-95">M</div>
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<ChatInterface />} />
                <Route path="/map" element={<Navigator />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
