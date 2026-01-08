
import React, { useEffect, useState } from 'react';
import { X, Heart, Loader2, Sparkles, PencilLine, Calendar } from 'lucide-react';
import { HappinessTask, CompletionState, Theme } from '../types';
import { getMindfulnessAdvice } from '../services/gemini';
import { CATEGORY_COLORS, MONTHS_2026 } from '../constants';

interface TaskModalProps {
  task: HappinessTask | null;
  onClose: () => void;
  completion: CompletionState;
  onToggleComplete: (day: number, note?: string) => void;
  lang: 'zh' | 'en';
  activeTheme: Theme;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, completion, onToggleComplete, lang, activeTheme }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const isCompleted = task ? !!completion[task.id]?.completed : false;

  useEffect(() => {
    if (task) {
      setNote(completion[task.id]?.note || "");
      const fetchAdvice = async () => {
        setLoading(true);
        const res = await getMindfulnessAdvice(lang === 'zh' ? task.task : task.taskEn);
        setAdvice(res || null);
        setLoading(false);
      };
      fetchAdvice();
    }
  }, [task, lang]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-100/40 backdrop-blur-xl transition-opacity" onClick={onClose} />
      
      <div className="bg-white/90 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white relative overflow-hidden p-8 animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-50 text-stone-300 transition-colors">
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-stone-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">
             <Calendar size={10} />
             <span>{lang === 'zh' ? MONTHS_2026[task.month].name : MONTHS_2026[task.month].nameEn} · {task.day}</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 leading-tight mb-3">
            {lang === 'zh' ? task.task : task.taskEn}
          </h2>
          <div className={`inline-flex px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${CATEGORY_COLORS[task.category]}`}>
            {task.category}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 rounded-3xl p-5 border border-stone-50">
            <div className="flex items-center gap-2 text-stone-400 text-[8px] font-black uppercase tracking-widest mb-2">
              <Sparkles size={10} className={activeTheme.accentText} />
              <span>{lang === 'zh' ? '正念小贴士' : 'Mindfulness Tip'}</span>
            </div>
            {loading ? (
              <div className="flex items-center gap-2 text-stone-200 py-1">
                <Loader2 size={12} className="animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Thinking...</span>
              </div>
            ) : (
              <p className="text-stone-600 leading-relaxed text-xs italic">
                {advice}
              </p>
            )}
          </div>

          <div className="space-y-2">
             <div className="flex items-center gap-2 text-stone-400 text-[8px] font-black uppercase tracking-widest px-1">
                <PencilLine size={10} />
                <span>{lang === 'zh' ? '留白给感悟' : 'Your Reflection'}</span>
             </div>
             <textarea 
                className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl p-4 text-stone-700 text-xs focus:outline-none focus:ring-2 focus:ring-stone-100 transition-all resize-none min-h-[80px]"
                placeholder={lang === 'zh' ? '这一刻，你的内心在想什么？' : 'What is on your mind?'}
                value={note}
                onChange={(e) => setNote(e.target.value)}
             />
          </div>
        </div>

        <button 
          onClick={() => {
              onToggleComplete(task.day, note);
              onClose();
          }}
          className={`w-full mt-8 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm ${
              isCompleted 
              ? 'bg-stone-50 text-stone-400' 
              : `${activeTheme.accentBg} text-white hover:shadow-lg active:scale-95`
          }`}
        >
          {isCompleted ? <Heart size={16} className="fill-stone-300 text-stone-300" /> : <div className="w-4 h-4 border-2 border-white/20 rounded-full" />}
          {isCompleted ? (lang === 'zh' ? '已点亮' : 'Moment Lit') : (lang === 'zh' ? '标记为已完成' : 'Mark as Done')}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
