
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      correctAnswer: { type: Type.STRING },
    },
    required: ['question', 'options', 'correctAnswer'],
  },
};

const langMap: { [key: string]: string } = {
  en: 'English',
  fr: 'French',
};


export const generateQuiz = async (topic: string, lang: string, dataContext?: string): Promise<QuizQuestion[]> => {
  try {
    const languageName = langMap[lang] || 'English';
    const contextPrompt = dataContext
      ? `Base at least one question on the following real-world data: "${dataContext}". Do not mention that this data was provided.`
      : '';

    const prompt = `
      You are an expert in agricultural science and education.
      Generate a JSON array of 5 unique, multiple-choice quiz questions for a young audience (ages 10-16) about the following topic.
      The questions must be in ${languageName}.
      The topic is: "${topic}".
      ${contextPrompt}
      The JSON must follow the provided schema.
      Ensure the questions are educational, relevant to the topic, and the options provide plausible distractors. 
      The 'correctAnswer' field MUST be one of the strings from the 'options' array.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: quizSchema,
        temperature: 0.7,
      }
    });
    
    const text = response.text;
    const quizData = JSON.parse(text);

    // Basic validation
    if (!Array.isArray(quizData) || quizData.length === 0) {
      throw new Error("Generated data is not a valid quiz array.");
    }

    return quizData as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz with Gemini:", error);
    throw new Error("Failed to generate the quiz. An unexpected error occurred.");
  }
};

export const generateLearningContent = async (topic: string, lang: string): Promise<string> => {
  try {
    const languageName = langMap[lang] || 'English';
    const prompt = `
      You are an expert in agricultural science and an educator for a young audience (ages 10-16).
      Generate a concise and engaging educational text about the following topic.
      The text must be in ${languageName}.
      The topic is: "${topic}".
      The text should be easy to understand, well-structured with clear paragraphs, and cover the key concepts.
      Do not use markdown formatting. Separate paragraphs with a single newline character.
      The goal is to prepare the user for a quiz on this topic.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    
    return response.text.trim();

  } catch (error) {
    console.error("Error generating learning content with Gemini:", error);
    throw new Error("Failed to generate the learning content. An unexpected error occurred.");
  }
};
