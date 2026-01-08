
import React from 'react';
import { CompletionState, Theme } from '../types';

interface StatsProps {
  completion: CompletionState;
  monthIndex: number;
  totalMonthDays: number;
  lang: 'zh' | 'en';
  activeTheme: Theme;
}

const Stats: React.FC<StatsProps> = ({ completion, monthIndex, totalMonthDays, lang, activeTheme }) => {
  const allEntries = Object.entries(completion) as [string, CompletionState[string]][];
  
  const monthlyCompleted = allEntries.filter(([key, val]) => 
    key.startsWith(`${monthIndex}-`) && val.completed
  ).length;
  
  const monthProgress = Math.round((monthlyCompleted / totalMonthDays) * 100);

  return (
    <div className="flex flex-col items-center mb-6 space-y-3">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <p className="text-[7px] font-black text-stone-400/80 uppercase tracking-widest mb-1">
            {lang === 'zh' ? '已点亮瞬间' : 'Moments Lit'}
          </p>
          <p className="text-lg font-black text-stone-800 tracking-tighter leading-none">{monthlyCompleted}</p>
        </div>
        <div className="w-px h-5 bg-stone-200" />
        <div className="text-center">
          <p className="text-[7px] font-black text-stone-400/80 uppercase tracking-widest mb-1">
            {lang === 'zh' ? '本月进度' : 'Progress'}
          </p>
          <p className="text-lg font-black text-stone-800 tracking-tighter leading-none">{monthProgress}%</p>
        </div>
      </div>
      
      <div className="w-32 h-[1.5px] bg-white/30 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-full ${activeTheme.accentBg}`} 
          style={{ width: `${monthProgress}%` }} 
        />
      </div>
    </div>
  );
};

export default Stats;
