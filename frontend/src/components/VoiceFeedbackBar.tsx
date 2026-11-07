import React from 'react';
import { Mic, Volume2, Square, X } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

export const VoiceFeedbackBar: React.FC = () => {
  const { isSpeaking, isListening, currentSpeakingText, stopSpeaking, stopListening } = useVoice();

  if (!isSpeaking && !isListening) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] sm:w-auto animate-bounceIn">
      <div className="bg-slate-950/95 backdrop-blur-md text-white border-2 border-amber-400/50 rounded-2xl px-4 py-3 shadow-2xl flex items-center justify-between gap-3 sm:gap-6">
        
        <div className="flex items-center gap-3 overflow-hidden">
          {isListening ? (
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center animate-pulse flex-shrink-0">
              <Mic className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
            </div>
          )}

          <div className="overflow-hidden">
            <div className="text-xs font-black text-amber-300">
              {isListening ? 'సారథి వింటున్నాడు...' : 'సారథి మాట్లాడుతున్నాడు'}
            </div>
            <p className="text-[11px] text-stone-300 truncate max-w-xs">
              {isListening ? 'మీరు తెలుగులో మాట్లాడవచ్చు' : currentSpeakingText}
            </p>
          </div>
        </div>

        <button
          onClick={isListening ? stopListening : stopSpeaking}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition flex-shrink-0 shadow-sm"
        >
          <Square className="w-3 h-3 fill-current" />
          <span>ఆపు</span>
        </button>

      </div>
    </div>
  );
};
