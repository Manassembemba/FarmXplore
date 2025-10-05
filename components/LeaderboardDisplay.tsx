import React, { useMemo } from 'react';
import { useGameStore } from '../src/stores/useGameStore';
import { useTranslation } from '../hooks/useTranslation';

interface LeaderboardDisplayProps {
  levelId: string;
}

export const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({ levelId }) => {
  const { t } = useTranslation();
  
  // 1. Select the raw data from the store. This selector is stable.
  const highScores = useGameStore((state) => state.highScores);

  // 2. Compute the derived data. This will only re-run if highScores or levelId change.
  const scores = useMemo(() => 
    highScores
      .filter((s) => s.levelId === levelId)
      .sort((a, b) => b.score - a.score),
    [highScores, levelId]
  );

  return (
    <div className="w-full max-w-md mt-6 animate-fade-in">
      <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
        {t('leaderboard.title')}
      </h3>
      <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-4">
        {scores.length > 0 ? (
          <ol className="list-none p-0 m-0 space-y-2">
            {scores.map((entry, index) => (
              <li key={index} className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                <span className={`font-bold text-lg ${index === 0 ? 'text-yellow-300' : 'text-slate-300'}`}>
                  {index + 1}.
                </span>
                <span className="font-bold text-lg text-sky-400">
                  {entry.score} PTS
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-slate-500 p-4">
            {t('leaderboard.noScores')}
          </p>
        )}
      </div>
    </div>
  );
};
