import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getStrategyResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import PredatorLogo from './PredatorLogo';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the Predator Strategic Center. How can I apply game theory to your specific business environment today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await getStrategyResponse(newMessages);
    setMessages(prev => [...prev, { role: 'model', text: response || 'Strategic silence. Please try again.' }]);
    setLoading(false);
  };

  return (
    <div id="consultant" className="py-24 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Live Strategy Consultant</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto italic">
          Query our Gemini-powered engine for instant game theory applications to your organizational or transactional bottlenecks.
        </p>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] border border-white/5">
        <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold leading-none flex items-center gap-2">
              <PredatorLogo className="text-sm" /> Strategy Core
            </div>
            <div className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">Real-time Analysis Active</div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-red-800 text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-zinc-800 text-zinc-200 border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-800 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-zinc-800 p-4 rounded-2xl border border-white/5">
                  <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe a competitive scenario (e.g., 'How to handle a low-ball offer in a PE deal?')"
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-3 p-2 rounded-lg bg-red-800 hover:bg-red-700 text-white transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;