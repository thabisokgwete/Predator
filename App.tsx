import React, { useState } from 'react';
import Header from './components/Header';
import PricingCard from './components/PricingCard';
import PaymentModal from './components/PaymentModal';
import PredatorLogo from './components/PredatorLogo';
import { FRAMEWORKS } from './constants';
import { FrameworkType, FrameworkModel, PricingPlan } from './types';
import { ChevronRight, Users, Landmark, Zap, ShieldCheck, ArrowRight, Mail, MapPin, Phone, Send, Check } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [activeFramework, setActiveFramework] = useState<FrameworkModel>(FRAMEWORKS[0]);
  
  // Payment Modal State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'models':
        return (
          <section className="py-24 bg-zinc-950 animate-in fade-in duration-500 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 pt-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Select the relevant model</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Choose the architectural framework designed for your specific competitive landscape.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {FRAMEWORKS.map((fw) => (
                  <div key={fw.type} className="group relative bg-zinc-900/40 border border-white/10 rounded-3xl p-8 md:p-12 hover:border-red-700/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20 flex flex-col backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-8 inline-flex p-4 rounded-2xl bg-red-800 border border-red-900 text-white shadow-xl w-fit">
                        {fw.type === FrameworkType.ORGANIZATIONAL ? <Users className="w-8 h-8" /> : <Landmark className="w-8 h-8" />}
                      </div>
                      
                      <div className="space-y-4 mb-8 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className="h-px w-8 bg-red-800"></span>
                          <span className="text-red-800 font-bold tracking-[0.2em] text-xs uppercase">{fw.subtitle}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                          {fw.title}
                        </h3>
                      </div>

                      <div className="mt-auto pt-8 border-t border-white/5">
                         <button 
                          onClick={() => {
                            setActiveFramework(fw);
                            setCurrentView('model-details');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group/btn w-full py-4 px-6 rounded-xl bg-white text-zinc-950 font-bold hover:bg-red-800 hover:text-white transition-all duration-300 flex items-center justify-between"
                        >
                          <span>Model Overview</span>
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'model-details':
        return (
          <section className="py-24 bg-zinc-950 animate-in fade-in duration-500 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
              <div className="pt-12 mb-8">
                  <button 
                      onClick={() => setCurrentView('models')}
                      className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors text-sm font-medium"
                  >
                      <ArrowRight className="w-4 h-4 rotate-180" /> Back to Framework Selection
                  </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-red-800 text-xs font-bold tracking-widest uppercase mb-6">
                        {activeFramework.subtitle}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                          {activeFramework.title}
                      </h2>
                      <div className="prose prose-invert prose-lg text-zinc-400 mb-8">
                          <p className="leading-relaxed">{activeFramework.details.longDescription}</p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-6">Key Strategic Outcomes</h3>
                      <ul className="space-y-4 mb-10">
                          {activeFramework.details.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center gap-3 text-zinc-300">
                                   <div className="w-6 h-6 rounded-full bg-red-800 text-white flex items-center justify-center flex-shrink-0">
                                      <Check className="w-3.5 h-3.5" />
                                   </div>
                                   {benefit}
                              </li>
                          ))}
                      </ul>

                      <button 
                        onClick={() => {
                          setCurrentView('pricing');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 flex items-center gap-2"
                      >
                        View Subscription Plans <ChevronRight className="w-5 h-5" />
                      </button>
                  </div>

                  <div className="space-y-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-6">Core Modules</h3>
                      {activeFramework.details.modules.map((module, i) => (
                          <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-red-700/30 transition-all group">
                              <div className="flex items-start justify-between mb-4">
                                  <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">{module.title}</h4>
                                  <span className="text-zinc-600 font-display font-bold text-2xl opacity-50">0{i+1}</span>
                              </div>
                              <p className="text-zinc-400 leading-relaxed">{module.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section className="py-24 bg-zinc-950 animate-in fade-in duration-500 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16 pt-12">
                <button 
                  onClick={() => setCurrentView('model-details')}
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors mb-8 text-sm font-medium"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to Model Overview
                </button>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Subscription Plans</h2>
                
                {/* Toggle for quick switching within pricing view */}
                <div className="inline-flex p-1 bg-zinc-900 rounded-2xl border border-white/10 mb-12 flex-wrap justify-center">
                  {FRAMEWORKS.map((fw) => (
                    <button
                      key={fw.type}
                      onClick={() => setActiveFramework(fw)}
                      className={`px-4 md:px-8 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                        activeFramework.type === fw.type 
                          ? 'bg-red-800 text-white shadow-lg shadow-red-900/30' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {fw.type === FrameworkType.ORGANIZATIONAL ? <Users className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
                      {fw.type === FrameworkType.ORGANIZATIONAL ? 'Businesses' : 'Private Equity Firms'}
                    </button>
                  ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-4 mb-16">
                  <h3 className="text-2xl md:text-3xl font-bold text-red-800 flex items-center justify-center gap-3">
                    <PredatorLogo className="text-2xl md:text-3xl" /> MODEL
                  </h3>
                  <h4 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">{activeFramework.title}</h4>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{activeFramework.description}</p>
                </div>

                <div className={`grid grid-cols-1 gap-8 mx-auto text-left ${
                  activeFramework.plans.length === 3 
                    ? 'lg:grid-cols-3 max-w-7xl' 
                    : 'md:grid-cols-2 max-w-5xl'
                }`}>
                  {activeFramework.plans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section className="py-24 bg-zinc-950 min-h-screen pt-32 animate-in fade-in duration-500 px-4">
             <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" className="rounded-3xl border border-white/10 grayscale shadow-2xl" alt="Methodology" />
                </div>
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white flex items-center gap-3">About <PredatorLogo className="text-3xl md:text-5xl" /></h2>
                  <h3 className="text-xl text-red-500 font-medium">The Science of Winning</h3>
                  <p className="text-zinc-400 leading-relaxed">Our approach is built on the rigorous application of mathematical game theory to real-world business environments. We don't guess; we calculate the most dominant path to success. <span className="inline-flex items-baseline"><PredatorLogo className="text-base text-white" /></span> was founded on the belief that in zero-sum environments, there is always an optimal strategy.</p>
                  <div className="space-y-6">
                    {['Zero-Sum Optimization', 'Information Asymmetry Utilization', 'Nash Equilibrium Targeting'].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-white font-bold p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-red-800 text-white flex items-center justify-center text-xs">0{i+1}</div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className="py-24 bg-zinc-950 min-h-screen pt-32 animate-in fade-in duration-500 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 flex items-center justify-center gap-3">Contact <PredatorLogo className="text-3xl md:text-5xl" /></h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Secure a line of communication with our strategic implementation team.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-zinc-900/50 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message transmission simulated.'); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-300">First Name</label>
                        <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-700 transition-colors" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-300">Last Name</label>
                        <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-700 transition-colors" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-300">Corporate Email</label>
                      <input type="email" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-700 transition-colors" placeholder="john@enterprise.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-300">Inquiry Type</label>
                      <select className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-700 transition-colors">
                        <option>Strategic Partnership</option>
                        <option>Model Implementation</option>
                        <option>Media Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-300">Message</label>
                      <textarea className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-red-700 transition-colors resize-none" placeholder="Briefly describe your strategic needs..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Transmit Securely
                    </button>
                  </form>
                </div>

                <div className="space-y-8 flex flex-col justify-center">
                  <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">Global Headquarters</h3>
                    <div className="flex items-start gap-4 text-zinc-400">
                      <MapPin className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-white flex items-center gap-2"><PredatorLogo className="text-sm" /> Strategic Group</p>
                        <p>1000 Financial District Blvd, Suite 4500</p>
                        <p>New York, NY 10005</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-400">
                      <Mail className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <p>secure.comms@predator-strategy.com</p>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-400">
                      <Phone className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <p>+1 (212) 555-0199</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-red-900 border border-red-800">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      Encrypted Channels
                    </h4>
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      All communications through this portal are end-to-end encrypted. We maintain strict client confidentiality protocols aligned with international financial regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'home':
      default:
        return (
          <>
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-red-800/10 blur-[120px] rounded-full -z-10" />
              <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 leading-[1.1]">
                  Winning, Dominating, and Leading <br />
                  in <span className="text-red-700 italic">Competitive Markets</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                  Business and Finance are highly contested fields. Those who find creative and unique ways of gaining a competitive advantage over their competitors will win. There are no rewards for merely participating. Winners dominate and lead the market, while losers are forced to shut down. Be the winner in your field. Integrate our models in your organization now.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
                  <button onClick={() => setCurrentView('models')} className="bg-white text-zinc-950 px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                    Explore Models <ChevronRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setCurrentView('pricing')} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                    View Pricing
                  </button>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setCurrentView('home')}>
               <PredatorLogo className="text-3xl text-white" />
            </div>
            {/* Description text removed */}
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Frameworks</h5>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => setCurrentView('models')} className="hover:text-red-500 transition-colors">Businesses</button></li>
              <li><button onClick={() => setCurrentView('models')} className="hover:text-red-500 transition-colors">Private Equity Firms</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Global Ops</h5>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-red-500 transition-colors">Contact Support</button></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-white/5 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-zinc-600 flex items-center gap-1">© {new Date().getFullYear()} <span className="inline-flex items-baseline"><PredatorLogo className="text-[10px] md:text-xs text-zinc-500" /></span> Strategic Frameworks Group. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        plan={selectedPlan} 
      />
    </div>
  );
};

export default App;