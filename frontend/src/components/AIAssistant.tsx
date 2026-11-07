import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Square, 
  Trash2, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  User,
  ShieldCheck
} from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import { sendChatMessage } from '../services/api';
import { ChatMessage, SchemeSummary } from '../types';

interface AIAssistantProps {
  onOpenSchemeModal: (slug: string) => void;
  onOpenEligibility: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onOpenSchemeModal, onOpenEligibility }) => {
  const { 
    isSpeaking, 
    isListening, 
    speakTelugu, 
    stopSpeaking, 
    startListening, 
    stopListening,
    handleAccessibleAction 
  } = useVoice();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const INITIAL_WELCOME: ChatMessage = {
    id: 'welcome-msg',
    sender: 'sarathi',
    text: 'నమస్కారం! నేను Scheme Sarathi AI సహాయకుడిని. మీకు ఏ ప్రభుత్వ పథకం గురించి తెలుసుకోవాలి? మీరు తెలుగులో మాట్లాడవచ్చు లేదా క్రింది ప్రశ్నలలో ఒకదాన్ని ఎంచుకోవచ్చు.',
    timestamp: new Date(),
    suggested_questions: [
      'రైతులకు ఏయే పథకాలు అందుబాటులో ఉన్నాయి?',
      'ఆరోగ్యశ్రీ / ఆయుష్మాన్ భారత్ ద్వారా ఎంత లబ్ధి లభిస్తుంది?',
      'కాలేజీ విద్యార్థుల ఫీజు రీయింబర్స్‌మెంట్ పథకం ఏమిటి?',
      'వ్యాపారం కోసం హామీ లేని ముద్రా లోన్ ఎలా పొందాలి?',
      'గ్రామీణ పేదలకు పక్కా ఇంటి నిర్మాణం పథకం ఏమిటి?'
    ]
  };

  useEffect(() => {
    setMessages([INITIAL_WELCOME]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText) return;

    stopSpeaking();
    stopListening();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const data = await sendChatMessage({
        message: messageText,
        language: 'te',
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'sarathi',
        text: data.response_text,
        timestamp: new Date(),
        recommended_schemes: data.recommended_schemes,
        suggested_questions: data.suggested_questions,
        source_portals: data.source_portals,
      };

      setMessages((prev) => [...prev, aiMsg]);
      
      // Automatically read aloud the answer in Telugu for seamless voice assistance!
      setActiveSpeakingMsgId(aiMsg.id);
      speakTelugu(aiMsg.text, () => {
        setActiveSpeakingMsgId(null);
      });
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'sarathi',
        text: 'క్షమించండి. సర్వర్‌తో అనుసంధానం చేయడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి లేదా ఇంటర్నెట్ సరిచూసుకోండి.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInputClick = () => {
    if (isListening) {
      handleAccessibleAction('action_mic_stop', stopListening);
    } else {
      handleAccessibleAction('action_mic_start', () => {
        startListening(
          (recognizedText) => {
            setInputMessage(recognizedText);
            handleSendMessage(recognizedText);
          },
          (err) => {
            alert(err);
          }
        );
      });
    }
  };

  const handlePlayMessageAudio = (msg: ChatMessage) => {
    if (isSpeaking && activeSpeakingMsgId === msg.id) {
      stopSpeaking();
      setActiveSpeakingMsgId(null);
    } else {
      stopSpeaking();
      setActiveSpeakingMsgId(msg.id);
      speakTelugu(msg.text, () => {
        setActiveSpeakingMsgId(null);
      });
    }
  };

  const handleClearChat = () => {
    handleAccessibleAction('action_clear_chat', () => {
      stopSpeaking();
      setMessages([INITIAL_WELCOME]);
      setActiveSpeakingMsgId(null);
    });
  };

  return (
    <section id="assistant-section" className="py-8 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Assistant Card Container */}
      <div className="bg-white border-2 border-emerald-900/15 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[740px]">
        
        {/* Chat Header Bar */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-700">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md border-2 border-emerald-300">
                సా
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-950 rounded-full animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  సారథి AI సహాయకుడు
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  తెలుగు వాయిస్
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                ప్రభుత్వ పథకాల గురించి మాట్లాడండి లేదా టైప్ చేయండి
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 text-xs font-semibold border border-emerald-600/60 transition"
              title="చాట్ క్లియర్ చేయండి"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">క్లియర్</span>
            </button>
          </div>
        </div>

        {/* Chat Message Scrollable View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-stone-50/60 to-white">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isThisSpeaking = isSpeaking && activeSpeakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0 mt-1">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed shadow-sm transition-all ${
                    isUser
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-900 rounded-tl-none ring-1 ring-black/5'
                  }`}
                >
                  {/* Message Text with Markdown styling support */}
                  <div className="whitespace-pre-line font-medium">
                    {msg.text}
                  </div>

                  {/* AI Message Action Bar (Audio speaker, Replay, Stop) */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePlayMessageAudio(msg)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition border ${
                            isThisSpeaking
                              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400'
                              : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border-stone-200'
                          }`}
                          title="తెలుగులో వినండి"
                        >
                          {isThisSpeaking ? (
                            <>
                              <Square className="w-3.5 h-3.5 text-amber-700 fill-current" />
                              <span>వాయిస్ ఆపు</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>వాయిస్‌లో వినండి</span>
                            </>
                          )}
                        </button>

                        {isThisSpeaking && (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                            <span>మాట్లాడుతోంది...</span>
                          </div>
                        )}
                      </div>

                      <span className="text-[11px] text-stone-600">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}

                  {/* Embedded Recommended Schemes Cards inside AI Bubble */}
                  {!isUser && msg.recommended_schemes && msg.recommended_schemes.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-emerald-100 space-y-2.5">
                      <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>సిఫార్సు చేసిన పథకాలు ({msg.recommended_schemes.length}):</span>
                      </p>

                      <div className="grid grid-cols-1 gap-2.5">
                        {msg.recommended_schemes.map((scheme) => (
                          <div
                            key={scheme.id}
                            className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 hover:bg-emerald-100/60 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-emerald-900">
                                  {scheme.name_te}
                                </span>
                                {scheme.verified && (
                                  <span title="ధృవీకరించబడింది">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-600 line-clamp-1">
                                {scheme.purpose_te}
                              </p>
                              {scheme.financial_amount && (
                                <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                                  లబ్ధి: {scheme.financial_amount}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={() => onOpenSchemeModal(scheme.slug)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 transition"
                              >
                                <span>వివరాలు</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Question Chips inside Message */}
                  {!isUser && msg.suggested_questions && msg.suggested_questions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                      <p className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>సంబంధిత ప్రశ్నలు (క్లిక్ చేయండి):</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggested_questions.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSendMessage(q)}
                            className="text-left text-xs bg-stone-100 hover:bg-emerald-100/80 text-stone-800 hover:text-emerald-950 font-medium px-2.5 py-1.5 rounded-lg border border-stone-200 transition"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0 mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Animation */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <div className="bg-white border border-stone-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-stone-600">
                  సారథి ఆలోచిస్తోంది & పథకాల వివరాలు సేకరిస్తోంది...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Live Audio Listening Feedback Banner */}
        {isListening && (
          <div className="bg-amber-500/15 border-t border-b border-amber-300/40 px-4 py-2.5 flex items-center justify-between text-amber-950 text-xs sm:text-sm animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <span className="font-bold">వింటున్నాను... మీరు తెలుగులో మాట్లాడవచ్చు</span>
            </div>
            <button
              onClick={stopListening}
              className="px-2.5 py-1 rounded bg-amber-600 text-white font-bold text-xs"
            >
              పూర్తయింది
            </button>
          </div>
        )}

        {/* Chat Input & Controls Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 space-y-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Large Animated Microphone Button */}
            <button
              type="button"
              onClick={handleVoiceInputClick}
              className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-md relative cursor-pointer ${
                isListening
                  ? 'bg-red-600 text-white scale-105 ring-4 ring-red-300 animate-pulse'
                  : 'bg-gradient-to-tr from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:scale-105 active:scale-95'
              }`}
              title={isListening ? 'రికార్డింగ్ ఆపు' : 'తెలుగులో మాట్లాడటానికి క్లిక్ చేయండి'}
              aria-label="Microphone Voice Input"
            >
              {isListening ? (
                <MicOff className="w-6 h-6 animate-spin" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="తెలుగులో లేదా ఇంగ్లీషులో ప్రశ్నను టైప్ చేయండి..."
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900 text-sm sm:text-base font-medium placeholder:text-stone-600"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-bold text-sm sm:text-base flex items-center gap-1.5 transition shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              <span>పంపు</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Assistant Bottom Quick Guidance */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-600 px-1">
            <span className="flex items-center gap-1">
              💡 <strong>చిట్కా:</strong> మైక్రోఫోన్ నొక్కి "నాకు రైతు పథకాలు చెప్పండి" అని పలకండి.
            </span>
            <button
              onClick={onOpenEligibility}
              className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>అర్హత ప్రశ్నావళి ఓపెన్ చేయండి</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
