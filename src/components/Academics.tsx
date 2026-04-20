import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Link as LinkIcon, ExternalLink, Calendar, PlusCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { TimetableEntry, ImportantLink } from '../types';

export default function Academics() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [links, setLinks] = useState<ImportantLink[]>([]);
  
  const [newEntry, setNewEntry] = useState({ day: 'Monday', subject: '', time: '', location: '' });
  const [newLink, setNewLink] = useState({ title: '', url: '', category: 'General' });

  useEffect(() => {
    const savedTimetable = localStorage.getItem('timetable');
    const savedLinks = localStorage.getItem('links');
    if (savedTimetable) setTimetable(JSON.parse(savedTimetable));
    if (savedLinks) setLinks(JSON.parse(savedLinks));
  }, []);

  const saveTimetable = (data: TimetableEntry[]) => {
    setTimetable(data);
    localStorage.setItem('timetable', JSON.stringify(data));
  };

  const saveLinks = (data: ImportantLink[]) => {
    setLinks(data);
    localStorage.setItem('links', JSON.stringify(data));
  };

  const addTimetableEntry = () => {
    if (!newEntry.subject || !newEntry.time) return;
    const entry: TimetableEntry = { ...newEntry, id: Date.now().toString() };
    saveTimetable([...timetable, entry]);
    setNewEntry({ ...newEntry, subject: '', time: '' });
  };

  const deleteTimetableEntry = (id: string) => {
    saveTimetable(timetable.filter(e => e.id !== id));
  };

  const addLink = () => {
    if (!newLink.title || !newLink.url) return;
    const link: ImportantLink = { ...newLink, id: Date.now().toString() };
    saveLinks([...links, link]);
    setNewLink({ title: '', url: '', category: 'General' });
  };

  const deleteLink = (id: string) => {
    saveLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Academic Assistant</h1>
        <p className="text-text-dim mt-2 text-lg">Manage your schedule and essential resources.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Timetable Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-accent" /> Timetable Manager
            </h2>
          </div>

          <div className="glass rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={newEntry.day}
                onChange={e => setNewEntry({...newEntry, day: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d} value={d} className="bg-[#090812]">{d}</option>
                ))}
              </select>
              <input 
                placeholder="Subject (e.g., CS302)"
                value={newEntry.subject}
                onChange={e => setNewEntry({...newEntry, subject: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              />
              <input 
                placeholder="Time (e.g., 9:00 AM)"
                value={newEntry.time}
                onChange={e => setNewEntry({...newEntry, time: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              />
              <input 
                placeholder="Location (e.g., LH-201)"
                value={newEntry.location}
                onChange={e => setNewEntry({...newEntry, location: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              />
            </div>
            <button 
              onClick={addTimetableEntry}
              className="w-full py-3 bg-accent text-bg font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> Add Class
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
              const dayClasses = timetable.filter(e => e.day === day);
              if (dayClasses.length === 0) return null;
              return (
                <div key={day} className="space-y-2">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-widest mt-4 ml-2">{day}</h3>
                  {dayClasses.map(entry => (
                    <div key={entry.id} className="glass rounded-2xl p-4 flex items-center justify-between group">
                      <div>
                        <div className="font-bold">{entry.subject}</div>
                        <div className="text-xs text-text-dim">{entry.time} • {entry.location}</div>
                      </div>
                      <button 
                        onClick={() => deleteTimetableEntry(entry.id)}
                        className="p-2 text-text-dim hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* Link Bucket Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <LinkIcon className="w-6 h-6 text-accent" /> Link Bucket
          </h2>

          <div className="glass rounded-3xl p-6 space-y-4">
            <div className="space-y-4">
              <input 
                placeholder="Link Title"
                value={newLink.title}
                onChange={e => setNewLink({...newLink, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              />
              <input 
                placeholder="URL (e.g., https://...)"
                value={newLink.url}
                onChange={e => setNewLink({...newLink, url: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              />
              <select 
                value={newLink.category}
                onChange={e => setNewLink({...newLink, category: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
              >
                <option value="General" className="bg-[#090812]">General</option>
                <option value="Research" className="bg-[#090812]">Research</option>
                <option value="Admin" className="bg-[#090812]">Admin</option>
                <option value="Resources" className="bg-[#090812]">Resources</option>
              </select>
            </div>
            <button 
              onClick={addLink}
              className="w-full py-3 bg-white/10 border border-white/10 font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Save Link
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
            {links.map(link => (
              <div key={link.id} className="glass rounded-2xl p-4 flex flex-col justify-between group border-accent/10 hover:border-accent/30 transition-all">
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{link.category}</span>
                  <h4 className="font-bold mt-1 line-clamp-1">{link.title}</h4>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-accent/10 rounded-lg text-accent hover:bg-accent/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => deleteLink(link.id)}
                    className="p-2 text-text-dim hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
