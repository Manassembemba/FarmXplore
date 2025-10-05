
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState } from '../../types';
import rewards from '../data/rewards.json';

// Définir les types pour notre état
interface GameStateStore {
  gameState: GameState;
  currentLevelId: string | null;
  currentMissionIndex: number;
  score: number;
  totalQuestions: number;
  badges: string[];
  streak: number;
  lastPlayedDate: string | null;
  currentStep: number;
  totalSteps: number;
  highScores: { levelId: string; score: number }[];
}

// Définir les actions pour modifier l'état
interface GameActions {
  selectLevel: (levelId: string, totalStepsInLevel: number) => void;
  advanceMission: (maxMissions: number) => void;
  startQuiz: () => void;
  finishQuiz: (finalScore: number, questionsCount: number) => void;
  restartGame: () => void;
  earnBadge: (badgeId: string) => void;
  checkStreak: () => void;
  addHighScore: (levelId: string, score: number) => void;
  startDataQuiz: () => void;
  finishDataQuiz: () => void;
  startCutscene: () => void;
  startLearning: () => void;
}

// État initial de l'application
const initialState: Omit<GameStateStore, 'badges' | 'streak' | 'lastPlayedDate' | 'highScores'> = {
  gameState: GameState.LEVEL_SELECTION,
  currentLevelId: null,
  currentMissionIndex: 0,
  score: 0,
  totalQuestions: 0,
  currentStep: 0,
  totalSteps: 0,
};

// Création du store Zustand avec persistance
export const useGameStore = create<GameStateStore & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      // Persisted state
      badges: [],
      streak: 0,
      lastPlayedDate: null,
      highScores: [],

      selectLevel: (levelId, totalStepsInLevel) => set({
        gameState: GameState.MISSION_BRIEFING,
        currentLevelId: levelId,
        currentMissionIndex: 0,
        score: 0,
        totalQuestions: 0,
        currentStep: 1,
        totalSteps: totalStepsInLevel,
      }),

      advanceMission: (maxMissions) => {
        const { currentMissionIndex, currentStep } = get();
        if (currentMissionIndex < maxMissions - 1) {
          set({ 
            currentMissionIndex: currentMissionIndex + 1,
            currentStep: currentStep + 1,
          });
        } else {
          // This is now handled by the handleAdvance function in App.tsx
          // This logic could be moved here for better centralization if needed
        }
      },

      startQuiz: () => set((state) => ({
        gameState: GameState.QUIZ,
        currentStep: state.totalSteps,
      })),

      finishQuiz: (finalScore, questionsCount) => {
        const { currentLevelId } = get();
        if (currentLevelId) {
          get().addHighScore(currentLevelId, finalScore);
        }

        const badgeToAward = rewards.find(r => r.levelId === currentLevelId);
        if (badgeToAward) {
          get().earnBadge(badgeToAward.id);
        }
        set({
          gameState: GameState.SCORE_SCREEN,
          score: finalScore,
          totalQuestions: questionsCount,
        });
      },

      restartGame: () => set(initialState),

      earnBadge: (badgeId) => set((state) => ({
        badges: state.badges.includes(badgeId) ? state.badges : [...state.badges, badgeId],
      })),

      checkStreak: () => {
        const { lastPlayedDate, streak } = get();
        const today = new Date().toDateString();

        if (lastPlayedDate === today) {
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastPlayedDate === yesterday.toDateString()) {
          set({ streak: streak + 1, lastPlayedDate: today });
        } else {
          set({ streak: 1, lastPlayedDate: today });
        }
      },

      addHighScore: (levelId, score) => {
        const { highScores } = get();
        const newScore = { levelId, score };
        
        const otherScores = highScores.filter(s => s.levelId !== levelId);
        const levelScores = [...highScores.filter(s => s.levelId === levelId), newScore];
        
        levelScores.sort((a, b) => b.score - a.score);
        
        const topScores = levelScores.slice(0, 5);
        
        set({ highScores: [...otherScores, ...topScores] });
      },

      startDataQuiz: () => set({ gameState: GameState.DATA_QUIZ }),

      finishDataQuiz: () => set((state) => ({
        gameState: GameState.MISSION_BRIEFING,
        currentMissionIndex: state.currentMissionIndex + 1,
        currentStep: state.currentStep + 1,
      })),

      startCutscene: () => set({ gameState: GameState.VIDEO_CUTSCENE }),

      startLearning: () => set({ gameState: GameState.LEARNING }),
    }),
    {
      name: 'farmxplore-progress-storage', 
      partialize: (state) => ({ 
        badges: state.badges, 
        streak: state.streak, 
        lastPlayedDate: state.lastPlayedDate,
        highScores: state.highScores,
      }),
    }
  )
);
