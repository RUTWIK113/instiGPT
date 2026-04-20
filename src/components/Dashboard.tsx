import { motion } from 'motion/react';
import { 
  Clock, 
  ChevronRight, 
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Utensils,
  Coffee,
  CalendarDays,
  MoreVertical,
  LucideIcon,
  Circle,
  MapPin,
  Plus
} from 'lucide-react';
import { instituteData } from '../data/instituteData';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TimetableEntry } from '../types';

function BentoCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn("glass rounded-[2rem] p-6 relative overflow-hidden group border border-white/5", className)}
    >
      {children}
    </motion.div>
  );
}

function OrganicGlow({ color, className }: { color: string, className?: string }) {
  return (
    <div 
      className={cn("absolute rounded-full blur-[100px] opacity-20 pointer-events-none z-0 organic-glow", className)} 
      style={{ backgroundColor: color }}
    />
  );
}

export default function Dashboard() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todos] = useState([
    { id: '1', task: 'Complete CS302 Lab 4', done: false },
    { id: '2', task: 'Submit Scholarship Form', done: true },
    { id: '3', task: 'Return Library Books', done: false }
  ]);
  
  useEffect(() => {
    const saved = localStorage.getItem('timetable');
    if (saved) setTimetable(JSON.parse(saved));

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // IST is UTC + 5.5 hours
  const getISTTime = (date: Date) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    return ist;
  };

  const istDate = getISTTime(currentTime);
  const timeString = istDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = istDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(istDate);
  const todayClasses = timetable.filter(e => e.day === today);

  const nextDeadlines = [...instituteData.deadlines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 3);
  const upcomingEvents = [...instituteData.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  
  return (
    <div className="min-h-full pb-24 pt-8 px-4 sm:px-8 max-w-7xl mx-auto relative">
      <OrganicGlow color="var(--color-accent)" className="w-[400px] h-[400px] -top-20 -right-20" />
      <OrganicGlow color="#10b981" className="w-[300px] h-[300px] top-1/2 -left-20" />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="text-left font-display px-6 py-4 glass rounded-3xl border-accent/20">
            <div className="text-5xl font-bold tracking-tight text-accent flex items-baseline gap-2">
              <Clock className="w-8 h-8 self-center mr-2 animate-pulse" />
              {timeString.split(':')[0]}<span className="text-white/40">:</span>{timeString.split(':')[1]}
            </div>
            <div className="text-[10px] text-text-dim uppercase tracking-[0.4em] font-bold mt-2">{dateString} (IST)</div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-white">
              Good Morning, <br /> <span className="text-accent">Michael</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-3 rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-bg font-black text-lg shadow-lg shadow-accent/20">
            M
          </div>
          <div className="pr-6">
            <div className="text-sm font-black text-white tracking-wide">Michael</div>
            <div className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">Active • Online</div>
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-6 relative z-10 auto-rows-min">
        
        {/* Today's Classes - Priority Box */}
        <BentoCard className="lg:col-span-2 bg-gradient-to-br from-accent/20 to-transparent border-accent/30 flex flex-col justify-between min-h-[140px]">
           <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-2 py-0.5 bg-accent/20 rounded-full">Coming Up Today</span>
                 <h3 className="text-4xl font-black text-white mt-2">Classes</h3>
              </div>
              <CalendarDays className="w-10 h-10 text-accent/50" />
           </div>
           
           <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
              {todayClasses.length > 0 ? todayClasses.map((item, i) => (
                <div key={item.id} className="min-w-[150px] p-4 glass bg-white/5 border-white/10 rounded-2xl space-y-1">
                   <div className="text-xs font-bold text-white">{item.subject}</div>
                   <div className="text-[10px] text-text-dim">{item.time}</div>
                   <div className="text-[10px] font-bold text-accent">{item.location}</div>
                </div>
              )) : (
                <div className="flex-1 py-4 text-center border border-dashed border-white/10 rounded-2xl">
                   <p className="text-xs text-text-dim">No classes scheduled for today! 🎉</p>
                </div>
              )}
           </div>
        </BentoCard>

        {/* Task Tracker */}
        <BentoCard className="lg:row-span-2 bg-zinc-900/40">
           <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Tasks
                 </h3>
                 <div className="p-2 bg-white/5 rounded-xl text-text-dim">
                    <Plus className="w-4 h-4" />
                 </div>
              </div>
              <div className="space-y-4 flex-1">
                 {todos.map(todo => (
                    <div key={todo.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all group">
                       <Circle className={cn("w-4 h-4", todo.done ? "fill-emerald-400 text-emerald-400" : "text-text-dim group-hover:text-accent")} />
                       <span className={cn("text-sm", todo.done ? "text-text-dim line-through" : "text-white font-medium")}>{todo.task}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8 p-4 bg-emerald-400/10 rounded-2xl border border-emerald-400/20">
                 <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Focus Mode</p>
                 <p className="text-xs text-white mt-1">Submit Lab 4 by Friday evening.</p>
              </div>
           </div>
        </BentoCard>

        {/* Frequent Places */}
        <BentoCard className="lg:row-span-2 overflow-hidden flex flex-col p-0 border-accent/20">
           <div className="relative flex-1 group">
              <img 
                src="https://picsum.photos/seed/hangout/800/1000" 
                alt="Hangout" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-[#040806]/40 to-transparent" />
              <div className="absolute top-6 left-6 p-3 glass bg-accent/20 border-accent/30 rounded-2xl text-accent">
                 <MapPin className="w-6 h-6" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                 <div className="space-y-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Frequent Spot</span>
                    <h3 className="text-2xl font-black text-white tracking-tight">Lake View Park</h3>
                 </div>
                 <Link to="/map" className="w-full py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 font-bold hover:bg-white/20 transition-all text-xs flex items-center justify-center gap-2">
                    Navigate <Navigation className="w-3 h-3" />
                 </Link>
              </div>
           </div>
        </BentoCard>

        {/* Calendar/Events */}
        <BentoCard className="lg:col-span-2 lg:row-span-2 flex flex-col border-accent/10">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3">
                 <CalendarDays className="w-6 h-6 text-accent" /> Upcoming Events
              </h3>
              <div className="text-[10px] font-bold text-text-dim uppercase tracking-widest italic">April 2026</div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map(event => (
                 <div key={event.id} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all flex flex-col justify-between gap-4">
                    <div>
                       <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{event.category}</div>
                       <div className="text-lg font-bold leading-tight line-clamp-2">{event.title}</div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                       <Clock className="w-4 h-4 text-text-dim" />
                       <div className="text-xs font-bold text-text-dim">Date: {new Date(event.date).toLocaleDateString()}</div>
                    </div>
                 </div>
              ))}
              <div className="p-5 rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-center">
                 <p className="text-xs text-text-dim font-bold uppercase tracking-widest leading-relaxed">More events <br /> loading...</p>
              </div>
           </div>
        </BentoCard>

        {/* Quick AI Tip */}
        <BentoCard className="lg:col-span-2 bg-accent-dim border-accent/20 flex flex-col sm:flex-row items-center gap-8">
           <div className="w-24 h-24 rounded-full border border-dashed border-accent/40 flex items-center justify-center p-3 shrink-0">
              <div className="w-full h-full bg-accent/20 rounded-full flex items-center justify-center">
                 <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              </div>
           </div>
           <div className="space-y-2">
              <h4 className="text-xl font-black text-white">Ask anything to instiGPT</h4>
              <p className="text-sm text-text-dim leading-relaxed">Need help with institute rules or campus locations? The smartest senior is just a message away.</p>
              <Link to="/chat" className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-widest mt-2 hover:translate-x-1 transition-transform">
                 Start a chat <ChevronRight className="w-4 h-4" />
              </Link>
           </div>
        </BentoCard>

      </div>
    </div>
  );
}

function Navigation({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}
