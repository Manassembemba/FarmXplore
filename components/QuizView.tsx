
import React, { useState, useEffect } from 'react';
import { Level, QuizQuestion, DroughtData } from '../types';
import { generateQuiz } from '../services/geminiService';
import SpeakerIcon from './icons/SpeakerIcon';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useTranslation } from '../hooks/useTranslation';
import { BackButton } from './BackButton';

interface QuizViewProps {
  level: Level;
  onQuizComplete: (score: number, totalQuestions: number) => void;
  droughtData: DroughtData | null;
}

const QuizView: React.FC<QuizViewProps> = ({ level, onQuizComplete, droughtData }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { speak, cancel } = useSpeechSynthesis();
  const { t, lang } = useTranslation();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let dataContext: string | undefined = undefined;
        if (level.id === 'drought' && droughtData) {
          const moistureValues = droughtData.records.map(r => r.moisture);
          const minMoisture = Math.min(...moistureValues);
          const maxMoisture = Math.max(...moistureValues);
          const avgMoisture = moistureValues.reduce((a, b) => a + b, 0) / moistureValues.length;
          const driestSite = droughtData.records.find(r => r.moisture === minMoisture);
          
          dataContext = `The mission used real soil moisture data. The values ranged from ${minMoisture.toFixed(3)} to ${maxMoisture.toFixed(3)} m³/m³. The average was ${avgMoisture.toFixed(3)} m³/m³. The driest site was ${driestSite?.siteId}.`;
        }
        
        const quizQuestions = await generateQuiz(t(level.quizTopic), lang, dataContext);
        setQuestions(quizQuestions);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(t('quiz.unknownError'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level.quizTopic, lang, t, level.id, droughtData]);
  
  useEffect(() => {
    if (questions.length > 0 && !isLoading) {
      const currentQuestion = questions[currentQuestionIndex];
      const textToSpeak = `${currentQuestion.question}. ${t('quiz.optionsLabel')}: ${currentQuestion.options.join(', ')}`;
      speak(textToSpeak, lang);
    }
  }, [currentQuestionIndex, questions, isLoading, speak, lang, t]);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return;

    cancel();
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      speak(t('quiz.correct'), lang);
    } else {
      speak(`${t('quiz.incorrect')}. ${t('quiz.correctAnswerIs')} ${questions[currentQuestionIndex].correctAnswer}`, lang);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      onQuizComplete(score, questions.length);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <BackButton />
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
        <p className="mt-4 text-slate-300 font-semibold text-lg">{t('quiz.loadingTitle')}</p>
        <p className="text-slate-400 text-sm">{t('quiz.loadingSubtitle')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-300 bg-red-900/50 p-6 rounded-lg border border-red-500/50">
        <BackButton />
        <h3 className="font-bold text-xl mb-2">{t('quiz.errorTitle')}</h3>
        <p className="font-light">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center text-slate-300"><BackButton />{t('quiz.noQuestions')}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="animate-fade-in">
      <BackButton />
      <div className="mb-4">
        <div className="flex justify-between mb-2">
            <span className="text-base font-medium text-green-300 uppercase tracking-wider">{t('quiz.questionLabel')} {currentQuestionIndex + 1}/{questions.length}</span>
            <span className="text-sm font-medium text-slate-300">{t('quiz.scoreLabel')}: {score}</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-green-400 to-sky-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold mb-6 text-slate-100">{currentQuestion.question}</h3>
          <button onClick={() => speak(`${currentQuestion.question}. ${t('quiz.optionsLabel')}: ${currentQuestion.options.join(', ')}`, lang)} className="p-2 rounded-full hover:bg-slate-700 transition-colors shrink-0 ml-4">
            <SpeakerIcon className="w-6 h-6 text-slate-400"/>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "border-slate-700 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500";
            if (selectedAnswer !== null) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass = "border-green-500 bg-green-500/20 text-green-300 shadow-[0_0_10px_theme(colors.green.500/0.5)]";
              } else if (option === selectedAnswer) {
                buttonClass = "border-red-500 bg-red-500/20 text-red-300 shadow-[0_0_10px_theme(colors.red.500/0.5)]";
              } else {
                buttonClass = "border-slate-800 bg-slate-800/40 opacity-50";
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 text-left w-full rounded-lg transition-all duration-300 text-white font-medium border ${buttonClass} disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {selectedAnswer && (
        <div className="mt-6 text-center animate-fade-in">
          <button 
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-sky-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            {currentQuestionIndex < questions.length - 1 ? t('quiz.nextQuestion') : t('quiz.finishMission')}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
