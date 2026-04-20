import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Navigation, Star, MessageCircle, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { Review } from '../types';

export default function Navigator() {
  const [search, setSearch] = useState('');
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', placeName: 'Main Canteen', rating: 5, comment: 'Biryani tastes better here! Must try on Fridays.', author: 'Rahul', isAnonymous: false, timestamp: new Date() },
    { id: '2', placeName: 'LH-1 Cafeteria', rating: 2, comment: 'Naan is bad at this place. Avoid.', author: 'Anonymous', isAnonymous: true, timestamp: new Date() },
    { id: '3', placeName: 'Central Library', rating: 5, comment: 'Best place to study. Quiet and air-conditioned.', author: 'Sneha', isAnonymous: false, timestamp: new Date() },
    { id: '4', placeName: 'Lake View Park', rating: 5, comment: 'Perfect spot to hang out after evening classes.', author: 'Karan', isAnonymous: false, timestamp: new Date() },
  ]);

  const [newReview, setNewReview] = useState({ placeName: '', comment: '', rating: 5, isAnonymous: false });

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.placeName || !newReview.comment) return;
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      author: newReview.isAnonymous ? 'Anonymous' : 'Michael',
      timestamp: new Date()
    };
    setReviews([review, ...reviews]);
    setNewReview({ placeName: '', comment: '', rating: 5, isAnonymous: false });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 h-screen flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Campus Navigator</h1>
          <p className="text-text-dim mt-2">Find places, read student reviews, and navigate the campus.</p>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
          <input 
            placeholder="Search for LH, Hostels, Canteens..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-accent transition-all text-sm backdrop-blur-md"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-2 space-y-6 flex flex-col min-h-0">
          <div className="glass rounded-[2rem] overflow-hidden flex-1 relative min-h-[400px]">
            {/* Google Maps Placeholder - In a real app we'd use @react-google-maps/api */}
            <iframe 
              src={`https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=university+buildings+near+campus`}
              className="w-full h-full border-0 grayscale invert brightness-75 opacity-70"
              allowFullScreen
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none border-4 border-white/5 rounded-[2rem]" />
            <div className="absolute top-6 left-6 p-4 glass rounded-2xl">
               <div className="flex items-center gap-2 text-accent font-bold">
                  <Navigation className="w-4 h-4" /> Live Navigation
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
            {['Canteens', 'Study Areas', 'Parks', 'Hostels'].map(cat => (
              <button key={cat} className="glass py-3 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-bg transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-6 flex flex-col min-h-0">
          <div className="glass rounded-3xl p-6 flex flex-col flex-1 min-h-0">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 shrink-0">
               <Star className="w-5 h-5 text-warning" /> Student Reviews
            </h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide mb-6">
              {reviews.filter(r => r.placeName?.toLowerCase().includes(search.toLowerCase())).map(r => (
                <div key={r.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-accent uppercase tracking-tighter">{r.placeName}</span>
                    <div className="flex text-warning">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-sm italic text-text-dim leading-relaxed">"{r.comment}"</p>
                  <div className="text-[10px] text-right font-medium">
                    — {r.isAnonymous ? 'Anonymous' : r.author}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={addReview} className="space-y-4 shrink-0 pt-4 border-t border-white/5">
              <input 
                placeholder="Place Name"
                value={newReview.placeName}
                onChange={e => setNewReview({...newReview, placeName: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-accent"
              />
              <textarea 
                placeholder="How was the food/vibe?"
                value={newReview.comment}
                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-accent h-20 resize-none"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={newReview.isAnonymous}
                    onChange={e => setNewReview({...newReview, isAnonymous: e.target.checked})}
                    className="accent-accent"
                  />
                  Post Anonymously
                </label>
                <button type="submit" className="p-2 bg-accent text-bg rounded-lg hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
