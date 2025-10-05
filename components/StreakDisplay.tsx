import React from 'react';
import { useGameStore } from '../src/stores/useGameStore';

export const StreakDisplay = () => {
  const streak = useGameStore(state => state.streak);

  // Don't show the component if the streak is 0
  if (streak === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '80px', // Positioned to the left of the language selector
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '4px 12px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 193, 7, 0.3)', // Amber/gold border
      backdropFilter: 'blur(5px)',
      color: 'white',
    }}>
      <span style={{ fontSize: '22px', filter: 'grayscale(30%) brightness(1.5)' }} role="img" aria-label="Streak flame">🔥</span>
      <span style={{
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#fcd34d', // amber-300
        textShadow: '0 0 5px rgba(252, 211, 77, 0.5)',
      }}>
        {streak}
      </span>
    </div>
  );
};
