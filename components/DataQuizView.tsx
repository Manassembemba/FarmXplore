import React, { useState, useMemo, useEffect } from 'react';
import { DroughtData, QuizQuestion } from '../types';
import { useGameStore } from '../src/stores/useGameStore';
import { useTranslation } from '../hooks/useTranslation';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import SpeakerIcon from './icons/SpeakerIcon';

// --- Question Generation Logic ---
const generateDataQuestions = (data: DroughtData, t: (key: string) => string): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  const records = data.records;

  if (records.length < 3) return []; // Need at least 3 records to make a decent quiz

  // Find min and max moisture records
  const sortedRecords = [...records].sort((a, b) => a.moisture - b.moisture);
  const minRecord = sortedRecords[0];
  const maxRecord = sortedRecords[sortedRecords.length - 1];
  const midRecord = sortedRecords[Math.floor(sortedRecords.length / 2)];

  // Question 1: Which site was the driest?
  questions.push({
    question: t('dataQuiz.q_driest_site'),
    options: [minRecord.siteId, midRecord.siteId, maxRecord.siteId].sort(() => Math.random() - 0.5),
    correctAnswer: minRecord.siteId,
  });

  // Question 2: What was the approximate lowest moisture value recorded?
  const minMoisture = minRecord.moisture.toFixed(3);
  const distractor1 = (maxRecord.moisture).toFixed(3);
  const distractor2 = (midRecord.moisture).toFixed(3);
  questions.push({
    question: t('dataQuiz.q_lowest_value'),
    options: [minMoisture, distractor1, distractor2].sort(() => Math.random() - 0.5),
    correctAnswer: minMoisture,
  });

  return questions;
};

// --- Component --- 
interface DataQuizViewProps {
  droughtData: DroughtData;
}

export const DataQuizView: React.FC<DataQuizViewProps> = ({ droughtData }) => {
  const finishDataQuiz = useGameStore((state) => state.finishDataQuiz);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { speak, cancel } = useSpeechSynthesis();
  const { t, lang } = useTranslation();

  useEffect(() => {
    setQuestions(generateDataQuestions(droughtData, t));
  }, [droughtData, t]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const textToSpeak = `${currentQuestion.question}. ${t('quiz.optionsLabel')}: ${currentQuestion.options.join(', ')}`;
      speak(textToSpeak, lang);
    }
  }, [currentQuestionIndex, questions, speak, lang, t]);

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return;
    cancel();
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
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
      finishDataQuiz();
    }
  };

  if (questions.length === 0) {
    return <div className="text-center text-slate-300">{t('dataQuiz.loading')}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <p className="text-center text-sky-300 font-bold uppercase tracking-wider">{t('dataQuiz.title')}</p>
        <h3 className="text-xl font-semibold mb-6 text-slate-100 text-center">{currentQuestion.question}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = "border-slate-700 bg-slate-800/60 hover:bg-slate-700/80 hover:border-sky-500";
          if (selectedAnswer !== null) {
            if (option === currentQuestion.correctAnswer) {
              buttonClass = "border-green-500 bg-green-500/20 text-green-300";
            } else if (option === selectedAnswer) {
              buttonClass = "border-red-500 bg-red-500/20 text-red-300";
            } else {
              buttonClass = "border-slate-800 bg-slate-800/40 opacity-50";
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`p-4 text-center w-full rounded-lg transition-all duration-300 text-white font-medium border ${buttonClass} disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="mt-6 text-center animate-fade-in">
          <button 
            onClick={handleNextQuestion}
            className="bg-sky-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-500 transition-all duration-300"
          >
            {currentQuestionIndex < questions.length - 1 ? t('quiz.nextQuestion') : t('dataQuiz.continue')}
          </button>
        </div>
      )}
    </div>
  );
};
