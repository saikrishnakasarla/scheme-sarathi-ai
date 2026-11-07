import React from 'react';
import { ArrowRight, Volume2, ShieldCheck, Bookmark, ExternalLink } from 'lucide-react';
import { SchemeSummary } from '../types';
import { useVoice } from '../context/VoiceContext';

interface SchemeCardProps {
  scheme: SchemeSummary;
  onOpenDetails: (slug: string) => void;
  onCheckEligibility?: (schemeId: number) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onOpenDetails, onCheckEligibility }) => {
  const { speakTelugu, handleAccessibleAction } = useVoice();

  return (
    <div className="bg-white border-2 border-stone-200/90 hover:border-emerald-600/70 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
            {scheme.category_name_te || 'సంక్షేమ పథకం'}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
              {scheme.level}
            </span>
            {scheme.verified && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200" title="అధికారికంగా ధృవీకరించబడింది">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span className="hidden sm:inline">ధృవీకృతం</span>
              </span>
            )}
          </div>
        </div>

        {/* Telugu & English Headings */}
        <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-2">
          {scheme.name_te}
        </h3>
        <p className="text-xs font-semibold text-stone-500 mb-2.5">
          {scheme.name_en}
        </p>

        {/* Purpose */}
        <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3">
          {scheme.purpose_te}
        </p>

        {/* Financial Amount Banner */}
        {scheme.financial_amount && (
          <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs font-bold mb-3 flex items-center justify-between">
            <span>లభించే సహాయం:</span>
            <span className="text-amber-800 text-sm">{scheme.financial_amount}</span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
        <button
          onClick={() => handleAccessibleAction('action_view_documents', () => onOpenDetails(scheme.slug))}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition shadow-sm"
        >
          <span>పూర్తి వివరాలు</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => speakTelugu(`${scheme.name_te}. ${scheme.purpose_te}. లభించే సహాయం: ${scheme.financial_amount || scheme.benefits_te}`)}
          className="p-2.5 rounded-xl hover:bg-stone-100 text-stone-600 hover:text-emerald-800 border border-stone-200 transition"
          title="వాయిస్‌లో వినండి"
          aria-label={`${scheme.name_te} వాయిస్ వివరణ`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
