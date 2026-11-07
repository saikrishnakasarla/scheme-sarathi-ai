import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Heart, Star, Send } from 'lucide-react';
import { submitFeedback } from '../services/api';
import { useVoice } from '../context/VoiceContext';

export const Footer: React.FC = () => {
  const { speakTelugu } = useVoice();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFeedback({
        rating,
        comment,
        voice_used: 'yes'
      });
      setSubmitted(true);
      speakTelugu('ధన్యవాదాలు! మీ అమూల్యమైన అభిప్రాయం విజయవంతంగా నమోదైంది.');
    } catch (err) {
      alert('ఫీడ్‌బ్యాక్ సమర్పించడంలో సమస్య ఏర్పడింది.');
    }
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-12 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Academic CSP Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                సా
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  స్కీమ్ సారథి (Scheme Sarathi)
                </h3>
                <p className="text-xs text-amber-300 font-semibold">
                  కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ (CSP)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              గ్రామీణ పౌరులు మరియు చదువుకోలేని వ్యక్తులు తమకు అర్హత ఉన్న ప్రభుత్వ సంక్షేమ పథకాలను తెలుగు వాయిస్ సహాయంతో సులభంగా తెలుసుకోవడానికి ఈ అప్లికేషన్ అభివృద్ధి చేయబడింది.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-900/60 border border-emerald-800 text-xs text-emerald-300 leading-relaxed">
              <strong className="text-amber-300">అకడమిక్ డిస్క్లైమర్:</strong> ఇది గ్రామీణ సాధికారత కోసం రూపొందించిన సామాజిక ప్రాజెక్ట్. పథకాల దరఖాస్తులను ఎల్లప్పుడూ అధికారిక ప్రభుత్వ పోర్టల్స్ లేదా గ్రామ సచివాలయాల ద్వారా మాత్రమే ధృవీకరించుకోవాలి.
            </div>
          </div>

          {/* Col 2: Government Helpline Numbers */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              అత్యవసర ప్రజా హెల్ప్‌లైన్లు
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-900/40 border border-emerald-800/60">
                <span>స్పందన / సీఎం హెల్ప్‌లైన్</span>
                <span className="font-bold text-amber-300">1902</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-900/40 border border-emerald-800/60">
                <span>ఆరోగ్యశ్రీ / 104 సేవలు</span>
                <span className="font-bold text-amber-300">104</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-900/40 border border-emerald-800/60">
                <span>ఆయుష్మాన్ భారత్ హెల్ప్‌లైన్</span>
                <span className="font-bold text-amber-300">14555</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-900/40 border border-emerald-800/60">
                <span>పీఎం కిసాన్ టోల్ ఫ్రీ</span>
                <span className="font-bold text-amber-300">155261</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-900/40 border border-emerald-800/60">
                <span>ఉపాధి హామీ ఫిర్యాదులు</span>
                <span className="font-bold text-amber-300">1800-111-555</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Feedback Form */}
          <div className="md:col-span-4 space-y-3 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/80">
            <h4 className="text-sm font-black text-amber-300">
              మీ విలువైన అభిప్రాయం (Feedback)
            </h4>

            {submitted ? (
              <div className="p-4 bg-emerald-900/80 rounded-xl text-center space-y-2 text-xs">
                <div className="text-amber-300 font-bold text-sm">ధన్యవాదాలు!</div>
                <p className="text-emerald-200">మీ స్పందన నమోదైంది. గ్రామీణ సేవలను మెరుగుపరచడానికి మీ సూచనలు తోడ్పడతాయి.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-emerald-200 font-semibold">రేటింగ్:</span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-1 rounded ${rating >= s ? 'text-amber-400' : 'text-emerald-800'}`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="ఈ అసిస్టెంట్ మీకు ఉపయోగపడిందా? మీ సూచనలు రాయండి..."
                  className="w-full p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-white placeholder:text-emerald-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />

                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>అభిప్రాయాన్ని పంపండి</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright and Verification Bar */}
        <div className="pt-6 border-t border-emerald-900 text-center text-xs text-emerald-400/80 space-y-1">
          <p>© 2026 స్కీమ్ సారథి (Scheme Sarathi) – Community Service Project (CSP).</p>
          <p>ఆంధ్రప్రదేశ్ & కేంద్ర ప్రభుత్వ అధికారిక మార్గదర్శకాల ఆధారంగా అభివృద్ధి చేయబడింది.</p>
        </div>

      </div>
    </footer>
  );
};
