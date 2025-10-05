import React from 'react';
import { useGameStore } from '../src/stores/useGameStore';

export const ProgressBar = () => {
  // Select primitive values individually to prevent unnecessary re-renders
  const currentStep = useGameStore((state) => state.currentStep);
  const totalSteps = useGameStore((state) => state.totalSteps);
  const gameState = useGameStore((state) => state.gameState);

  // Only show the progress bar when a level is active
  if (totalSteps === 0 || gameState === 'LEVEL_SELECTION' || gameState === 'SCORE_SCREEN') {
    return null;
  }

  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '12px auto 0 auto', // 12px top margin, centered horizontally
      height: '16px',
    }}>
      <div style={{
        width: '100%',
        backgroundColor: '#1e293b', // slate-800
        borderRadius: '10px',
        height: '100%',
        overflow: 'hidden',
        border: '2px solid #334155' // slate-700
      }}>
        <div style={{
          width: `${progressPercentage}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #38bdf8, #34d399)', // sky-400 to green-400
          transition: 'width 0.5s ease-in-out',
          borderRadius: '8px'
        }} />
      </div>
    </div>
  );
};
