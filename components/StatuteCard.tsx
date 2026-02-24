
import React from 'react';
import { Statute } from '../types';

interface Props {
  statute: Statute;
}

const StatuteCard: React.FC<Props> = ({ statute }) => {
  return (
    <div className="group relative p-8 bg-[#FDFDFF] border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 overflow-hidden">
      {/* Decorative vertical stamp line */}
      <div className="absolute top-0 left-0 w-2.5 h-full bg-[#1A2B4B] opacity-[0.03] rounded-l-2xl group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-6 pl-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">
              {statute.actName}
            </span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-md">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Verified</span>
            </div>
          </div>
          <h4 className="legal-heading text-3xl font-black text-[#1A2B4B] leading-none tracking-tight uppercase mb-1">
            {statute.section}
          </h4>
          <p className="text-slate-400 text-sm font-extrabold tracking-wide uppercase italic">{statute.title}</p>
        </div>
        <button className="text-slate-200 hover:text-amber-500 transition-all bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:shadow-lg">
          <i className="far fa-bookmark text-lg"></i>
        </button>
      </div>
      
      <div className="relative pl-4">
        <div className="bg-slate-50/70 p-7 rounded-[1.8rem] border border-slate-100/50 relative group-hover:bg-white transition-all shadow-inner">
          <i className="fas fa-quote-left text-[#1A2B4B]/5 absolute top-5 left-5 text-5xl"></i>
          <p className="text-[15px] text-slate-700 leading-relaxed font-medium relative z-10 italic">
            {statute.description}
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-between pl-4">
        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-blue-50/50 rounded-xl border border-blue-100/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A2B4B]">
              {statute.category}
            </span>
          </div>
        </div>
        <button className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#1A2B4B] flex items-center gap-3 transition-all group/btn">
          Legal Commentary 
          <i className="fas fa-arrow-right-long text-amber-600 group-hover/btn:translate-x-3 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};

export default StatuteCard;
