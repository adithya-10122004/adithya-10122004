
import React from 'react';
import { auth, signOut } from '../services/firebase';

interface Props {
  history: string[];
  onHistorySelect: (scenario: string) => void;
  currentView: 'assistant' | 'library';
  onViewChange: (view: 'assistant' | 'library') => void;
}

const Sidebar: React.FC<Props> = ({ history, onHistorySelect, currentView, onViewChange }) => {
  const handleSignOut = () => {
    if (auth && auth.app) {
      signOut(auth);
    } else {
      window.location.reload();
    }
  };

  return (
    <aside className="w-80 h-screen bg-white flex flex-col shrink-0 hidden lg:flex border-r border-slate-100 z-20">
      <div className="p-10 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 mb-16 cursor-default">
          <div className="w-14 h-14 bg-[#1A2B4B] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 relative group overflow-hidden">
            <i className="fas fa-balance-scale text-white text-2xl relative z-10 transition-transform group-hover:scale-110"></i>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000"></div>
          </div>
          <div>
            <h2 className="legal-heading text-2xl font-black text-[#1A2B4B] tracking-tight uppercase leading-none">LEGAL LENSE</h2>
            <span className="text-[9px] font-black text-amber-600/80 uppercase tracking-[0.4em] mt-1.5 block">Jurisprudence Terminal</span>
          </div>
        </div>

        <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] ml-4 mb-4">Operations</p>
            <nav className="space-y-1.5">
              <NavItem 
                icon="fa-feather" 
                label="RAG Assistant" 
                active={currentView === 'assistant'} 
                onClick={() => onViewChange('assistant')}
              />
              <NavItem 
                icon="fa-book-bookmark" 
                label="Statute Library" 
                active={currentView === 'library'} 
                onClick={() => onViewChange('library')}
              />
            </nav>
          </div>

          {history.length > 0 && currentView === 'assistant' && (
            <div className="pt-4">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] ml-4 mb-4">Recent Records</p>
              <div className="space-y-1">
                {history.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => onHistorySelect(item)}
                    className="w-full text-left px-5 py-3 rounded-xl hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <i className="fas fa-history text-[10px] text-slate-300 group-hover:text-[#1A2B4B]"></i>
                      <p className="text-[11px] font-bold text-slate-500 truncate group-hover:text-[#1A2B4B]">{item}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-10 space-y-6">
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B4B] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-100">
              {auth?.currentUser?.email?.[0].toUpperCase() || 'L'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-[#1A2B4B] truncate uppercase tracking-wider">{auth?.currentUser?.email?.split('@')[0] || 'Guest Partner'}</p>
              <p className="text-[9px] text-amber-600 font-black uppercase tracking-widest mt-0.5">Senior Counsel</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 px-4 py-5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-100 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest group"
        >
          <i className="fas fa-power-off group-hover:rotate-180 transition-transform"></i>
          Secure Sign Out
        </button>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-[0.2em] relative group ${
    active 
      ? 'bg-[#1A2B4B] text-white shadow-2xl shadow-blue-900/10' 
      : 'text-slate-400 hover:text-[#1A2B4B] hover:bg-slate-50'
  }`}>
    <i className={`fas ${icon} w-6 text-center transition-transform group-hover:scale-110 ${active ? 'text-amber-400' : 'text-slate-300 group-hover:text-[#1A2B4B]'}`}></i>
    {label}
    {active && <span className="absolute right-6 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse"></span>}
  </button>
);

export default Sidebar;
