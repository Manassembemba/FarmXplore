import React from 'react';
import { useGameStore } from '../src/stores/useGameStore';

// SVG for the back arrow icon
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export const BackButton = () => {
  const restartGame = useGameStore((state) => state.restartGame);

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 100,
    cursor: 'pointer',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backdropFilter: 'blur(5px)',
  };

  const handleBackClick = () => {
    restartGame();
  };

  return (
    <button style={buttonStyle} onClick={handleBackClick} aria-label="Go back to level selection">
      <BackArrowIcon />
    </button>
  );
};
