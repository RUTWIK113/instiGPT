import { motion } from 'motion/react';
import { User, Mail, GraduationCap, MapPin, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  const user = {
    name: "Michael",
    email: "michael@university.edu",
    id: "2022CSB1001",
    major: "Computer Science & Engineering",
    year: "Year 3",
    hostel: "Hostel-12, Room 302"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto space-y-8"
    >
      <div className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 rounded-3xl bg-accent flex items-center justify-center text-bg text-4xl font-bold shadow-2xl shadow-accent/20">
            M
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-text-dim flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <span className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-wider">
                {user.year}
              </span>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-text-dim text-xs font-bold uppercase tracking-wider">
                {user.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent" /> Academic Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-text-dim text-sm">Major</span>
              <span className="font-medium">{user.major}</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" /> Campus Residence
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-text-dim text-sm">Allotted Hostel</span>
              <span className="font-medium">{user.hostel.split(',')[0]}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-dim text-sm">Mess Membership</span>
              <span className="font-medium">DH-2 (Linked)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button className="flex-1 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <Settings className="w-5 h-5" /> Account Settings
        </button>
        <button className="flex-1 px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </motion.div>
  );
}
