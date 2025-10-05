import { Level, Crop, IrrigationPlan, FloodAction } from './types';
import DroughtIcon from './components/icons/DroughtIcon';
import FloodIcon from './components/icons/FloodIcon';
import HeatwaveIcon from './components/icons/HeatwaveIcon';
import BadgeIcon from './components/icons/BadgeIcon';
import SustainabilityIcon from './components/icons/SustainabilityIcon';
import FoodSecurityIcon from './components/icons/FoodSecurityIcon';

export const FLOOD_ACTIONS: FloodAction[] = [
  { id: 'move_tractors', name: 'floodActions.move_tractors', isCorrect: true },
  { id: 'leave_livestock', name: 'floodActions.leave_livestock', isCorrect: false },
  { id: 'move_livestock', name: 'floodActions.move_livestock', isCorrect: true },
  { id: 'barricade_barn', name: 'floodActions.barricade_barn', isCorrect: false },
];

export const IRRIGATION_PLANS: IrrigationPlan[] = [
  {
    id: 'drip',
    name: 'irrigation.drip.name',
    description: 'irrigation.drip.description',
    icon: '💧',
    efficiency: 0.95, // Very high
  },
  {
    id: 'sprinkler',
    name: 'irrigation.sprinkler.name',
    description: 'irrigation.sprinkler.description',
    icon: '💦',
    efficiency: 0.75, // Medium
  },
  {
    id: 'surface',
    name: 'irrigation.surface.name',
    description: 'irrigation.surface.description',
    icon: '🌊',
    efficiency: 0.5, // Low
  },
];

export const CROPS: Crop[] = [
  {
    id: 'sorghum',
    name: 'crops.sorghum.name',
    description: 'crops.sorghum.description',
    icon: '🌾',
    droughtResistance: 0.85, // Very high resistance
  },
  {
    id: 'lentils',
    name: 'crops.lentils.name',
    description: 'crops.lentils.description',
    icon: '🫘',
    droughtResistance: 0.7, // High resistance
  },
  {
    id: 'corn',
    name: 'crops.corn.name',
    description: 'crops.corn.description',
    icon: '🌽',
    droughtResistance: 0.4, // Low resistance
  },
  {
    id: 'rice',
    name: 'crops.rice.name',
    description: 'crops.rice.description',
    icon: '🍚',
    droughtResistance: 0.1, // Very low resistance, needs a lot of water
  },
];

