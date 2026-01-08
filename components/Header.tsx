
import React from 'react';
import { Sparkles } from 'lucide-react';
import { MonthInfo } from '../types';

interface HeaderProps {
  currentMonth: MonthInfo;
}

const Header: React.FC<HeaderProps> = ({ currentMonth }) => {
  // We've moved much of the header logic into App.tsx for better integration,
  // but we can keep this for specific sub-components if needed or keep it simple.
  return null; // The App.tsx now handles the unified header layout.
};

export default Header;
