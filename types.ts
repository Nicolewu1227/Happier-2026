
export type ThemeId = 'peach' | 'forest' | 'ocean' | 'sakura' | 'stone';

export interface Theme {
  id: ThemeId;
  name: string;
  nameEn: string;
  gradient: string;
  accent: string;
  accentText: string;
  accentBg: string;
}

export interface HappinessTask {
  id: string; // "month-day"
  day: number;
  month: number;
  task: string;
  taskEn: string;
  category: 'Reflection' | 'Self-Care' | 'Kindness' | 'Connection' | 'Action';
  description?: string;
}

export interface CompletionState {
  [key: string]: { // key is "month-day"
    completed: boolean;
    note?: string;
    timestamp?: string;
  };
}

export interface MonthInfo {
  name: string;
  nameEn: string;
  days: number;
  startOffset: number; // 0=Mon, 6=Sun
  themeColor: string;
  motto: string;
  mottoEn: string;
}
