import React, { useEffect, useState, useMemo } from 'react';
import { Level, DroughtData, FloodData, Crop, FloodAction } from '../../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import SpeakerIcon from './icons/SpeakerIcon';
import { useTranslation } from '../hooks/useTranslation';
import { useGameStore } from '../src/stores/useGameStore';
import DataMapView from './DataMapView';
import { BackButton } from './BackButton';
import { CROPS, IRRIGATION_PLANS, FLOOD_ACTIONS } from '../constants';
import FloodScene from './scenes/FloodScene';

interface MissionViewProps {
  level: Level;
  currentMissionIndex: number;
  onAdvance: () => void;
  droughtData: DroughtData | null;
  floodData: FloodData | null;
}

const MissionView: React.FC<MissionViewProps> = ({ level, currentMissionIndex, onAdvance, droughtData, floodData }) => {
  const { speak } = useSpeechSynthesis();
  const { t, lang } = useTranslation();
  const startDataQuiz = useGameStore((state) => state.startDataQuiz);
  
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>([]);
  const [sandbagsPlaced, setSandbagsPlaced] = useState(0);
  const [validationStatus, setValidationStatus] = useState<'correct' | 'incorrect' | null>(null);

  const currentMission = level.subMissions[currentMissionIndex];
  const missionTitle = t(currentMission.title);
  const missionObjective = t(currentMission.objective);
  const missionText = `${missionTitle}. ${t('missionView.objectiveLabel')}: ${missionObjective}`;

  useEffect(() => {
    speak(missionText, lang);
    setSelectedSite(null);
    setSelectedCropId(null);
    setSelectedPlanId(null);
    setSelectedActionIds([]);
    setSandbagsPlaced(0);
    setValidationStatus(null);
  }, [speak, missionText, lang, currentMissionIndex]);

  useEffect(() => {
    if (level.id === 'flood' && currentMissionIndex === 2) {
      const SANDBAGS_REQUIRED = 5;
      if (sandbagsPlaced >= SANDBAGS_REQUIRED) {
        setValidationStatus('correct');
        setTimeout(() => onAdvance(), 1500);
      }
    }
  }, [sandbagsPlaced, level.id, currentMissionIndex, onAdvance]);

  const isLastMission = currentMissionIndex === level.subMissions.length - 1;

  const { processedDroughtData, driestSite } = useMemo(() => {
    if (!droughtData) return { processedDroughtData: [], driestSite: null };
    const moistureValues = droughtData.records.map(r => r.moisture);
    if (moistureValues.length === 0) return { processedDroughtData: [], driestSite: null };
    const avgMoisture = moistureValues.reduce((a, b) => a + b, 0) / moistureValues.length;
    const minMoisture = Math.min(...moistureValues);
    const maxMoisture = Math.max(...moistureValues);
    const getColorClass = (value: number) => {
      if (maxMoisture === minMoisture) return 'bg-green-500';
      const normalized = (value - minMoisture) / (maxMoisture - minMoisture);
      if (normalized < 0.5) return 'bg-yellow-400';
      return 'bg-green-500';
    };
    const data = [
      { label: 'dataLabels.avgSoilMoisture', value: parseFloat(avgMoisture.toFixed(3)), unit: 'm³/m³', isTarget: false, color: getColorClass(avgMoisture) },
      { label: 'dataLabels.minMoisture', value: parseFloat(minMoisture.toFixed(3)), unit: 'm³/m³', isTarget: level.id === 'drought' && currentMissionIndex === 0, color: 'bg-red-500' },
      { label: 'dataLabels.maxMoisture', value: parseFloat(maxMoisture.toFixed(3)), unit: 'm³/m³', isTarget: false, color: 'bg-green-500' },
    ];
    const site = droughtData.records.reduce((prev, curr) => (prev.moisture < curr.moisture ? prev : curr));
    return { processedDroughtData: data, driestSite: site };
  }, [droughtData, level.id, currentMissionIndex]);

  const { processedFloodData, floodRiskSite, floodMapData } = useMemo(() => {
    if (!floodData) return { processedFloodData: [], floodRiskSite: null, floodMapData: [] };
    const rainfallValues = floodData.records.map(r => r.rainfall);
    if (rainfallValues.length === 0) return { processedFloodData: [], floodRiskSite: null, floodMapData: [] };
    const avgRainfall = rainfallValues.reduce((a, b) => a + b, 0) / rainfallValues.length;
    const maxRainfall = Math.max(...rainfallValues);
    const minRainfall = Math.min(...rainfallValues);
    const getColorClass = (value: number) => {
      const normalized = (value - minRainfall) / (maxRainfall - minRainfall);
      if (normalized < 0.33) return 'bg-sky-300';
      if (normalized < 0.66) return 'bg-sky-500';
      return 'bg-blue-600';
    };
    const data = [
      { label: 'dataLabels.avgRainfall', value: parseFloat(avgRainfall.toFixed(2)), unit: 'mm', isTarget: false, color: getColorClass(avgRainfall) },
      { label: 'dataLabels.maxRainfall', value: parseFloat(maxRainfall.toFixed(2)), unit: 'mm', isTarget: level.id === 'flood' && currentMissionIndex === 0, color: 'bg-blue-600' },
      { label: 'dataLabels.sandbagsPlaced', value: sandbagsPlaced, unit: '/ 5', isTarget: currentMissionIndex === 2, color: 'bg-slate-500' },
    ];
    const site = floodData.records.reduce((prev, curr) => (prev.rainfall > curr.rainfall ? prev : curr));
    const mapData = floodData.records.map(r => ({ siteId: r.id, date: '', moisture: r.rainfall }));
    return { processedFloodData: data, floodRiskSite: site, floodMapData: mapData };
  }, [floodData, level.id, currentMissionIndex, sandbagsPlaced]);

  const dataFeedItems = level.id === 'drought' ? processedDroughtData : (level.id === 'flood' ? processedFloodData : []);

  const handleValidation = () => {
    if (level.id === 'drought') {
      if (currentMissionIndex === 0) {
        if(selectedSite === driestSite?.siteId) {
          setValidationStatus('correct');
          setTimeout(() => startDataQuiz(), 1500);
        }
      } else if (currentMissionIndex === 1) {
        const mostResistantCrop = CROPS.reduce((prev, curr) => (prev.droughtResistance > curr.droughtResistance ? prev : curr));
        const isCorrect = selectedCropId === mostResistantCrop.id;
        if(isCorrect) {
          setValidationStatus('correct');
          setTimeout(() => onAdvance(), 1500);
        } else {
          setValidationStatus('incorrect');
          setTimeout(() => setValidationStatus(null), 2000);
        }
      } else if (currentMissionIndex === 2) {
        const isCorrect = selectedPlanId === 'drip';
        if(isCorrect) {
          setValidationStatus('correct');
          setTimeout(() => onAdvance(), 1500);
        } else {
          setValidationStatus('incorrect');
          setTimeout(() => setValidationStatus(null), 2000);
        }
      }
    } else if (level.id === 'flood') {
      if (currentMissionIndex === 0) {
        if(selectedSite === floodRiskSite?.id) {
          setValidationStatus('correct');
          setTimeout(() => onAdvance(), 1500);
        } else {
          setValidationStatus('incorrect');
          setTimeout(() => setValidationStatus(null), 2000);
        }
      } else if (currentMissionIndex === 1) {
        const correctActionIds = FLOOD_ACTIONS.filter(a => a.isCorrect).map(a => a.id);
        const isCorrect = correctActionIds.length === selectedActionIds.length && correctActionIds.every(id => selectedActionIds.includes(id));
        if(isCorrect) {
          setValidationStatus('correct');
          setTimeout(() => onAdvance(), 1500);
        } else {
          setValidationStatus('incorrect');
          setTimeout(() => setValidationStatus(null), 2000);
        }
      }
    } else {
      onAdvance();
    }
  };

  const getButtonText = () => {
    if ((level.id === 'drought' && currentMissionIndex <= 2) || (level.id === 'flood' && currentMissionIndex <= 1)) {
      return t('missionView.validateSelection');
    }
    return isLastMission ? t('missionView.startLearning') : t('missionView.nextMission');
  };

  const handleSelectAction = (actionId: string) => {
    setSelectedActionIds(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId) 
        : [...prev, actionId]
    );
  };

  const hintText = useMemo(() => {
    if (level.id === 'drought' && currentMissionIndex === 0) return t('missionView.hints.drought_1');
    if (level.id === 'flood' && currentMissionIndex === 0) return t('missionView.hints.flood_1');
    return null;
  }, [level.id, currentMissionIndex, t]);

  const renderMissionContent = () => {
    if (level.id === 'drought') {
      if (currentMissionIndex === 0 && droughtData) return <DataMapView records={droughtData.records} selectedSite={selectedSite} onSelectSite={setSelectedSite} levelId={level.id} targetSiteId={driestSite?.id || null} />;
      if (currentMissionIndex === 1) return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {CROPS.map(crop => (
            <button key={crop.id} onClick={() => setSelectedCropId(crop.id)} className={`p-4 rounded-lg border-2 text-center transition-all transform hover:scale-105 ${selectedCropId === crop.id ? 'border-green-400 bg-green-900/50 scale-105' : 'border-slate-700 bg-slate-800/50'}`}>
              <div className="text-4xl mb-2">{crop.icon}</div>
              <div className="font-bold text-slate-100">{t(crop.name)}</div>
              <div className="text-xs text-slate-400 mt-1">{t(crop.description)}</div>
            </button>
          ))}
        </div>
      );
      if (currentMissionIndex === 2) return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {IRRIGATION_PLANS.map(plan => (
            <button key={plan.id} onClick={() => setSelectedPlanId(plan.id)} className={`p-4 rounded-lg border-2 text-center transition-all transform hover:scale-105 ${selectedPlanId === plan.id ? 'border-green-400 bg-green-900/50 scale-105' : 'border-slate-700 bg-slate-800/50'}`}>
              <div className="text-4xl mb-2">{plan.icon}</div>
              <div className="font-bold text-slate-100">{t(plan.name)}</div>
              <div className="text-xs text-slate-400 mt-1">{t(plan.description)}</div>
            </button>
          ))}
        </div>
      );
    } else if (level.id === 'flood') {
      if (currentMissionIndex === 0 && floodData) return <DataMapView records={floodMapData} selectedSite={selectedSite} onSelectSite={setSelectedSite} levelId={level.id} targetSiteId={floodRiskSite?.id || null} />;
      if (currentMissionIndex === 1) return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {FLOOD_ACTIONS.map(action => (
            <button key={action.id} onClick={() => handleSelectAction(action.id)} className={`p-4 rounded-lg border-2 text-left transition-all ${selectedActionIds.includes(action.id) ? 'border-sky-400 bg-sky-900/50' : 'border-slate-700 bg-slate-800/50'}`}>
              <div className="font-bold text-slate-100">{t(action.name)}</div>
            </button>
          ))}
        </div>
      );
      if (currentMissionIndex === 2) return (
        <div className="h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
          <FloodScene onSandbagPlace={() => setSandbagsPlaced(p => p + 1)} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
      <div>
        <BackButton />
        {renderMissionContent()}
      </div>
      <div className="text-center md:text-left">
        <div className="flex justify-center md:justify-start items-center gap-4">
          <h2 className={`text-3xl font-bold mb-2 ${level.color}`}>{missionTitle}</h2>
          <button onClick={() => speak(missionText, lang)} className="p-2 rounded-full hover:bg-slate-700 transition-colors shrink-0 mb-2" aria-label={t('missionView.readAloudAria')}>
            <SpeakerIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        <p className="text-slate-400 mb-6 font-light">{t(level.context)}</p>
        {dataFeedItems.length > 0 && (
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 mb-6 text-left">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 tracking-wider uppercase">{t('missionView.dataFeed')}</h3>
            <div className="space-y-4">
              {dataFeedItems.map(item => (
                <div key={item.label} className={`p-2 rounded-md transition-all border-2 ${item.isTarget ? 'border-yellow-400/80 bg-yellow-400/10 animate-pulse' : 'border-transparent'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-200">{t(item.label)}</span>
                    <span className={`text-sm font-bold ${level.color}`}>{item.value} {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-green-800/20 p-6 rounded-lg border border-green-500/30">
          <h3 className="text-xl font-bold text-green-300 mb-2 uppercase tracking-wider">{t('missionView.yourObjective')}</h3>
          <p className="text-slate-300 mb-4 font-light">{missionObjective}</p>
          {hintText && <p className="text-xs text-sky-300/80 p-2 bg-sky-900/30 rounded-md font-mono">{hintText}</p>}
          <div className="h-6 mt-2">
            {validationStatus === 'correct' && <p className="text-green-400 font-bold animate-pulse">Correct! Proceeding...</p>}
            {validationStatus === 'incorrect' && <p className="text-red-400 font-bold animate-bounce">Incorrect selection. Please try again.</p>}
          </div>
          { (level.id !== 'flood' || currentMissionIndex !== 2) && <button
            onClick={handleValidation}
            disabled={ 
              (level.id === 'drought' && currentMissionIndex === 0 && !selectedSite) || 
              (level.id === 'drought' && currentMissionIndex === 1 && !selectedCropId) ||
              (level.id === 'drought' && currentMissionIndex === 2 && !selectedPlanId) ||
              (level.id === 'flood' && currentMissionIndex === 0 && !selectedSite) ||
              (level.id === 'flood' && currentMissionIndex === 1 && selectedActionIds.length === 0)
            }
            className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 pulse-button disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            {getButtonText()}
          </button>}
        </div>
      </div>
    </div>
  );
};

export default MissionView;