import { useRef, useCallback, useEffect, useState } from 'react';

export const useSpeechSynthesis = () => {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const populateVoiceList = useCallback(() => {
    if (synthRef.current) {
        const availableVoices = synthRef.current.getVoices();
        if (availableVoices.length > 0) {
            setVoices(availableVoices);
            // The event listener is sometimes only fired once, so we can remove it.
            synthRef.current.onvoiceschanged = null;
        }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      // The voices list is populated asynchronously.
      synthRef.current.onvoiceschanged = populateVoiceList;
      // Also call it once in case voices are already loaded.
      populateVoiceList();
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = null;
        synthRef.current.cancel();
      }
    };
  }, [populateVoiceList]);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!synthRef.current || !text) {
      return;
    }

    const allVoices = synthRef.current.getVoices();
    if (allVoices.length === 0) {
      console.error("Speech synthesis error: No voices available.");
      return;
    }
      
    synthRef.current.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
      
    const langCode = lang.startsWith('fr') ? 'fr' : 'en';
    
    // --- Voice Selection Logic ---
    const voiceCandidates = allVoices.filter(voice => voice.lang.startsWith(langCode));
    let selectedVoice: SpeechSynthesisVoice | null = null;
    
    // 1. Prioritize a high-quality (e.g., Google) female voice
    selectedVoice = voiceCandidates.find(voice => 
        /google/i.test(voice.name) && /female|fille|femme/i.test(voice.name)
    ) || null;

    // 2. Fallback to any female voice for the language
    if (!selectedVoice) {
        selectedVoice = voiceCandidates.find(voice => 
            /female|fille|femme/i.test(voice.name)
        ) || null;
    }
    
    // 3. Fallback to any high-quality voice for the language
    if (!selectedVoice) {
        selectedVoice = voiceCandidates.find(voice => 
            /google/i.test(voice.name)
        ) || null;
    }
    
    // 4. Fallback to the first available voice for the language
    if (!selectedVoice && voiceCandidates.length > 0) {
        selectedVoice = voiceCandidates[0];
    }

    utterance.voice = selectedVoice;
    utterance.lang = lang;
    utterance.rate = 1;    // Set speed to normal (1x)
    utterance.pitch = 1;   // Set pitch to natural (1)
    
    synthRef.current.speak(utterance);
    
  }, []); // No dependency on `voices` state

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }, []);

  return { speak, cancel };
};
