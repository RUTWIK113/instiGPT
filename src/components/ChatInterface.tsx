import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Trash2, 
  Sparkles, 
  User, 
  Bot,
  Loader2,
  ChevronDown,
  Info,
  MessageSquare,
  Zap
} from 'lucide-react';
import Markdown from 'react-markdown';
import { chat } from '../lib/gemini';
import { cn } from '../lib/utils';
import { useSearchParams } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Yo! I'm **instiGPT**, your smart campus sidekick. I know your timetable, mess menu, course insights, and all the best spots on campus. \n\nWhat's on your mind? Need help with a course, or just checking what's for dinner?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLowLatency, setIsLowLatency] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      sendMessage(initialQuery);
    }
  }, [initialQuery]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await chat(content, history, isLowLatency);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: response || "I'm having a bit of a brain freeze. Try asking again?",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-bg relative">
      <div className="flex-1 overflow-y-auto px-4 py-8 max-w-4xl mx-auto w-full space-y-6 scrollbar-hide">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={cn(
                "flex gap-4 w-full",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border",
                m.role === 'user' ? "bg-accent/10 border-accent/20" : "bg-card-bg border-border"
              )}>
                {m.role === 'user' ? <User className="w-4 h-4 text-accent" /> : <Sparkles className="w-4 h-4 text-accent" />}
              </div>
              <div className={cn(
                "max-w-[85%] px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-lg",
                m.role === 'user' 
                  ? "bg-accent text-white font-bold rounded-tr-none shadow-accent/10" 
                  : "bg-white/5 backdrop-blur-md text-text-main border border-white/10 rounded-tl-none"
              )}>
                <div className="markdown-body">
                  <Markdown>{m.content}</Markdown>
                </div>
                <div className={cn(
                  "text-[10px] mt-2 opacity-50 font-bold uppercase tracking-tighter",
                  m.role === 'user' ? "text-right" : "text-left"
                )}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-card-bg border border-border flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
            <div className="bg-border px-5 py-3 rounded-2xl border border-border shadow-sm flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-accent animate-spin" />
              <span className="text-xs text-text-dim font-bold uppercase tracking-widest">instiGPT is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-bg border-t border-border sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {[
                "What's for dinner?",
                "CS302 quiz help",
                "Next deadline?",
                "Central Library timings",
                "Campus route to LH-201"
              ].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="px-4 py-2 bg-white/5 hover:bg-accent/10 text-text-dim hover:text-accent text-[10px] font-bold uppercase tracking-widest rounded-xl border border-white/5 hover:border-accent/30 transition-all backdrop-blur-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsLowLatency(!isLowLatency)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                isLowLatency 
                  ? "bg-accent/10 border-accent/40 text-accent shadow-[0_0_15px_rgba(0,255,157,0.1)]" 
                  : "bg-white/5 border-white/10 text-text-dim hover:border-white/20"
              )}
            >
              <Zap className={cn("w-3 h-3", isLowLatency ? "fill-current" : "")} />
              {isLowLatency ? "Speed: High" : "Speed: Normal"}
            </button>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="relative"
          >
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-text-dim pointer-events-none">
              <MessageSquare className="w-4 h-4" />
            </div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask instiGPT anything about campus..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-16 text-sm focus:ring-4 focus:ring-accent/5 focus:border-accent/40 outline-none transition-all text-white placeholder:text-text-dim shadow-inner"
            />
            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-20">
              <span className="px-1.5 py-0.5 border border-white rounded text-[8px] font-bold">⌘</span>
              <span className="px-1.5 py-0.5 border border-white rounded text-[8px] font-bold">K</span>
            </div>
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-accent hover:bg-accent/90 disabled:bg-white/10 text-white rounded-xl transition-all shadow-lg shadow-accent/20 disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-6 text-[9px] text-text-dim font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-accent" /> {isLowLatency ? "Gemini 3.1 Flash Lite" : "Gemini 3 Flash"}</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-accent" /> {isLowLatency ? "Low Latency" : "Grounding Enabled"}</span>
            <span className="flex items-center gap-1.5"><Info className="w-3 h-3 text-accent" /> Secure Institute Layer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
