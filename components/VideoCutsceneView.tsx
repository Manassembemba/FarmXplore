import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface VideoCutsceneViewProps {
  videoUrl: string;
  onVideoEnd: () => void;
}

export const VideoCutsceneView: React.FC<VideoCutsceneViewProps> = ({ videoUrl, onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      onVideoEnd();
    };

    video.addEventListener('ended', handleVideoEnd);

    // Fallback timer in case 'ended' event doesn't fire
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 8500); // 8.5 seconds

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      clearTimeout(timer);
    };
  }, [onVideoEnd]);

  return (
    <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
      {/* Left Column: Video Player (wider) */}
      <div className="md:col-span-2 h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Column: Text Panel */}
      <div className="text-center md:text-left flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-2 text-slate-100">{t('learning.loadingTitle')}</h2>
        <p className="text-slate-400 font-light">{t('learning.loadingSubtitle')}</p>
      </div>
    </div>
  );
};