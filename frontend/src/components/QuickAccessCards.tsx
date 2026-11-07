import React from 'react';
import { 
  Tractor, 
  GraduationCap, 
  HeartHandshake, 
  Activity, 
  Home, 
  Briefcase, 
  Coins, 
  Wrench, 
  ArrowRight,
  Volume2
} from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import { Category } from '../types';

interface QuickAccessCardsProps {
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
}

export const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({ categories, onSelectCategory }) => {
  const { handleAccessibleAction, speakTelugu } = useVoice();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tractor': return <Tractor className="w-7 h-7 text-emerald-700" />;
      case 'GraduationCap': return <GraduationCap className="w-7 h-7 text-blue-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-7 h-7 text-rose-700" />;
      case 'Activity': return <Activity className="w-7 h-7 text-red-600" />;
      case 'Home': return <Home className="w-7 h-7 text-amber-700" />;
      case 'Briefcase': return <Briefcase className="w-7 h-7 text-indigo-700" />;
      case 'Coins': return <Coins className="w-7 h-7 text-emerald-600" />;
      case 'Wrench': return <Wrench className="w-7 h-7 text-teal-700" />;
      default: return <Tractor className="w-7 h-7 text-emerald-700" />;
    }
  };

  const getBgStyle = (index: number) => {
    const accents = [
      'border-emerald-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40',
      'border-blue-200 hover:border-blue-500 bg-white hover:bg-blue-50/40',
      'border-rose-200 hover:border-rose-500 bg-white hover:bg-rose-50/40',
      'border-red-200 hover:border-red-500 bg-white hover:bg-red-50/40',
      'border-amber-200 hover:border-amber-500 bg-white hover:bg-amber-50/40',
      'border-indigo-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40',
      'border-teal-200 hover:border-teal-500 bg-white hover:bg-teal-50/40',
      'border-stone-300 hover:border-stone-500 bg-white hover:bg-stone-50/50',
    ];
    return accents[index % accents.length];
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          సంక్షేమ విభాగాలు • Quick Categories
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          ప్రభుత్వ పథకాల ముఖ్య విభాగాలు
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          మీకు సరిపోయే విభాగాన్ని ఎంచుకోండి. పథకాల వివరాలు, అర్హతలు మరియు దరఖాస్తు విధానాన్ని తెలుసుకోండి.
        </p>
      </div>

      {/* 8 Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat, idx) => {
          const voiceKey = `cat_${cat.slug}`;
          return (
            <div
              key={cat.id}
              onClick={() => handleAccessibleAction(voiceKey, () => onSelectCategory(cat.slug))}
              className={`group relative p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between ${getBgStyle(idx)}`}
            >
              <div>
                {/* Header with Icon and Scheme Count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-13 h-13 rounded-xl bg-stone-50 p-2.5 border border-stone-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {cat.scheme_count} పథకాలు
                  </span>
                </div>

                {/* Telugu & English Headings */}
                <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-900 transition-colors">
                  {cat.name_te}
                </h3>
                <p className="text-xs font-bold text-stone-500 mb-2">
                  {cat.name_en}
                </p>

                {/* Short Telugu Description */}
                <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {cat.description_te}
                </p>
              </div>

              {/* Bottom Explore Row with Voice Guidance Icon */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>అన్వేషించండి</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakTelugu(`${cat.name_te}. ${cat.description_te}`);
                  }}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-emerald-800 transition"
                  title="ఈ వర్గం వివరాలను వాయిస్‌లో వినండి"
                  aria-label={`${cat.name_te} వాయిస్ వివరణ`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
