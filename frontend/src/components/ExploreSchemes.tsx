import React, { useState } from 'react';
import { Search, Filter, Layers, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SchemeSummary, Category } from '../types';
import { SchemeCard } from './SchemeCard';
import { useVoice } from '../context/VoiceContext';

interface ExploreSchemesProps {
  schemes: SchemeSummary[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  onOpenDetails: (slug: string) => void;
  onCheckEligibilityForScheme: (schemeId: number) => void;
}

export const ExploreSchemes: React.FC<ExploreSchemesProps> = ({
  schemes,
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenDetails,
  onCheckEligibilityForScheme,
}) => {
  const { speakTelugu, handleAccessibleAction } = useVoice();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredSchemes = schemes.filter((s) => {
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || s.category_id === categories.find(c => c.slug === selectedCategory)?.id;
    const matchesLevel = selectedLevel === 'all' || s.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesSearch = !searchQuery || 
      s.name_te.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.purpose_te.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <section id="schemes-catalog" className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            పథకాల సమాహారం • Government Schemes Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            కేంద్ర & ఆంధ్రప్రదేశ్ ప్రభుత్వ సంక్షేమ పథకాలు
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            మొత్తం {filteredSchemes.length} ధృవీకరించిన పథకాలు అందుబాటులో ఉన్నాయి
          </p>
        </div>

        {/* Level Filter (Central vs Andhra Pradesh) */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-bold">
          {[
            { id: 'all', label: 'అన్నీ (All)' },
            { id: 'andhra', label: 'ఆంధ్రప్రదేశ్ (AP)' },
            { id: 'central', label: 'కేంద్రం (Central)' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedLevel === lvl.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar & Category Filter Pills */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="పథకం పేరు, వర్గం లేదా ప్రయోజనాన్ని వెతకండి (ఉదా: పీఎం కిసాన్, ఆరోగ్యశ్రీ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold shadow-sm text-stone-900 placeholder:text-stone-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-stone-400 hover:text-stone-700 font-bold"
            >
              క్లియర్
            </button>
          )}
        </div>

        {/* Category Filter Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex-shrink-0 transition ${
              !selectedCategory || selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            అన్ని పథకాలు ({schemes.length})
          </button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.slug;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex-shrink-0 transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{c.name_te}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-950 text-amber-300' : 'bg-stone-100 text-stone-500'}`}>
                  {c.scheme_count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onOpenDetails={onOpenDetails}
              onCheckEligibility={onCheckEligibilityForScheme}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl p-8 space-y-3">
          <p className="text-base font-bold text-stone-700">
            మీ శోధనకు తగిన పథకాలు కనిపించలేదు.
          </p>
          <p className="text-xs text-stone-500">
            దయచేసి ఇతర పదాలతో శోధించండి లేదా అన్ని వర్గాల ఎంపికను ఎంచుకోండి.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
              setSelectedLevel('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
          >
            అన్ని పథకాలను చూపించు
          </button>
        </div>
      )}
    </section>
  );
};
