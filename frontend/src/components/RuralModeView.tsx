import React from 'react';
import { 
  Mic, 
  Volume2, 
  Tractor, 
  GraduationCap, 
  HeartHandshake, 
  Activity, 
  Home, 
  Briefcase, 
  Coins, 
  Wrench,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

interface RuralModeViewProps {
  onOpenAssistant: () => void;
  onSelectCategory: (catSlug: string) => void;
  onOpenEligibility: () => void;
}

export const RuralModeView: React.FC<RuralModeViewProps> = ({
  onOpenAssistant,
  onSelectCategory,
  onOpenEligibility,
}) => {
  const { speakTelugu, isListening, startListening, stopListening, handleAccessibleAction } = useVoice();

  const RURAL_TILES = [
    { id: 'farmers', label: 'రైతు పథకాలు', sub: 'PM-KISAN, పంట బీమా', icon: <Tractor className="w-10 h-10 text-emerald-800" />, voice: 'రైతు పథకాల వివరాలు చూపిస్తున్నాను.' },
    { id: 'health', label: 'ఉచిత వైద్యం', sub: 'ఆరోగ్యశ్రీ, ఆయుష్మాన్ భారత్', icon: <Activity className="w-10 h-10 text-red-600" />, voice: 'ఉచిత వైద్యం మరియు ఆరోగ్యశ్రీ పథకాలు చూపిస్తున్నాను.' },
    { id: 'women', label: 'మహిళా సాయం', sub: 'చేయూత, ఆసరా, గర్భిణీ సాయం', icon: <HeartHandshake className="w-10 h-10 text-rose-700" />, voice: 'మహిళా సంక్షేమ పథకాలు చూపిస్తున్నాను.' },
    { id: 'students', label: 'విద్యార్థుల ఫీజు', sub: 'విద్యా దీవెన, స్కాలర్‌షిప్‌లు', icon: <GraduationCap className="w-10 h-10 text-blue-700" />, voice: 'విద్యార్థుల ఫీజు మరియు స్కాలర్‌షిప్ పథకాలు చూపిస్తున్నాను.' },
    { id: 'housing', label: 'పక్కా ఇల్లు', sub: 'పీఎం ఆవాస్, ఉచిత ఇంటి స్థలం', icon: <Home className="w-10 h-10 text-amber-700" />, voice: 'గృహ నిర్మాణ పథకాలు చూపిస్తున్నాను.' },
    { id: 'employment', label: 'ఉపాధి హామీ', sub: '100 రోజుల పని, కూలీ వేతనం', icon: <Briefcase className="w-10 h-10 text-indigo-700" />, voice: 'ఉపాధి హామీ మరియు పని పథకాలు చూపిస్తున్నాను.' },
    { id: 'loans', label: 'చిరు రుణాలు', sub: 'ముద్రా లోన్, వీధి వ్యాపారం', icon: <Coins className="w-10 h-10 text-emerald-700" />, voice: 'వ్యాపార రుణాలు మరియు ముద్రా లోన్స్ చూపిస్తున్నాను.' },
    { id: 'skills', label: 'నైపుణ్య శిక్షణ', sub: 'ఉచిత కంప్యూటర్, సాంకేతిక పని', icon: <Wrench className="w-10 h-10 text-teal-700" />, voice: 'ఉచిత నైపుణ్య శిక్షణ పథకాలు చూపిస్తున్నాను.' },
  ];

  return (
    <div className="py-6 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-5 rounded-3xl shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-slate-950/20 px-2.5 py-0.5 rounded-full">
            గ్రామీణ సులభ మోడ్ • RURAL EASY MODE
          </span>
          <h2 className="text-2xl font-black mt-1">
            పెద్ద బటన్లు • వాయిస్ సహాయం సిద్ధంగా ఉంది
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-90">
            ఏ బటన్ అయినా తాకితే వివరాలు తెలుగులో వినపడతాయి.
          </p>
        </div>
        <span className="text-4xl hidden sm:inline">🌾</span>
      </div>

      {/* Giant Voice Action Button */}
      <div className="text-center bg-white border-4 border-emerald-700 rounded-3xl p-8 shadow-2xl space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
          నాతో తెలుగులో మాట్లాడండి
        </h3>
        <p className="text-stone-600 text-base max-w-md mx-auto">
          ఈ క్రింది పెద్ద మైక్రోఫోన్ బటన్ నొక్కి మీ ప్రశ్నను తెలుగులో అడగండి.
        </p>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => {
              if (isListening) {
                stopListening();
              } else {
                handleAccessibleAction('hero_voice_start', onOpenAssistant);
              }
            }}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl transition-transform active:scale-95 cursor-pointer ${
              isListening
                ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-300'
                : 'bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:scale-105'
            }`}
          >
            <Mic className="w-12 h-12" />
            <span className="text-xs font-black">
              {isListening ? 'వింటున్నాను' : 'మాట్లాడండి'}
            </span>
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenEligibility}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-lg shadow-md transition"
          >
            నాకు ఏ పథకం వస్తుందో తెలుసుకోండి (అర్హత పరీక్ష)
          </button>
        </div>
      </div>

      {/* Big Touch Target Tiles Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-stone-900 border-l-4 border-emerald-700 pl-3">
          ముఖ్య పథకాలను ఎంచుకోండి:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RURAL_TILES.map((tile) => (
            <button
              key={tile.id}
              onClick={() => {
                speakTelugu(tile.voice);
                onSelectCategory(tile.id);
              }}
              className="p-6 rounded-2xl bg-white border-3 border-stone-200 hover:border-emerald-600 text-left transition shadow-md hover:shadow-xl flex items-center gap-4 cursor-pointer min-h-[90px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                {tile.icon}
              </div>
              <div className="space-y-1">
                <div className="text-xl font-black text-stone-950">
                  {tile.label}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">
                  {tile.sub}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
