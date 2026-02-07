import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { PricingPlan, SubscriptionTier } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const isBasic = plan.tier === SubscriptionTier.BASIC;
  const isExclusive = plan.tier === SubscriptionTier.EXCLUSIVE;
  const isAssociate = plan.tier === SubscriptionTier.ASSOCIATE;
  const isPremium = isExclusive || isAssociate;

  return (
    <div className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
      isPremium 
        ? 'bg-zinc-900 border-2 border-red-800 shadow-2xl shadow-red-900/10 z-10' 
        : 'bg-zinc-900/50 border border-white/10 hover:border-white/20'
    } ${isExclusive ? 'md:scale-105' : ''}`}>
      
      {isBasic && (
         <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
           Non-Exclusive
         </div>
      )}

      {isExclusive && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-800 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
          Industry Exclusive
        </div>
      )}
      
      {isAssociate && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-zinc-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" /> All-Exclusive
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-2 ${isPremium ? 'text-red-500' : 'text-zinc-300'}`}>
          {plan.name}
        </h3>

        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white tracking-tight leading-tight">{plan.price}</span>
          <span className="text-zinc-500 text-sm mt-1">/per month</span>
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-zinc-400 items-start">
            <div className={`mt-0.5 rounded-full p-0.5 ${isPremium ? 'bg-red-800 text-white' : 'bg-zinc-700 text-zinc-400'}`}>
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
          isPremium
            ? 'bg-red-800 hover:bg-red-700 text-white shadow-lg shadow-red-900/30'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
      >
        {plan.cta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PricingCard;