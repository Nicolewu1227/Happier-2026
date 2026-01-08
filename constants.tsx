
import { HappinessTask, MonthInfo, Theme } from './types';

export const THEMES: Theme[] = [
  { id: 'peach', name: '暖阳', nameEn: 'Peach', gradient: 'from-orange-50/50 to-rose-50/50', accent: 'text-orange-400', accentText: 'text-orange-600', accentBg: 'bg-orange-400' },
  { id: 'forest', name: '浅草', nameEn: 'Forest', gradient: 'from-emerald-50/50 to-teal-50/50', accent: 'text-emerald-400', accentText: 'text-emerald-600', accentBg: 'bg-emerald-400' },
  { id: 'ocean', name: '极境', nameEn: 'Ocean', gradient: 'from-sky-50/50 to-indigo-50/50', accent: 'text-sky-400', accentText: 'text-sky-600', accentBg: 'bg-sky-400' },
  { id: 'sakura', name: '樱落', nameEn: 'Sakura', gradient: 'from-pink-50/50 to-rose-50/50', accent: 'text-pink-400', accentText: 'text-pink-600', accentBg: 'bg-pink-400' },
  { id: 'stone', name: '云阶', nameEn: 'Stone', gradient: 'from-stone-50/50 to-slate-50/50', accent: 'text-stone-400', accentText: 'text-stone-600', accentBg: 'bg-stone-500' },
];

export const MONTHS_2026: MonthInfo[] = [
  { name: '睦月', nameEn: 'JANUARY', days: 31, startOffset: 3, themeColor: '', motto: '在寒冬中寻找内心的宁静', mottoEn: 'Find peace in the winter' },
  { name: '如月', nameEn: 'FEBRUARY', days: 28, startOffset: 6, themeColor: '', motto: '播种爱与善意的种子', mottoEn: 'Sow seeds of love' },
  { name: '弥生', nameEn: 'MARCH', days: 31, startOffset: 6, themeColor: '', motto: '随万物一同温柔复苏', mottoEn: 'Gently recover with nature' },
  { name: '卯月', nameEn: 'APRIL', days: 30, startOffset: 2, themeColor: '', motto: '在春光里舒展身心', mottoEn: 'Stretch in the spring light' },
  { name: '皋月', nameEn: 'MAY', days: 31, startOffset: 4, themeColor: '', motto: '收集阳光与美好的瞬间', mottoEn: 'Collect sunshine and moments' },
  { name: '水无月', nameEn: 'JUNE', days: 30, startOffset: 0, themeColor: '', motto: '像夏蝉一样热烈生活', mottoEn: 'Live passionately like summer' },
  { name: '文月', nameEn: 'JULY', days: 31, startOffset: 2, themeColor: '', motto: '在午后寻找一份清凉', mottoEn: 'Find coolness in the afternoon' },
  { name: '叶月', nameEn: 'AUGUST', days: 31, startOffset: 5, themeColor: '', motto: '致敬盛夏的最后灿烂', mottoEn: 'Salute the summer splendor' },
  { name: '长月', nameEn: 'SEPTEMBER', days: 30, startOffset: 1, themeColor: '', motto: '在收获的季节感恩所得', mottoEn: 'Be grateful for harvest' },
  { name: '神无月', nameEn: 'OCTOBER', days: 31, startOffset: 3, themeColor: '', motto: '静赏秋叶落下的节奏', mottoEn: 'Watch the rhythm of autumn' },
  { name: '霜月', nameEn: 'NOVEMBER', days: 30, startOffset: 6, themeColor: '', motto: '在微凉中给予彼此温暖', mottoEn: 'Give warmth in the chill' },
  { name: '师走', nameEn: 'DECEMBER', days: 31, startOffset: 1, themeColor: '', motto: '复盘往昔，期许未来', mottoEn: 'Review past, expect future' },
];

const TASK_POOL = [
  { task: '列出三件期待的小事', taskEn: 'List 3 things to look forward to', category: 'Reflection' as const },
  { task: '写一封自我表扬信', taskEn: 'Write a praise letter to yourself', category: 'Self-Care' as const },
  { task: '为陌生人撑一次伞', taskEn: 'Hold an umbrella for a stranger', category: 'Kindness' as const },
  { task: '联系一位老朋友', taskEn: 'Contact an old friend', category: 'Connection' as const },
  { task: '尝试一种新水果', taskEn: 'Try a new kind of fruit', category: 'Action' as const },
  { task: '观察一朵花5分钟', taskEn: 'Observe a flower for 5 minutes', category: 'Reflection' as const },
  { task: '整理一个杂乱角落', taskEn: 'Tidy up a messy corner', category: 'Action' as const },
  { task: '对自己说“你很棒”', taskEn: 'Tell yourself "You are great"', category: 'Self-Care' as const },
  { task: '真诚赞美身边的人', taskEn: 'Sincerely praise someone', category: 'Kindness' as const },
  { task: '放下手机看书30分钟', taskEn: 'Read a book for 30m without phone', category: 'Self-Care' as const },
];

export const getTasksForMonth = (monthIndex: number): HappinessTask[] => {
  const month = MONTHS_2026[monthIndex];
  return Array.from({ length: month.days }, (_, i) => {
    const taskTemplate = TASK_POOL[(i + monthIndex * 5) % TASK_POOL.length];
    return {
      id: `${monthIndex}-${i + 1}`,
      day: i + 1,
      month: monthIndex,
      ...taskTemplate
    };
  });
};

export const CATEGORY_COLORS = {
  Reflection: 'bg-indigo-50/50 text-indigo-400 border-indigo-100/30',
  'Self-Care': 'bg-rose-50/50 text-rose-400 border-rose-100/30',
  Kindness: 'bg-amber-50/50 text-amber-400 border-amber-100/30',
  Connection: 'bg-emerald-50/50 text-emerald-400 border-emerald-100/30',
  Action: 'bg-sky-50/50 text-sky-400 border-sky-100/30',
};
