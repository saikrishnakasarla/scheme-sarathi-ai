import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  FileCheck2, 
  HelpCircle, 
  ShieldCheck, 
  PhoneCall, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { fetchSchemeDetail } from '../services/api';
import { SchemeDetail } from '../types';
import { useVoice } from '../context/VoiceContext';

interface SchemeDetailModalProps {
  slug: string | null;
  onClose: () => void;
  onCheckEligibilityForScheme: (schemeId: number) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({ 
  slug, 
  onClose, 
  onCheckEligibilityForScheme 
}) => {
  const { speakTelugu, stopSpeaking, handleAccessibleAction } = useVoice();
  const [scheme, setScheme] = useState<SchemeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchSchemeDetail(slug)
        .then((data) => {
          setScheme(data);
          setCheckedDocs({});
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setScheme(null);
    }
  }, [slug]);

  if (!slug) return null;

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleListenSchemeVoice = () => {
    if (!scheme) return;
    const narration = (
      `${scheme.name_te}. ` +
      `ఈ పథకం ఉద్దేశం: ${scheme.purpose_te}. ` +
      `లభించే ప్రయోజనం: ${scheme.financial_amount || scheme.benefits_te}. ` +
      `ముఖ్యమైన అర్హత: ${(scheme.eligibility_criteria_te || [])[0] || 'వివరాలు పరిశీలించండి'}. ` +
      `దరఖాస్తు విధానం: ${scheme.application_mode}. ` +
      `అధికారిక వెబ్‌సైట్: ${scheme.portal_name}. హెల్ప్‌లైన్ నంబర్: ${scheme.helpline_number || '1902'}.`
    );
    handleAccessibleAction('action_listen_voice', () => speakTelugu(narration));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-emerald-900/20">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-5 sm:p-6 flex items-start justify-between border-b border-emerald-800">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-amber-300 border border-emerald-500/50">
                {scheme?.category_name_te || 'ప్రభుత్వ సంక్షేమ పథకం'}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                {scheme?.level}
              </span>
              {scheme?.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-emerald-800/80 px-2 py-0.5 rounded border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>ధృవీకరించబడింది</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {scheme?.name_te}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
              {scheme?.name_en}
            </p>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-stone-50/50">
          {loading || !scheme ? (
            <div className="py-20 text-center text-stone-500 font-bold">
              పథకం వివరాలను లోడ్ చేస్తున్నాము...
            </div>
          ) : (
            <>
              {/* Financial & Benefits Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-emerald-600/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    లభించే మొత్తం & సహాయం
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950">
                    {scheme.financial_amount || scheme.benefits_te}
                  </div>
                  <p className="text-xs text-stone-600">
                    {scheme.benefits_te}
                  </p>
                </div>

                <button
                  onClick={handleListenSchemeVoice}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md transition flex-shrink-0"
                >
                  <Volume2 className="w-5 h-5 text-slate-950" />
                  <span>వాయిస్‌లో వినండి</span>
                </button>
              </div>

              {/* Purpose & Target Beneficiaries */}
              <div className="space-y-3">
                <h4 className="text-base font-black text-stone-900 border-l-4 border-emerald-700 pl-3">
                  పథకం ముఖ్య ఉద్దేశం (Main Purpose)
                </h4>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                  {scheme.purpose_te}
                </p>
              </div>

              {/* Eligibility & Exclusions Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Eligible Column */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-black text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>ఎవరు అర్హులు? (Eligibility Criteria)</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                    {scheme.eligibility_criteria_te.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions Column */}
                <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-black text-rose-900 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>ఎవరు అనర్హులు? (Exclusions)</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                    {scheme.exclusions_te.length > 0 ? (
                      scheme.exclusions_te.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
                          <span>{pt}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-stone-500 text-xs">ప్రత్యేక మినహాయింపులు లేవు. అర్హత నిబంధనలు వర్తిస్తాయి.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Interactive Required Documents Checklist */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-800" />
                    <span>అవసరమైన పత్రాల చెక్‌లిస్ట్ (Required Documents)</span>
                  </h4>
                  <span className="text-xs text-stone-500">
                    మీ వద్ద ఉన్న పత్రాలను టిక్ చేసుకోండి
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {scheme.required_documents.map((doc, idx) => {
                    const isChecked = !!checkedDocs[doc.name_te];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDoc(doc.name_te)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 select-none ${
                          isChecked
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-stone-200 hover:border-emerald-300 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 accent-emerald-700 rounded cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <div className="text-xs sm:text-sm font-bold">
                            {doc.name_te}
                          </div>
                          {doc.details_te && (
                            <p className="text-[11px] text-stone-500 font-normal">
                              {doc.details_te}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Procedure (How to Apply) */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4">
                <h4 className="text-base font-black text-stone-900 border-l-4 border-amber-500 pl-3">
                  దరఖాస్తు విధానం (Step-by-Step Procedure)
                </h4>
                <div className="space-y-3">
                  {scheme.application_procedure_te.map((stepText, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800">
                      <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </div>
                      <p className="leading-relaxed font-medium">
                        {stepText.replace(/^[0-9]\.\s*/, '')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                  <span>
                    <strong>దరఖాస్తు మాధ్యమం:</strong> {scheme.application_mode}
                  </span>
                  <span>గ్రామ సచివాలయం / మీసేవ</span>
                </div>
              </div>

              {/* FAQs Accordion */}
              {scheme.faqs && scheme.faqs.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-800" />
                    <span>తరచుగా అడిగే ప్రశ్నలు (Frequently Asked Questions)</span>
                  </h4>
                  <div className="space-y-2.5">
                    {scheme.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                        <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-start gap-2">
                          <span className="text-amber-600 font-black">ప్ర:</span>
                          <span>{faq.q_te}</span>
                        </div>
                        <div className="text-xs sm:text-sm text-stone-700 pl-5">
                          {faq.a_te}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Source & Verification Notice */}
              <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 font-bold text-stone-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>అధికారిక మూలం: {scheme.verification_source}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-500">
                    <span>చివరిగా ధృవీకరించిన తేదీ: {scheme.last_verified_date}</span>
                    {scheme.helpline_number && (
                      <span className="flex items-center gap-1 text-emerald-800 font-bold">
                        <PhoneCall className="w-3 h-3" /> హెల్ప్‌లైన్: {scheme.helpline_number}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={scheme.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>అధికారిక పోర్టల్ సందర్శించండి</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="bg-white p-4 sm:p-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              if (scheme) onCheckEligibilityForScheme(scheme.id);
              onClose();
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md transition"
          >
            <span>ఈ పథకానికి నా అర్హతను తనిఖీ చేయండి</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="px-5 py-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm"
          >
            మూసివేయి (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
