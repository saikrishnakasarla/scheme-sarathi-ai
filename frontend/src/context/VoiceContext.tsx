import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { VOICE_GUIDANCE_DICT } from '../services/voiceGuidanceData';
import { synthesizeSpeech } from '../services/api';
import { useLanguage } from './LanguageContext';

interface VoiceContextType {
  isSpeaking: boolean;
  isListening: boolean;
  voiceGuidanceEnabled: boolean;
  currentSpeakingText: string;
  speakTelugu: (text: string, onEnd?: () => void) => Promise<void>;
  stopSpeaking: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  toggleVoiceGuidance: () => void;
  startListening: (onTranscript: (text: string) => void, onError?: (err: string) => void) => void;
  stopListening: () => void;
  handleAccessibleAction: (buttonKey: string, callback?: () => void) => void;
  hasSpeechRecognition: boolean;
  hasSpeechSynthesis: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState<boolean>(true);
  const [currentSpeakingText, setCurrentSpeakingText] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const onEndCallbackRef = useRef<(() => void) | undefined>(undefined);

  const hasSpeechRecognition = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    setIsSpeaking(false);
    setCurrentSpeakingText('');
    if (onEndCallbackRef.current) {
      const cb = onEndCallbackRef.current;
      onEndCallbackRef.current = undefined;
      cb();
    }
  };

  const pauseSpeaking = () => {
    if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
      audioPlayerRef.current.pause();
      setIsSpeaking(false);
    } else if (typeof window !== 'undefined' && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    }
  };

  const resumeSpeaking = () => {
    if (audioPlayerRef.current && audioPlayerRef.current.paused) {
      audioPlayerRef.current.play();
      setIsSpeaking(true);
    } else if (typeof window !== 'undefined' && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
    }
  };

  const speakTelugu = async (text: string, onEnd?: () => void): Promise<void> => {
    if (!text || text.trim() === '') return;
    
    // Stop any existing speech before starting
    stopSpeaking();
    onEndCallbackRef.current = onEnd;
    setCurrentSpeakingText(text);
    setIsSpeaking(true);

    // Try finding a Telugu voice in browser synthesis first
    let teluguVoice: SpeechSynthesisVoice | null = null;
    if (hasSpeechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      teluguVoice = voices.find((v) => v.lang.includes('te') || v.lang === 'te-IN') ||
                    voices.find((v) => v.lang.includes('hi') || v.lang === 'hi-IN') ||
                    voices.find((v) => v.lang.includes('en-IN')) || null;
    }

    if (hasSpeechSynthesis && teluguVoice && teluguVoice.lang.includes('te')) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = teluguVoice;
      utterance.lang = 'te-IN';
      utterance.rate = 0.9; // Slightly slower, clear cadence for rural comprehension
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeakingText('');
        if (onEndCallbackRef.current) {
          const cb = onEndCallbackRef.current;
          onEndCallbackRef.current = undefined;
          cb();
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeakingText('');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Use backend high-quality gTTS Telugu synthesis fallback
      try {
        const langCode = language === 'hi' ? 'hi' : language === 'en' ? 'en' : 'te';
        const base64Audio = await synthesizeSpeech(text, langCode);
        if (base64Audio) {
          const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
          audioPlayerRef.current = audio;
          audio.playbackRate = 1.0;

          audio.onended = () => {
            setIsSpeaking(false);
            setCurrentSpeakingText('');
            audioPlayerRef.current = null;
            if (onEndCallbackRef.current) {
              const cb = onEndCallbackRef.current;
              onEndCallbackRef.current = undefined;
              cb();
            }
          };

          audio.onerror = () => {
            setIsSpeaking(false);
            setCurrentSpeakingText('');
            audioPlayerRef.current = null;
          };

          await audio.play();
        } else {
          // If both fail, trigger browser utterance as ultimate fallback
          if (hasSpeechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'te-IN';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
          } else {
            setIsSpeaking(false);
          }
        }
      } catch (err) {
        console.warn('Speech synthesis fallback failed:', err);
        setIsSpeaking(false);
      }
    }
  };

  const handleAccessibleAction = (buttonKey: string, callback?: () => void) => {
    const guidance = VOICE_GUIDANCE_DICT[buttonKey];
    
    // Execute action immediately (non-blocking)
    if (callback) {
      try {
        callback();
      } catch (e) {
        console.error(e);
      }
    }

    // Play voice guidance if enabled
    if (voiceGuidanceEnabled && guidance) {
      speakTelugu(guidance);
    }
  };

  const toggleVoiceGuidance = () => {
    const nextState = !voiceGuidanceEnabled;
    setVoiceGuidanceEnabled(nextState);
    if (!nextState) {
      stopSpeaking();
    } else {
      speakTelugu(VOICE_GUIDANCE_DICT['action_voice_guide_toggle_on']);
    }
  };

  const startListening = (
    onTranscript: (text: string) => void,
    onError?: (err: string) => void
  ) => {
    if (!hasSpeechRecognition) {
      if (onError) onError('మీ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి టైప్ చేయండి.');
      return;
    }

    stopSpeaking();

    try {
      const SpeechRecognitionClass = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;

      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'en' ? 'en-IN' : 'te-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          onTranscript(finalTranscript.trim());
          stopListening();
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          if (onError) onError('మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి అనుమతి ఇవ్వండి.');
        } else {
          if (onError) onError('మాటను గుర్తించడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      if (onError) onError('మైక్రోఫోన్ ప్రారంభించడంలో సమస్య ఏర్పడింది.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  return (
    <VoiceContext.Provider
      value={{
        isSpeaking,
        isListening,
        voiceGuidanceEnabled,
        currentSpeakingText,
        speakTelugu,
        stopSpeaking,
        pauseSpeaking,
        resumeSpeaking,
        toggleVoiceGuidance,
        startListening,
        stopListening,
        handleAccessibleAction,
        hasSpeechRecognition,
        hasSpeechSynthesis,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = (): VoiceContextType => {
  const context = useContext(VoiceContext);
  if (!context) throw new Error('useVoice must be used within a VoiceProvider');
  return context;
};
