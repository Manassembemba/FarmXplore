
import React from 'react';
import { LEVELS } from '../constants';
import LevelCard from './LevelCard';
import { useTranslation } from '../hooks/useTranslation';

interface LevelSelectionScreenProps {
  onSelectLevel: (levelId: string, totalSteps: number) => void;
}

const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({ onSelectLevel }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-slate-100 tracking-wide">{t('levelSelection.title')}</h2>
      <p className="text-slate-400 mb-8 max-w-2xl text-center font-light">
        {t('levelSelection.description')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {LEVELS.map(level => {
          const totalSteps = level.subMissions.length + 1; // +1 for the final quiz
          return (
            <LevelCard key={level.id} level={level} onSelect={() => onSelectLevel(level.id, totalSteps)} />
          )
        })}
      </div>
    </div>
  );
};

export default LevelSelectionScreen;
