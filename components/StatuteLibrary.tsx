
import React, { useState } from 'react';
import { MOCK_BARE_ACTS } from '../constants';
import StatuteCard from './StatuteCard';

const StatuteLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filtered = MOCK_BARE_ACTS.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.section.toLowerCase().includes(search.toLowerCase()) ||
    s.actName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#FDFDFF] overflow-hidden">
      <div className="px-12 py-10 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h2 className="legal-heading text-4xl font-black text-[#1A2B4B] tracking-tight">Statute Library</h2>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Comprehensive Bare Acts Repository</p>
        </div>
        <div className="relative w-96 group">
          <i className="fas fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1A2B4B] transition-colors"></i>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search statutes, sections, or keywords..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-[#1A2B4B]/30 transition-all shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(statute => (
              <StatuteCard key={statute.id} statute={statute} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-book-open text-slate-200 text-3xl"></i>
                </div>
                <h3 className="text-xl font-black text-[#1A2B4B] uppercase tracking-tight">No statutes found</h3>
                <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">Adjust your search parameters and try again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatuteLibrary;