export const LEVELS: Level[] = [
  {
    id: 'drought',
    title: 'levels.drought.title',
    description: 'levels.drought.description',
    icon: DroughtIcon,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    context: 'levels.drought.context',
    cutsceneVideo: '/videos/CHAP1.mp4',
    data: [
      { label: 'dataLabels.avgSoilMoisture', value: 0, unit: 'm³/m³', color: 'bg-slate-500' },
      { label: 'dataLabels.rainfallForecast', value: 5, unit: '%', color: 'bg-red-500' },
      { label: 'dataLabels.reservoirLevel', value: 30, unit: '%', color: 'bg-yellow-500' },
    ],
    subMissions: [
      { title: 'levels.drought.subMissions.0.title', objective: 'levels.drought.subMissions.0.objective' },
      { title: 'levels.drought.subMissions.1.title', objective: 'levels.drought.subMissions.1.objective' },
      { title: 'levels.drought.subMissions.2.title', objective: 'levels.drought.subMissions.2.objective' },
    ],
    quizTopic: 'levels.drought.quizTopic',
    reward: {
        badgeName: 'levels.drought.reward.badgeName',
        icon: BadgeIcon,
    }
  },
  {
    id: 'flood',
    title: 'levels.flood.title',
    description: 'levels.flood.description',
    icon: FloodIcon,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    context: 'levels.flood.context',
    cutsceneVideo: '/videos/CHAP2.mp4',
    data: [
      { label: 'dataLabels.floodRisk', value: 85, unit: '%', color: 'bg-red-500' },
      { label: 'dataLabels.riverLevel', value: 90, unit: '% Capacity', color: 'bg-sky-500' },
      { label: 'dataLabels.soilSaturation', value: 95, unit: '%', color: 'bg-blue-500' },
    ],
    subMissions: [
        { title: 'levels.flood.subMissions.0.title', objective: 'levels.flood.subMissions.0.objective' },
        { title: 'levels.flood.subMissions.1.title', objective: 'levels.flood.subMissions.1.objective' },
        { title: 'levels.flood.subMissions.2.title', objective: 'levels.flood.subMissions.2.objective' },
    ],
    quizTopic: 'levels.flood.quizTopic',
    reward: {
        badgeName: 'levels.flood.reward.badgeName',
        icon: BadgeIcon,
    }
  },
  {
    id: 'heatwave',
    title: 'levels.heatwave.title',
    description: 'levels.heatwave.description',
    icon: HeatwaveIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    context: 'levels.heatwave.context',
    cutsceneVideo: '/videos/CHAP3.mp4',
    data: [
      { label: 'dataLabels.temperatureAnomaly', value: 10, unit: '°C', color: 'bg-red-600' },
      { label: 'dataLabels.evaporationRate', value: 75, unit: '% Higher', color: 'bg-orange-500' },
      { label: 'dataLabels.cropStressIndex', value: 80, unit: '/100', color: 'bg-red-500' },
    ],
    subMissions: [
        { title: 'levels.heatwave.subMissions.0.title', objective: 'levels.heatwave.subMissions.0.objective' },
        { title: 'levels.heatwave.subMissions.1.title', objective: 'levels.heatwave.subMissions.1.objective' },
        { title: 'levels.heatwave.subMissions.2.title', objective: 'levels.heatwave.subMissions.2.objective' },
    ],
    quizTopic: 'levels.heatwave.quizTopic',
    reward: {
        badgeName: 'levels.heatwave.reward.badgeName',
        icon: BadgeIcon,
    }
  },
  {
    id: 'sustainability',
    title: 'levels.sustainability.title',
    description: 'levels.sustainability.description',
    icon: SustainabilityIcon,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    context: 'levels.sustainability.context',
    cutsceneVideo: '/videos/chap4.mp4',
    data: [
      { label: 'dataLabels.soilOrganicMatter', value: 25, unit: '%', color: 'bg-yellow-600' },
      { label: 'dataLabels.cropDiversityIndex', value: 20, unit: '/100', color: 'bg-orange-500' },
      { label: 'dataLabels.waterRetention', value: 40, unit: '%', color: 'bg-sky-600' },
    ],
    subMissions: [
      { title: 'levels.sustainability.subMissions.0.title', objective: 'levels.sustainability.subMissions.0.objective' },
      { title: 'levels.sustainability.subMissions.1.title', objective: 'levels.sustainability.subMissions.1.objective' },
      { title: 'levels.sustainability.subMissions.2.title', objective: 'levels.sustainability.subMissions.2.objective' },
    ],
    quizTopic: 'levels.sustainability.quizTopic',
    reward: {
        badgeName: 'levels.sustainability.reward.badgeName',
        icon: BadgeIcon,
    }
  },
  {
    id: 'food-security',
    title: 'levels.food-security.title',
    description: 'levels.food-security.description',
    icon: FoodSecurityIcon,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    context: 'levels.food-security.context',
    data: [
      { label: 'dataLabels.urgencyLevel', value: 85, unit: '%', color: 'bg-red-500' },
      { label: 'dataLabels.storageSurplus', value: 70, unit: '%', color: 'bg-yellow-500' },
      { label: 'dataLabels.logisticsReadiness', value: 60, unit: '%', color: 'bg-blue-500' },
    ],
    subMissions: [
        { title: 'levels.food-security.subMissions.0.title', objective: 'levels.food-security.subMissions.0.objective' },
        { title: 'levels.food-security.subMissions.1.title', objective: 'levels.food-security.subMissions.1.objective' },
        { title: 'levels.food-security.subMissions.2.title', objective: 'levels.food-security.subMissions.2.objective' },
    ],
    quizTopic: 'levels.food-security.quizTopic',
    reward: {
        badgeName: 'levels.food-security.reward.badgeName',
        icon: BadgeIcon,
    }
  },
];