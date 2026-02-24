
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../services/firebase';

const Auth: React.FC<{ onDemoAccess: () => void }> = ({ onDemoAccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!auth || !auth.app) {
      setError("System gateway not initialized. Please use Guest Access.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      if (err.message?.includes('api-key-not-valid')) {
        setError("Firebase connection pending. Please enter as Guest for now.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] relative overflow-hidden">
      {/* Soft decorative light flares */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-50/50 blur-[150px] rounded-full"></div>

      <div className="max-w-md w-full z-10 px-6">
        <div className="text-center mb-12">
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center border border-slate-100 group">
              <i className="fas fa-balance-scale text-[#1A2B4B] text-4xl group-hover:scale-110 transition-transform"></i>
            </div>
            <div className="absolute -inset-4 border border-blue-200/50 rounded-[3.5rem] animate-[spin_10s_linear_infinite] pointer-events-none"></div>
          </div>
          <h1 className="legal-heading text-5xl font-black text-[#1A2B4B] mb-3 tracking-tight uppercase">LEGAL LENSE</h1>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">Jurisprudence Retrieval Portal</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-[11px] p-4 rounded-2xl text-center font-bold uppercase tracking-wider">
                <i className="fas fa-circle-info mr-2"></i>
                {error}
              </div>
            )}
            
            <div className="space-y-5">
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Identity</label>
                <div className="relative">
                  <i className="fas fa-at absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"></i>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all text-sm font-medium"
                    placeholder="advocate@legallense.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Access Key</label>
                <div className="relative">
                  <i className="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"></i>
                  <input 
                    type="password" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all text-sm font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A2B4B] hover:bg-[#2A3B5B] text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-shield-halved"></i>}
              {isLogin ? 'Establish Connection' : 'Register Counselor'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[9px] text-slate-300 font-black uppercase tracking-widest">Or Secure Entry</span></div>
            </div>

            <button 
              type="button"
              onClick={onDemoAccess}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-black py-5 rounded-2xl transition-all text-[11px] uppercase tracking-widest border border-slate-200"
            >
              Enter as Guest Associate
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 hover:text-[#1A2B4B] text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Request New Credentials" : "Back to Secure Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
