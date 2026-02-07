import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ExternalLink, Mail, User, Lock } from 'lucide-react';
import { PricingPlan } from '../types';
import PredatorLogo from './PredatorLogo';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

// =========================================================================
// PAYFAST CONFIGURATION
// =========================================================================
// Set this to true to accept real money.
// Set to false to test without charging your card (Sandbox Mode).
const IS_PRODUCTION = false; 

const MERCHANT_ID = IS_PRODUCTION 
  ? "YOUR_MERCHANT_ID"      // REPLACE THIS WITH YOUR LIVE ID
  : "10000100";             // PayFast Sandbox ID (Do not change for testing)

const MERCHANT_KEY = IS_PRODUCTION 
  ? "YOUR_MERCHANT_KEY"     // REPLACE THIS WITH YOUR LIVE KEY
  : "46f0cd694581a";        // PayFast Sandbox Key (Do not change for testing)

const PAYFAST_URL = IS_PRODUCTION
  ? "https://www.payfast.co.za/eng/process"
  : "https://sandbox.payfast.co.za/eng/process";
// =========================================================================

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (isOpen) {
      setLoading(false);
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleProceed = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all details to proceed.");
      return;
    }
    setLoading(true);
    // The form with ID 'payfast-form' will be submitted automatically via the button type="submit"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        {!loading && (
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-zinc-950 p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-500">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {IS_PRODUCTION ? 'Secure Checkout' : 'Test Mode Active'}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-50">
              <Lock className="w-3 h-3 text-zinc-400" />
              <span className="text-[10px] text-zinc-400">Powered by PayFast</span>
            </div>
          </div>

          {/* Plan Summary */}
          <div className="px-6 py-4 bg-white/5 border-b border-white/5">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-zinc-400 text-sm mb-1">Subscription</div>
                <div className="text-white font-bold text-lg">{plan.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">R {plan.priceValue.toLocaleString()}</div>
                <div className="text-zinc-500 text-xs">/month</div>
              </div>
            </div>
          </div>

          <div className="p-6">
             <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-4 mb-6">
                <p className="text-xs text-red-200 leading-relaxed flex gap-2 items-start">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    You will be redirected to the <strong>PayFast Secure Gateway</strong> to complete your payment. 
                    <span className="inline-flex items-baseline mx-1"><PredatorLogo className="text-xs text-red-200" /></span> Strategic Group does not store your banking details.
                  </span>
                </p>
             </div>

            {/* PAYFAST REAL INTEGRATION FORM */}
            <form id="payfast-form" action={PAYFAST_URL} method="POST">
                {/* Required PayFast Hidden Fields */}
                <input type="hidden" name="merchant_id" value={MERCHANT_ID} />
                <input type="hidden" name="merchant_key" value={MERCHANT_KEY} />
                <input type="hidden" name="amount" value={plan.priceValue.toFixed(2)} />
                <input type="hidden" name="item_name" value={`Predator Subscription - ${plan.name}`} />
                
                {/* Return URLs */}
                <input type="hidden" name="return_url" value={window.location.href} />
                <input type="hidden" name="cancel_url" value={window.location.href} />
                <input type="hidden" name="notify_url" value={window.location.href} />
                
                {/* User Details */}
                <div className="space-y-4 mb-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">First Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="name_first" 
                            placeholder="John"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition-all"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Last Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="name_last" 
                            placeholder="Doe"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition-all"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                     </div>
                   </div>

                   <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Email Address</label>
                       <div className="relative">
                        <input 
                          type="email" 
                          name="email_address"
                          placeholder="john@company.com"
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-zinc-600 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800 transition-all"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      </div>
                   </div>
                </div>

                <button 
                  type="submit"
                  onClick={handleProceed}
                  disabled={loading}
                  className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
                >
                  {loading ? 'Connecting to Gateway...' : 'Proceed to Payment'}
                  <ExternalLink className="w-4 h-4" />
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;