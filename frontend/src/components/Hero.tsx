import React from 'react';
import { Mic, Search, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, UserCheck } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

interface HeroProps {
  onStartVoice: () => void;
  onExploreSchemes: () => void;
  onCheckEligibility: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartVoice, onExploreSchemes, onCheckEligibility }) => {
  const { handleAccessibleAction } = useVoice();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white pt-8 pb-16 px-4 sm:px-8 border-b border-emerald-800">
      {/* Decorative Rural Backdrop Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Subtle Warm Sunrise Ambient Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Telugu Typography & Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>తెలుగు వాయిస్ & AI సంక్షేమ పథకాల వేదిక</span>
            </div>

            {/* Main Telugu Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              ప్రభుత్వ పథకాలు ఇక మీకు <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200">
                మరింత సులభం!
              </span>
            </h1>

            {/* English Subhead */}
            <p className="text-amber-200/90 font-medium text-sm sm:text-base">
              Government welfare schemes are now easier to discover, understand, and apply.
            </p>

            {/* Supporting Telugu Explanation */}
            <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed max-w-2xl">
              మీకు అర్హత ఉన్న ప్రభుత్వ పథకాలను తెలుసుకోండి. తెలుగులో మాట్లాడండి, మీ సందేహాలకు తక్షణ సమాధానాలు పొందండి. ఏ డాక్యుమెంట్లు కావాలో, ఎలా దరఖాస్తు చేసుకోవాలో సులభంగా అర్థం చేసుకోండి.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Primary Voice CTA */}
              <button
                onClick={() => handleAccessibleAction('hero_voice_start', onStartVoice)}
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-amber-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-amber-300/40"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-slate-950" />
                </div>
                <span>మాట్లాడటం ప్రారంభించండి</span>
              </button>

              {/* Secondary Explore CTA */}
              <button
                onClick={() => handleAccessibleAction('hero_explore', onExploreSchemes)}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-emerald-800/90 hover:bg-emerald-700/90 text-white font-bold text-base border border-emerald-600/50 hover:border-emerald-500 transition shadow-md"
              >
                <Search className="w-5 h-5 text-emerald-300" />
                <span>పథకాలను అన్వేషించండి</span>
              </button>

              {/* Tertiary Quick Eligibility CTA */}
              <button
                onClick={() => handleAccessibleAction('hero_eligibility', onCheckEligibility)}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-teal-800/50 hover:bg-teal-700/60 text-emerald-200 font-bold text-base border border-teal-500/30 transition"
              >
                <UserCheck className="w-5 h-5 text-amber-300" />
                <span>నా అర్హత తనిఖీ</span>
              </button>
            </div>

            {/* Trust Assurance Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-800/80">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>100% అధికారిక సమాచారం</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>పూర్తిగా ఉచిత సేవ</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>తెలుగు వాయిస్ సమాధానాలు</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Sarathi Visual Card with Interactive Voice Simulator */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-emerald-800/80 to-emerald-950/90 border border-emerald-600/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-4 border-b border-emerald-700/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
                      సా
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-950 rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-base">సారథి AI సహాయకుడు</h2>
                    <p className="text-emerald-300 text-xs">మీ డిజిటల్ ప్రభుత్వ మిత్రుడు</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-700/60 text-amber-300 border border-emerald-500/40 text-[11px] font-semibold">
                  ఆన్‌లైన్
                </span>
              </div>

              {/* Simulated Dialogue Preview */}
              <div className="space-y-3 py-4 text-xs sm:text-sm">
                {/* User Voice Bubble */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-amber-500/20 border border-amber-400/40 text-amber-100 px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-[85%]">
                    <p className="font-medium">"నేను రైతును. నాకు రైతులకు సంబంధించిన ప్రభుత్వ పథకాలు చెప్పండి."</p>
                    <span className="text-[10px] text-amber-300/80 block mt-1 flex items-center gap-1">
                      <Mic className="w-2.5 h-2.5" /> వాయిస్ సందేశం
                    </span>
                  </div>
                </div>

                {/* AI Sarathi Response Bubble */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 text-xs font-bold flex-shrink-0 mt-1">
                    AI
                  </div>
                  <div className="bg-emerald-900/90 border border-emerald-600/50 text-emerald-100 p-3.5 rounded-2xl rounded-tl-none space-y-2">
                    <p className="font-semibold text-amber-300">
                      నమస్కారం! రైతు సోదరులకు ముఖ్యంగా 3 పెద్ద పథకాలు అందుబాటులో ఉన్నాయి:
                    </p>
                    <ul className="space-y-1.5 text-xs text-emerald-200">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <strong>PM-KISAN:</strong> సంవత్సరానికి ₹6,000 పెట్టుబడి సాయం
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <strong>పీఎం ఫసల్ బీమా:</strong> అతి తక్కువ ప్రీమియంతో పంట రక్షణ
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <strong>పీఎం కుసుమ్:</strong> 60% సబ్సిడీతో సోలార్ వ్యవసాయ పంపులు
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Mic Trigger inside Card */}
              <div className="pt-2">
                <button
                  onClick={() => handleAccessibleAction('hero_voice_start', onStartVoice)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm border border-emerald-500/40 transition group"
                >
                  <Mic className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>సారథితో ఇప్పుడే మాట్లాడండి</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
