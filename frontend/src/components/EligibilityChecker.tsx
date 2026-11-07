import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useVoice } from '../context/VoiceContext';
import { checkEligibility } from '../services/api';
import { ProfileCheckRequest, RecommendationResponse, SchemeMatchResult } from '../types';

interface EligibilityCheckerProps {
  onOpenSchemeModal: (slug: string) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ onOpenSchemeModal }) => {
  const { speakTelugu, handleAccessibleAction } = useVoice();

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ProfileCheckRequest>({
    state: 'Andhra Pradesh',
    district: 'విశాఖపట్నం',
    occupation: 'farmer',
    annual_income: 120000,
    age: 38,
    gender: 'male',
    land_acres: 3.5,
    is_student: false,
    has_disability: false,
    has_ration_card: true,
    ration_card_type: 'White (BPL)'
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResponse | null>(null);

  // Questions spoken aloud when reaching a step
  const STEP_QUESTIONS: Record<number, string> = {
    1: 'మొదటి ప్రశ్న: మీరు ఏ రాష్ట్రం మరియు జిల్లాలో నివసిస్తున్నారు?',
    2: 'రెండవ ప్రశ్న: మీ ప్రధాన వృత్తి లేదా జీవనోపాధి ఏమిటి?',
    3: 'మూడవ ప్రశ్న: మీ కుటుంబ వార్షిక ఆదాయం ఎంత మరియు మీకు రేషన్ కార్డు ఉందా?',
    4: 'నాల్గవ ప్రశ్న: మీ వయస్సు మరియు లింగం ఏమిటి?',
    5: 'ఐదవ ప్రశ్న: మీకు సొంత సాగుభూమి ఎంత ఉంది మరియు విద్యార్థినా?'
  };

  const handleNextStep = () => {
    const next = step + 1;
    setStep(next);
    if (STEP_QUESTIONS[next]) {
      speakTelugu(STEP_QUESTIONS[next]);
    }
  };

  const handlePrevStep = () => {
    const prev = step - 1;
    setStep(prev);
    if (STEP_QUESTIONS[prev]) {
      speakTelugu(STEP_QUESTIONS[prev]);
    }
  };

  const handleSubmitEvaluation = async () => {
    setLoading(true);
    speakTelugu('మీ వివరాల ఆధారంగా అన్ని ప్రభుత్వ సంక్షేమ పథకాలను విశ్లేషిస్తున్నాను...');
    try {
      const data = await checkEligibility(profile);
      setResults(data);
      if (data.eligible_count > 0) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      speakTelugu(data.voice_narration_te);
    } catch (err) {
      alert('విశ్లేషణలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setStep(1);
    speakTelugu('అర్హత ప్రశ్నావళి రీసెట్ చేయబడింది.');
  };

  return (
    <section id="eligibility-section" className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
          అర్హత విశ్లేషణ • Smart Eligibility Engine
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          మీకు సరిపోయే ప్రభుత్వ పథకాలను తెలుసుకోండి
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          5 సులభమైన ప్రశ్నలకు సమాధానం ఇవ్వండి. మీరు ఏ పథకాలకు అర్హులో తక్షణమే తెలుసుకోండి.
        </p>
      </div>

      {!results ? (
        /* Questionnaire Wizard Box */
        <div className="bg-white border-2 border-emerald-900/15 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Step Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-2">
              <span>దశ {step} / 5</span>
              <span>{Math.round((step / 5) * 100)}% పూర్తయింది</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: State & District */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    మీరు ఏ రాష్ట్రం మరియు జిల్లాలో నివసిస్తున్నారు?
                  </h3>
                  <p className="text-xs text-stone-500">State and District of Residence</p>
                </div>
                <button
                  onClick={() => speakTelugu(STEP_QUESTIONS[1])}
                  className="p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition"
                  title="ప్రశ్నను వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">రాష్ట్రం (State)</label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 font-semibold text-stone-900"
                  >
                    <option value="Andhra Pradesh">ఆంధ్రప్రదేశ్ (Andhra Pradesh)</option>
                    <option value="Telangana">తెలంగాణ (Telangana)</option>
                    <option value="Other">ఇతర రాష్ట్రం (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">జిల్లా (District)</label>
                  <select
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 font-semibold text-stone-900"
                  >
                    <option value="విశాఖపట్నం">విశాఖపట్నం (Visakhapatnam)</option>
                    <option value="గుంటూరు">గుంటూరు (Guntur)</option>
                    <option value="కృష్ణా">కృష్ణా (Krishna)</option>
                    <option value="తూర్పు గోదావరి">తూర్పు గోదావరి (East Godavari)</option>
                    <option value="పశ్చిమ గోదావరి">పశ్చిమ గోదావరి (West Godavari)</option>
                    <option value="కర్నూలు">కర్నూలు (Kurnool)</option>
                    <option value="అనంతపురం">అనంతపురం (Anantapur)</option>
                    <option value="చిత్తూరు">చిత్తూరు (Chittoor)</option>
                    <option value="వైఎస్సార్ కడప">వైఎస్సార్ కడప (YSR Kadapa)</option>
                    <option value="శ్రీకాకుళం">శ్రీకాకుళం (Srikakulam)</option>
                    <option value="విజయనగరం">విజయనగరం (Vizianagaram)</option>
                    <option value="నెల్లూరు">నెల్లూరు (Nellore)</option>
                    <option value="ప్రకాశం">ప్రకాశం (Prakasam)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Occupation */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    మీ ప్రధాన వృత్తి లేదా జీవనోపాధి ఏమిటి?
                  </h3>
                  <p className="text-xs text-stone-500">Your Primary Occupation</p>
                </div>
                <button
                  onClick={() => speakTelugu(STEP_QUESTIONS[2])}
                  className="p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition"
                  title="ప్రశ్నను వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'farmer', label: 'రైతు / వ్యవసాయం', desc: 'Farmer / Cultivator' },
                  { id: 'student', label: 'విద్యార్థి', desc: 'Student (School/College)' },
                  { id: 'women_shg', label: 'మహిళా స్వయం సహాయక సంఘం', desc: 'SHG Member / Housewife' },
                  { id: 'artisan', label: 'చేతివృత్తుల కళాకారుడు', desc: 'Artisan / Vishwakarma' },
                  { id: 'small_business', label: 'చిరు వ్యాపారి / వీధి వ్యాపారి', desc: 'Small Business / Street Vendor' },
                  { id: 'daily_wage', label: 'దినసరి కూలీ / వ్యవసాయ కూలీ', desc: 'Daily Wage Laborer' },
                  { id: 'unemployed', label: 'నిరుద్యోగ యువత', desc: 'Unemployed Youth' },
                ].map((occ) => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => {
                      setProfile({ 
                        ...profile, 
                        occupation: occ.id,
                        is_student: occ.id === 'student' ? true : profile.is_student
                      });
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      profile.occupation === occ.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/30'
                        : 'border-stone-200 hover:border-emerald-300 bg-white text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base">{occ.label}</div>
                    <div className="text-xs text-stone-500">{occ.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Income & Ration Card */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    మీ కుటుంబ వార్షిక ఆదాయం మరియు రేషన్ కార్డు
                  </h3>
                  <p className="text-xs text-stone-500">Annual Family Income and Ration Card</p>
                </div>
                <button
                  onClick={() => speakTelugu(STEP_QUESTIONS[3])}
                  className="p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition"
                  title="ప్రశ్నను వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    కుటుంబ వార్షిక ఆదాయం (రూపాయలలో): ₹{(profile.annual_income || 0).toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="30000"
                    max="600000"
                    step="10000"
                    value={profile.annual_income || 120000}
                    onChange={(e) => setProfile({ ...profile, annual_income: Number(e.target.value) })}
                    className="w-full accent-emerald-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-600 mt-1 font-medium">
                    <span>₹30,000</span>
                    <span>₹1,50,000</span>
                    <span>₹3,00,000</span>
                    <span>₹6,00,000</span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-stone-700 mb-2">రేషన్ కార్డు రకం</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'White (BPL)', label: 'తెల్ల రేషన్ కార్డు / బియ్యం కార్డు (BPL)' },
                      { id: 'Pink', label: 'గులాబీ రేషన్ కార్డు (Non-BPL)' },
                      { id: 'None', label: 'రేషన్ కార్డు లేదు' }
                    ].map((rc) => (
                      <button
                        key={rc.id}
                        type="button"
                        onClick={() => setProfile({ 
                          ...profile, 
                          ration_card_type: rc.id,
                          has_ration_card: rc.id !== 'None'
                        })}
                        className={`p-3.5 rounded-xl border-2 text-center text-xs font-bold transition ${
                          profile.ration_card_type === rc.id
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/30'
                            : 'border-stone-200 hover:border-emerald-300'
                        }`}
                      >
                        {rc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Age & Gender */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    మీ వయస్సు మరియు లింగం వివరాలు
                  </h3>
                  <p className="text-xs text-stone-500">Age and Gender</p>
                </div>
                <button
                  onClick={() => speakTelugu(STEP_QUESTIONS[4])}
                  className="p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition"
                  title="ప్రశ్నను వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">వయస్సు (Age in Years): {profile.age} సం.</label>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={profile.age || 35}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-full accent-emerald-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-600 mt-1 font-medium">
                    <span>15 సం.</span>
                    <span>35 సం.</span>
                    <span>60 సం.</span>
                    <span>85 సం.</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">లింగం (Gender)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'male', label: 'పురుషుడు (Male)' },
                      { id: 'female', label: 'మహిళ (Female)' },
                      { id: 'other', label: 'ఇతర (Other)' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, gender: g.id })}
                        className={`p-3 rounded-xl border-2 text-center text-xs font-bold transition ${
                          profile.gender === g.id
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/30'
                            : 'border-stone-200 hover:border-emerald-300'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Land & Special Conditions */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-900">
                    సాగుభూమి మరియు ప్రత్యేక అర్హతలు
                  </h3>
                  <p className="text-xs text-stone-500">Landholding and Special Criteria</p>
                </div>
                <button
                  onClick={() => speakTelugu(STEP_QUESTIONS[5])}
                  className="p-2 rounded-full hover:bg-emerald-50 text-emerald-800 transition"
                  title="ప్రశ్నను వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    సొంత సాగుభూమి (ఎకరాలలో): {profile.land_acres} ఎకరాలు
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={profile.land_acres || 0}
                    onChange={(e) => setProfile({ ...profile, land_acres: Number(e.target.value) })}
                    className="w-full accent-emerald-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-600 mt-1 font-medium">
                    <span>0 (భూమి లేదు)</span>
                    <span>2.5 ఎకరాలు</span>
                    <span>5 ఎకరాలు</span>
                    <span>15 ఎకరాలు</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={profile.is_student}
                      onChange={(e) => setProfile({ ...profile, is_student: e.target.checked })}
                      className="w-4 h-4 accent-emerald-700 rounded"
                    />
                    <span className="text-xs sm:text-sm font-bold text-stone-800">
                      ప్రస్తుతం పాఠశాల / కాలేజీలో చదువుతున్నాను
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                    <input
                      type="checkbox"
                      checked={profile.has_disability}
                      onChange={(e) => setProfile({ ...profile, has_disability: e.target.checked })}
                      className="w-4 h-4 accent-emerald-700 rounded"
                    />
                    <span className="text-xs sm:text-sm font-bold text-stone-800">
                      దివ్యాంగత్వాన్ని (PwD) కలిగి ఉన్నాను
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Bottom Buttons */}
          <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>వెనుకకు</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition"
              >
                <span>తరువాత</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitEvaluation}
                disabled={loading}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg transition"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{loading ? 'విశ్లేషిస్తున్నాను...' : 'నా అర్హతను పరిశీలించండి'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Evaluation Results View */
        <div className="space-y-6 animate-fadeIn">
          {/* Header Summary Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-amber-300 text-xs font-bold border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>అర్హత ఫలితాలు • Evaluation Summary</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                మీరు <span className="text-amber-300">{results.eligible_count} పథకాలకు</span> ప్రాథమికంగా అర్హులు!
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                {results.summary_te}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => speakTelugu(results.voice_narration_te)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition"
              >
                <Volume2 className="w-4 h-4 text-slate-950" />
                <span>వాయిస్‌లో వినండి</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 text-xs font-bold border border-emerald-600 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>మళ్లీ సరిచూడండి</span>
              </button>
            </div>
          </div>

          {/* Results Grid by Match Status */}
          <div className="space-y-4">
            <h4 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>అర్హత ఉన్న పథకాలు ({results.eligible_count})</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.recommendations
                .filter((r) => r.status === 'eligible')
                .map((res) => (
                  <div
                    key={res.scheme.id}
                    className="bg-white border-2 border-emerald-500/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                            {res.scheme.category_name_te}
                          </span>
                          <h5 className="text-base font-black text-stone-900 mt-1">
                            {res.scheme.name_te}
                          </h5>
                          <p className="text-xs font-semibold text-stone-500">
                            {res.scheme.name_en}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-sm font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full block">
                            {res.score}% సరిపోలిక
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2">
                        {res.scheme.purpose_te}
                      </p>

                      {/* Financial Amount */}
                      {res.scheme.financial_amount && (
                        <div className="mt-2 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          💰 లభించే మొత్తం: {res.scheme.financial_amount}
                        </div>
                      )}

                      {/* Matched Criteria Bullet */}
                      {res.matched_criteria_te.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-100">
                          <p className="text-[11px] font-bold text-emerald-800">
                            ✓ {res.matched_criteria_te[0]}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => onOpenSchemeModal(res.scheme.slug)}
                        className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 transition"
                      >
                        <span>పూర్తి వివరాలు & దరఖాస్తు</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => speakTelugu(res.voice_guidance_te)}
                        className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition"
                        title="వాయిస్ మార్గదర్శనం"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Ineligible / More Info Schemes Accordion */}
            {results.potentially_eligible_count > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h4 className="text-base font-bold text-stone-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>మరిన్ని వివరాలు అవసరమైన పథకాలు ({results.potentially_eligible_count})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.recommendations
                    .filter((r) => r.status === 'needs_more_info')
                    .map((r) => (
                      <div key={r.scheme.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-stone-900">{r.scheme.name_te}</div>
                        <div className="text-stone-500">{r.unmatched_criteria_te[0] || 'మరిన్ని నిబంధనలు సరిచూసుకోవాలి.'}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Official Disclaimer Notice */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>ముఖ్య గమనిక:</strong> {results.disclaimer_te}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
