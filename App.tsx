
import React, { useState, useEffect, useMemo } from 'react';
import { GameState, Level, DroughtData, FloodData } from './types';
import { LEVELS } from './constants';
import { loadDroughtData, loadFloodData } from './services/nasaDataService';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import MissionView from './components/MissionView';
import QuizView from './components/QuizView';
import ScoreView from './components/ScoreView';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from './hooks/useTranslation';
import LearningView from './components/LearningView';
import { useGameStore } from './src/stores/useGameStore';
import { ProgressBar } from './components/ProgressBar';
import { StreakDisplay } from './components/StreakDisplay';
import { Guide } from './components/Guide';
import { DataQuizView } from './components/DataQuizView';
import { VideoCutsceneView } from './components/VideoCutsceneView';
import IntroPlayer from './components/IntroPlayer';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  // Most state is now managed by Zustand, we only keep component-specific state here.
  const {
    gameState,
    currentLevelId,
    currentMissionIndex,
    score,
    totalQuestions,
    advanceMission,
    finishQuiz,
    restartGame,
    startQuiz,
    selectLevel,
    checkStreak,
    startCutscene,
    startLearning,
  } = useGameStore();

  const [droughtData, setDroughtData] = useState<DroughtData | null>(null);
  const [floodData, setFloodData] = useState<FloodData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { t } = useTranslation();

  // On initial app load, check the user's streak.
  useEffect(() => {
    checkStreak();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Derive the current level object from the ID in the store
  const currentLevel = useMemo(() => 
    LEVELS.find(l => l.id === currentLevelId)
  , [currentLevelId]);

  const handleAdvance = () => {
    if (currentLevel && currentMissionIndex >= currentLevel.subMissions.length - 1) {
      // If there's a video, play it. Otherwise, go straight to learning.
      if (currentLevel.cutsceneVideo) {
        startCutscene();
      } else {
        startLearning();
      }
    } else {
      advanceMission(currentLevel!.subMissions.length);
    }
  };

  // Handle asynchronous data loading when the level changes
  useEffect(() => {
    if (currentLevelId === 'drought') {
      setIsLoadingData(true);
      setDroughtData(null);
      loadDroughtData().then(data => {
        setDroughtData(data);
        setIsLoadingData(false);
      }).catch(error => {
        console.error("Failed to load drought data:", error);
        setIsLoadingData(false);
      });
    } else if (currentLevelId === 'flood') {
      setIsLoadingData(true);
      setFloodData(null);
      loadFloodData().then(data => {
        setFloodData(data);
        setIsLoadingData(false);
      }).catch(error => {
        console.error("Failed to load flood data:", error);
        setIsLoadingData(false);
      });
    } else {
      setDroughtData(null);
      setFloodData(null);
    }
  }, [currentLevelId]);

  const renderContent = () => {
    if (isLoadingData) {
       return (
         <div className="flex flex-col items-center justify-center h-64">
           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400"></div>
           <p className="mt-4 text-slate-300 font-semibold text-lg">Loading NASA Mission Data...</p>
         </div>
       );
    }

    // Guard clause: If we are in a game state that requires a level, but don't have one, wait.
    if (gameState !== GameState.LEVEL_SELECTION && !currentLevel) {
      return null; // Render nothing briefly while state synchronizes
    }

    switch (gameState) {
      case GameState.LEVEL_SELECTION:
        return <LevelSelectionScreen onSelectLevel={selectLevel} />;
      case GameState.MISSION_BRIEFING:
        return <MissionView level={currentLevel!} currentMissionIndex={currentMissionIndex} onAdvance={handleAdvance} droughtData={droughtData} floodData={floodData} />;
      case GameState.DATA_QUIZ:
        return currentLevel && droughtData && <DataQuizView droughtData={droughtData} />;
      case GameState.VIDEO_CUTSCENE:
        return <VideoCutsceneView videoUrl={currentLevel!.cutsceneVideo!} onVideoEnd={startLearning} />;
      case GameState.LEARNING:
        return <LearningView level={currentLevel!} onStartQuiz={startQuiz} />;
      case GameState.QUIZ:
        return <QuizView level={currentLevel!} onQuizComplete={finishQuiz} droughtData={droughtData} />;
      case GameState.SCORE_SCREEN:
        return <ScoreView score={score} totalQuestions={totalQuestions} level={currentLevel!} onRestart={restartGame} />;
      default:
        return <LevelSelectionScreen onSelectLevel={selectLevel} />;
    }
  };

  if (showIntro) {
    return <IntroPlayer onVideoEnd={() => setShowIntro(false)} />;
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col items-center justify-center p-4 bg-grid-slate-800/[0.2] [background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.3),rgba(255,255,255,0))]">
      <div className="w-full max-w-4xl bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-sky-400/20 shadow-sky-500/10 relative">
        <LanguageSelector />
        <header className="p-4 bg-black/30 border-b border-sky-400/20">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-green-300 tracking-wider animated-text">
            {t('header.title')}
          </h1>
          <p className="text-center text-slate-400 text-sm font-medium">{t('header.subtitle')}</p>
          <ProgressBar />
        </header>
        <main className="p-4 sm:p-8">
          {renderContent()}
        </main>
        <Guide />
      </div>
       <footer className="text-center text-slate-500 text-xs mt-4">
          <p>{t('footer.copyright')}</p>
        </footer>
    </div>
  );
};

export default App;
