import React, { useMemo } from 'react';
import { useGameStore } from '../src/stores/useGameStore';
import { useTranslation } from '../hooks/useTranslation';
import { GameState } from '../types';

export const Guide = () => {
  const gameState = useGameStore(state => state.gameState);
  const { t } = useTranslation();

  const guideMessage = useMemo(() => {
    switch (gameState) {
      case GameState.LEVEL_SELECTION:
        return t('guide.levelSelection');
      case GameState.MISSION_BRIEFING:
        return t('guide.mission');
      case GameState.LEARNING:
        return t('guide.learning');
      case GameState.QUIZ:
        return t('guide.quiz');
      case GameState.SCORE_SCREEN:
        return t('guide.score');
      default:
        return null;
    }
  }, [gameState, t]);

  if (!guideMessage) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      maxWidth: '250px',
    }}>
      {/* Speech Bubble */}
      <div style={{
        backgroundColor: '#1e293b', // slate-800
        color: '#cbd5e1', // slate-300
        padding: '12px 16px',
        borderRadius: '16px',
        border: '1px solid #334155', // slate-700
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontSize: '14px',
        lineHeight: '1.4',
        order: 1, // Comes before the character visually
      }}>
        {guideMessage}
      </div>

      {/* Character */}
      <div style={{
        fontSize: '48px',
        order: 2,
      }}>
        🤖
      </div>
    </div>
  );
};
