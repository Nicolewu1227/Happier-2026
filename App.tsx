
import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, LayoutGrid, List, Languages, Palette } from 'lucide-react';
import { MONTHS_2026, THEMES, getTasksForMonth } from './constants';
import { CompletionState, HappinessTask, ThemeId } from './types';
import TaskModal from './components/TaskModal';
import Stats from './components/Stats';

const App: React.FC = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [completion, setCompletion] = useState<CompletionState>({});
  const [selectedTask, setSelectedTask] = useState<HappinessTask | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [themeId, setThemeId] = useState<ThemeId>('peach');
  const [showThemes, setShowThemes] = useState(false);
  
  const currentMonth = MONTHS_2026[currentMonthIdx];
  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const currentTasks = getTasksForMonth(currentMonthIdx);
  const emptySlots = Array(currentMonth.startOffset).fill(null);

  useEffect(() => {
    const saved = localStorage.getItem('happier_2026_full_progress');
    if (saved) setCompletion(JSON.parse(saved));
    const savedLang = localStorage.getItem('happier_lang');
    if (savedLang) setLang(savedLang as 'zh' | 'en');
    const savedTheme = localStorage.getItem('happier_theme');
    if (savedTheme) setThemeId(savedTheme as ThemeId);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    localStorage.setItem('happier_lang', newLang);
  };

  const changeTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('happier_theme', id);
    setShowThemes(false);
  };

  const handleToggleComplete = (day: number, note?: string) => {
    const id = `${currentMonthIdx}-${day}`;
    const newState = {
      ...completion,
      [id]: {
        completed: !completion[id]?.completed,
        note: note,
        timestamp: new Date().toISOString()
      }
    };
    setCompletion(newState);
    localStorage.setItem('happier_2026_full_progress', JSON.stringify(newState));
    if ('vibrate' in navigator) navigator.vibrate(30);
  };

  const weekdays = lang === 'zh' ? ['一', '二', '三', '四', '五', '六', '日'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out bg-gradient-to-br ${activeTheme.gradient} px-4 pt-4 pb-28 md:px-8`}>
      <div className="max-w-4xl mx-auto relative">
        
        {/* Compressed Header */}
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-2xl bg-white/40 border border-white/60 shadow-sm transition-transform duration-500`}>
                <span className={`text-xl font-black leading-none ${activeTheme.accentText}`}>{(currentMonthIdx + 1).toString().padStart(2, '0')}</span>
                <span className="text-[7px] font-black text-stone-400 uppercase tracking-tighter">{currentMonth.nameEn.slice(0, 3)}</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-stone-800 tracking-tight leading-none mb-0.5">
                  {lang === 'zh' ? currentMonth.name : currentMonth.nameEn}
                </h1>
                <p className="text-stone-400 text-[8px] font-bold tracking-[0.2em] uppercase">Happier 2026</p>
              </div>
           </div>

           <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowThemes(!showThemes)}
                className="p-2.5 bg-white/40 backdrop-blur-lg border border-white/60 rounded-full text-stone-400 hover:text-stone-800 transition-all active:scale-90"
              >
                <Palette size={16} />
              </button>
              <button 
                onClick={toggleLang}
                className="p-2.5 bg-white/40 backdrop-blur-lg border border-white/60 rounded-full text-stone-400 hover:text-stone-800 transition-all active:scale-90"
              >
                <Languages size={16} />
              </button>
           </div>
        </div>

        {/* Theme Picker Popover */}
        {showThemes && (
          <div className="absolute top-16 right-0 z-50 p-2 bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] shadow-2xl flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-8 h-8 rounded-full border-2 transition-transform active:scale-75 ${t.accentBg} ${themeId === t.id ? 'border-stone-800 scale-110 shadow-lg' : 'border-white'}`}
                title={lang === 'zh' ? t.name : t.nameEn}
              />
            ))}
          </div>
        )}

        <div className="mb-6 text-center h-4">
           <p key={currentMonthIdx} className="text-stone-500/70 text-[11px] font-medium italic tracking-wide animate-in fade-in slide-in-from-bottom-1 duration-700">
             “ {lang === 'zh' ? currentMonth.motto : currentMonth.mottoEn} ”
           </p>
        </div>

        <Stats 
            completion={completion} 
            monthIndex={currentMonthIdx} 
            totalMonthDays={currentMonth.days}
            lang={lang}
            activeTheme={activeTheme}
        />

        {viewMode === 'grid' ? (
          <div key={`grid-${currentMonthIdx}`} className="animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {weekdays.map((day, idx) => (
                <div key={`weekday-${idx}`} className="text-center text-[9px] font-black text-stone-400/40 uppercase tracking-widest pb-1">
                  {day}
                </div>
              ))}

              {emptySlots.map((_, idx) => (
                <div key={`empty-${currentMonthIdx}-${idx}`} className="aspect-[3/4] rounded-xl bg-white/5 border border-dashed border-white/10" />
              ))}

              {currentTasks.map((item) => {
                const isCompleted = completion[item.id]?.completed;
                return (
                  <button
                    key={`task-${item.id}`}
                    onClick={() => setSelectedTask(item)}
                    className={`group relative aspect-[3/4] p-1.5 md:p-2.5 rounded-xl border transition-all duration-500 text-left flex flex-col active:scale-90 overflow-hidden ${
                      isCompleted 
                        ? 'bg-white border-transparent shadow-xl shadow-stone-200/50' 
                        : 'bg-white/40 border-white/20 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                       <span className={`text-[9px] md:text-base font-black leading-none ${isCompleted ? activeTheme.accentText : 'text-stone-300'}`}>
                          {item.day}
                       </span>
                       {isCompleted && <Heart size={7} className={`${activeTheme.accentText} fill-current`} />}
                    </div>
                    <p className={`text-[7px] md:text-[9px] leading-[1.2] font-bold line-clamp-3 md:line-clamp-2 ${isCompleted ? 'text-stone-300' : 'text-stone-500/70'}`}>
                      {lang === 'zh' ? item.task : item.taskEn}
                    </p>
                    <div className={`mt-auto w-full h-[1.5px] rounded-full ${isCompleted ? activeTheme.accentBg : 'bg-transparent'} opacity-30`} />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div key={`list-${currentMonthIdx}`} className="space-y-2 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentTasks.map((item) => {
              const isCompleted = completion[item.id]?.completed;
              return (
                <button
                  key={`list-task-${item.id}`}
                  onClick={() => setSelectedTask(item)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 active:scale-[0.98] text-left ${
                    isCompleted ? 'bg-white/30 border-transparent' : 'bg-white border-white/40 shadow-sm'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${isCompleted ? 'bg-stone-50 text-stone-200' : `${activeTheme.accentBg} text-white`}`}>
                    {item.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xs font-bold truncate ${isCompleted ? 'text-stone-300 line-through' : 'text-stone-700'}`}>
                      {lang === 'zh' ? item.task : item.taskEn}
                    </h3>
                  </div>
                  {isCompleted && <Heart size={12} className={`${activeTheme.accentText} fill-current flex-shrink-0`} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Dock Navigation */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40">
           <div className="bg-stone-900/95 backdrop-blur-2xl rounded-full p-1.5 shadow-2xl flex items-center justify-between border border-white/10">
              <button 
                onClick={() => setCurrentMonthIdx(prev => Math.max(0, prev - 1))}
                className="p-2 text-white/40 hover:text-white disabled:opacity-5 active:scale-75 transition-all"
                disabled={currentMonthIdx === 0}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1 text-center">
                 <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none block opacity-60 mb-0.5">
                   {lang === 'zh' ? (currentMonthIdx + 1) + '月' : currentMonth.nameEn}
                 </span>
                 <span className="text-[10px] font-black text-orange-400 uppercase tracking-tighter block leading-none">
                    2026
                 </span>
              </div>

              <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 mr-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-md' : 'text-white/30 hover:text-white'}`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white text-stone-900 shadow-md' : 'text-white/30 hover:text-white'}`}
                >
                  <List size={15} />
                </button>
              </div>

              <button 
                onClick={() => setCurrentMonthIdx(prev => Math.min(11, prev + 1))}
                className="p-2 text-white/40 hover:text-white disabled:opacity-5 active:scale-75 transition-all"
                disabled={currentMonthIdx === 11}
              >
                <ChevronRight size={20} />
              </button>
           </div>
        </div>

        {selectedTask && (
          <TaskModal 
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            completion={completion}
            onToggleComplete={handleToggleComplete}
            lang={lang}
            activeTheme={activeTheme}
          />
        )}
      </div>
    </div>
  );
};

export default App;
