
// FIX: Import FC and SVGProps types from React to resolve 'Cannot find namespace React' error.
import type { FC, SVGProps } from 'react';

export enum GameState {
  LEVEL_SELECTION,
  MISSION_BRIEFING,
  DATA_QUIZ, // New state for the data-driven quiz
  VIDEO_CUTSCENE,
  LEARNING,
  QUIZ,
  SCORE_SCREEN,
}

export interface Crop {
  id: string;
  name: string;
  description: string;
  icon: string;
  droughtResistance: number;
}

export interface IrrigationPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  efficiency: number;
}

export interface FloodAction {
  id: string;
  name: string;
  isCorrect: boolean;
}

export interface RainfallRecord {
  id: string;
  lat: number;
  long: number;
  rainfall: number;
}

export interface FloodData {
  records: RainfallRecord[];
}

export interface Reward {
  badgeName: string;
  // FIX: Use imported FC and SVGProps types.
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface SubMission {
  title: string;
  objective: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  cutsceneVideo?: string;
  // FIX: Use imported FC and SVGProps types.
  icon: FC<SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  context: string;
  data: {
    label: string;
    value: number;
    unit: string;
    color: string;
  }[];
  subMissions: SubMission[];
  quizTopic: string;
  reward: Reward;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SoilMoistureRecord {
  siteId: string;
  date: string;
  moisture: number;
}

export interface NasaMetadata {
  west: number;
  east: number;
  north: number;
  south: number;
  startDate: string;
  endDate: string;
}

export interface DroughtData {
  metadata: NasaMetadata;
  records: SoilMoistureRecord[];
}
