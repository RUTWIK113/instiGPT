import { motion } from 'motion/react';
import { Briefcase, Target, Rocket, GraduationCap, ChevronRight, MessageSquare, ClipboardList } from 'lucide-react';

export default function CareerHub() {
  const categories = [
    { title: 'Placement Drive', items: ['Interview Tips', 'Company List', 'Aptitude Tests', 'Mock Interviews'], icon: Briefcase, color: 'text-accent' },
    { title: 'Internship Quest', items: ['Summer Internships', 'Off-campus Guide', 'Resume Review', 'Portfolio Building'], icon: Rocket, color: 'text-pink-500' },
    { title: 'Prep Materials', items: ['DSA Resources', 'Core Subjects', 'HR Round FAQ', 'System Design'], icon: Target, color: 'text-emerald-400' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Career & Placement Hub</h1>
        <p className="text-text-dim text-lg">Your one-stop guide for interns and final placements.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-[2rem] p-8 space-y-6 relative overflow-hidden group"
          >
            <div className={cn("inline-flex p-4 rounded-2xl bg-white/5 border border-white/10", cat.color)}>
               <cat.icon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">{cat.title}</h2>
            <ul className="space-y-3">
              {cat.items.map(item => (
                <li key={item} className="flex items-center gap-3 text-text-dim hover:text-white cursor-pointer transition-colors group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover/item:scale-150 transition-transform" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <cat.icon className="w-32 h-32" />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="glass rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-accent/5 to-transparent">
        <div className="flex-1 space-y-6 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest">
              AI Powered Guidance
           </div>
           <h2 className="text-4xl font-bold leading-tight">Cracking the code to placements.</h2>
           <p className="text-text-dim text-lg leading-relaxed">
             Need a mock interview or a resume review? instiGPT can analyze your profile and provide real-time feedback based on previous year company patterns.
           </p>
           <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <a href="/chat" className="px-8 py-4 bg-accent text-bg font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-accent/20 flex items-center gap-2">
                 <MessageSquare className="w-5 h-5" /> Start Career Chat
              </a>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                 <ClipboardList className="w-5 h-5" /> Mock Test Drive
              </button>
           </div>
        </div>
        <div className="w-full max-w-sm shrink-0">
           <div className="glass p-6 rounded-3xl space-y-6 rotate-2 shadow-2xl bg-white/10">
              <h3 className="text-xl font-bold flex items-center gap-2 text-accent">
                 <GraduationCap className="w-5 h-5" /> Stats Today
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-text-dim">Registrations</span>
                    <span className="font-bold">1,240</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-text-dim">Companies Visited</span>
                    <span className="font-bold">42</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-text-dim">Avg. CTC</span>
                    <span className="font-bold text-accent">18.5 LPA</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
