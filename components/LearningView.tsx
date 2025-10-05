
import React, { useState, useEffect } from 'react';
import { Level } from '../types';
import { generateLearningContent } from '../services/geminiService';
import SpeakerIcon from './icons/SpeakerIcon';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useTranslation } from '../hooks/useTranslation';
import { BackButton } from './BackButton';

interface LearningViewProps {
  level: Level;
  onStartQuiz: () => void;
}

const LearningView: React.FC<LearningViewProps> = ({ level, onStartQuiz }) => {
  const [learningContent, setLearningContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { speak } = useSpeechSynthesis();
  const { t, lang } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const content = await generateLearningContent(t(level.quizTopic), lang);
        setLearningContent(content);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(t('learning.unknownError'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level.quizTopic, lang, t]);

  useEffect(() => {
    if (learningContent && !isLoading) {
      speak(`${t('learning.title')}. ${learningContent}`, lang);
    }
  }, [learningContent, isLoading, speak, lang, t]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <BackButton />
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
        <p className="mt-4 text-slate-300 font-semibold text-lg">{t('learning.loadingTitle')}</p>
        <p className="text-slate-400 text-sm">{t('learning.loadingSubtitle')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-300 bg-red-900/50 p-6 rounded-lg border border-red-500/50">
        <BackButton />
        <h3 className="font-bold text-xl mb-2">{t('learning.errorTitle')}</h3>
        <p className="font-light">{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-center">
      <BackButton />
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-4xl font-bold mb-4 text-slate-100">{t('learning.title')}</h2>
        <button
          onClick={() => speak(learningContent, lang)}
          className="p-2 rounded-full hover:bg-slate-700 transition-colors shrink-0 mb-4"
          aria-label={t('learning.readAloudAria')}
        >
          <SpeakerIcon className="w-6 h-6 text-slate-400" />
        </button>
      </div>
      <p className="text-slate-400 mb-6 font-light">{t('learning.subtitle')}</p>

      <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 mb-8 text-left max-h-[40vh] overflow-y-auto">
        {learningContent.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
          <p key={index} className="text-slate-300 mb-4 font-light leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      <button
        onClick={onStartQuiz}
        className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 pulse-button"
      >
        {t('learning.startQuizButton')}
      </button>
    </div>
  );
};

export default LearningView;
