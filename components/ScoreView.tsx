
import React from 'react';
import { Level } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { BackButton } from './BackButton';
import { LeaderboardDisplay } from './LeaderboardDisplay';

interface ScoreViewProps {
  score: number;
  totalQuestions: number;
  level: Level;
  onRestart: () => void;
}

const ScoreView: React.FC<ScoreViewProps> = ({ score, totalQuestions, level, onRestart }) => {
  const { t } = useTranslation();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  let message = "";
  let messageColor = "";
  const passed = percentage >= 50;

  if (percentage >= 80) {
    message = t('score.messageExcellent');
    messageColor = "text-green-300";
  } else if (passed) {
    message = t('score.messageGood');
    messageColor = "text-yellow-300";
  } else {
    message = t('score.messageImprovement');
    messageColor = "text-red-400";
  }
  
  const RewardIcon = level.reward.icon;

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <BackButton />
      <h2 className="text-3xl font-bold mb-4 text-slate-100">{t('score.title')}</h2>
      <div className={`flex items-center gap-4 p-4 rounded-lg mb-6 ${level.bgColor} border border-slate-700`}>
          <level.icon className={`w-10 h-10 ${level.color}`}/>
          <h3 className={`text-xl font-semibold ${level.color}`}>{t(level.title)}</h3>
      </div>
      
      {passed && (
        <div className="mb-6 animate-fade-in border-2 border-dashed border-yellow-400/50 rounded-xl p-4">
            <p className="text-sm uppercase tracking-widest text-yellow-400 mb-2">{t('score.rewardUnlocked')}</p>
            <div className="flex items-center justify-center gap-3">
                <RewardIcon className="w-8 h-8 text-yellow-300"/>
                <p className="text-2xl font-bold text-yellow-300">{t(level.reward.badgeName)}</p>
            </div>
        </div>
      )}

      <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 w-full max-w-md mb-8">
        <p className="text-lg text-slate-300 mb-2 uppercase tracking-wider">{t('score.finalScore')}</p>
        <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-blue-400 mb-4">{score} / {totalQuestions}</p>
        <div className="w-full bg-slate-700 rounded-full h-4 mb-4 border border-slate-600">
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className={`text-lg font-semibold ${messageColor}`}>{message}</p>
      </div>

      <button
        onClick={onRestart}
        className="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-600 transition-colors duration-300 transform hover:scale-105 mb-6"
      >
        {t('score.returnButton')}
      </button>

      <LeaderboardDisplay levelId={level.id} />
    </div>
  );
};

export default ScoreView;
