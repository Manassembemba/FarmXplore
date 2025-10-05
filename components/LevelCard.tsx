
import React from 'react';
import { Level } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface LevelCardProps {
  level: Level;
  onSelect: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onSelect }) => {
  const { t } = useTranslation();
  const Icon = level.icon;

  return (
    <div
      onClick={onSelect}
      className={`group relative p-6 rounded-lg bg-slate-800/50 border border-slate-700/50 cursor-pointer transition-all duration-300 hover:border-slate-500 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-1 overflow-hidden`}
    >
        <div className={`absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${level.color.replace('text-', 'bg-')}`}></div>
        <div className="flex items-center mb-4">
            <div className={`p-2 rounded-md mr-4 ${level.bgColor} border border-slate-700`}>
                 <Icon className={`w-8 h-8 ${level.color}`} />
            </div>
            <h3 className={`text-xl font-bold ${level.color}`}>{t(level.title)}</h3>
        </div>
        <p className="text-slate-400 text-sm font-light">
            {t(level.description)}
        </p>
    </div>
  );
};

export default LevelCard;
