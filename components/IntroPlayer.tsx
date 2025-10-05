import React, { useState } from 'react';
import SpeakerIcon from './icons/SpeakerIcon';

interface IntroPlayerProps {
  onVideoEnd: () => void;
}

const IntroPlayer: React.FC<IntroPlayerProps> = ({ onVideoEnd }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
      <video
        src="/videos/load.mp4"
        autoPlay
        muted={isMuted}
        onEnded={onVideoEnd}
        className="w-full h-full object-cover"
      />
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <SpeakerIcon muted={isMuted} />
      </button>
    </div>
  );
};

export default IntroPlayer;