import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, ShieldCheck, HelpCircle, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { Review } from '../types';

export default function SeniorInsights() {
  const [courseCode, setCourseCode] = useState('');
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', courseCode: 'CS302', rating: 4, comment: "Prof. Gupta's quizzes are 80% based on the first 10 slides. Don't waste time on the textbook yet.", author: 'Rahul K.', isAnonymous: false, timestamp: new Date() },
    { id: '2', courseCode: 'CS302', rating: 5, comment: "Grading is quite lenient if you attend your labs regularly. Final project is important.", author: 'Anonymous', isAnonymous: true, timestamp: new Date() },
    { id: '3', courseCode: 'MA101', rating: 2, comment: "Tutorials are extremely hard. Practice the previous year papers at least twice.", author: 'Sneha', isAnonymous: false, timestamp: new Date() },
  ]);

  const [processes] = useState([
    { id: 'p1', question: 'How to get medical reason makeup exam?', answer: 'Submit a formal medical certificate signed by the university medical officer within 48 hours of the missed exam to the academic office.' },
    { id: 'p2', question: 'Process for branch change?', answer: 'Branch change happens after the 1st year based on your CGPA. A minimum CGPA of 8.5 is generally required for CS/IT.' },
    { id: 'p3', question: 'Where to find forms for scholarship?', answer: 'All scholarship forms are available on the Dean of Student Affairs (DoSA) portal under the "Academic Resources" tab.' },
  ]);

  const filteredReviews = reviews.filter(r => r.courseCode?.toLowerCase().includes(courseCode.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Senior Insights</h1>
          <p className="text-text-dim mt-2 text-lg">Real experiences, grading patterns, and institute rules.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Course Reviews Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Star className="w-6 h-6 text-warning" /> Course Experiences
            </h2>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input 
                placeholder="Course Code (e.g., CS302)"
                value={courseCode}
                onChange={e => setCourseCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>

          {courseCode && (
            <div className="space-y-4">
              {filteredReviews.length > 0 ? filteredReviews.map(r => (
                <div key={r.id} className="glass rounded-[2rem] p-6 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BookOpen className="w-24 h-24 text-accent" />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-xs font-bold uppercase tracking-widest">{r.courseCode}</span>
                    <div className="flex text-warning">
                       {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-md font-medium text-text-main leading-relaxed relative z-10">"{r.comment}"</p>
                  <div className="flex items-center justify-between text-xs text-text-dim relative z-10">
                    <span>{r.timestamp.toLocaleDateString()}</span>
                    <span>— {r.isAnonymous ? 'Anonymous' : r.author}</span>
                  </div>
                </div>
              )) : (
                <div className="glass rounded-2xl p-8 text-center space-y-4">
                  <HelpCircle className="w-12 h-12 text-text-dim mx-auto" />
                  <p className="text-text-dim">No reviews yet for {courseCode.toUpperCase()}.</p>
                  <button className="px-6 py-2 bg-accent text-bg font-bold rounded-xl">Be the first to review</button>
                </div>
              )}
            </div>
          )}

          {!courseCode && (
            <div className="glass rounded-3xl p-12 text-center space-y-4 border-dashed border-white/10 border-2 bg-transparent">
              <BookOpen className="w-12 h-12 text-text-dim mx-auto opacity-40" />
              <p className="text-text-dim text-lg">Enter a course code to see reviews.</p>
            </div>
          )}
        </section>

        {/* Rules and Regulations Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
             <ShieldCheck className="w-6 h-6 text-accent" /> Processes & Rules
          </h2>
          <div className="space-y-4">
            {processes.map(item => (
              <div key={item.id} className="glass rounded-2xl p-5 space-y-3 border-accent/10 hover:border-accent/30 transition-all">
                <h3 className="font-bold text-text-main flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-1" />
                  {item.question}
                </h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.answer}</p>
              </div>
            ))}
            
            <div className="p-6 bg-accent-dim rounded-2xl border border-accent/20 space-y-4">
               <h3 className="font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" /> Need more help?
               </h3>
               <p className="text-xs text-text-dim">If you have specific queries about rules or need senior advice, ask our AI assistant.</p>
               <a href="/chat" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest group">
                  Ask Chatbot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
