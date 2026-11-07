import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Eye, SunMoon, Languages, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAssistant }) => {
  const { isSpeaking, isListening, voiceGuidanceEnabled, toggleVoiceGuidance, handleAccessibleAction } = useVoice();
  const { increaseFontSize, decreaseFontSize, resetFontSize, highContrast, toggleHighContrast, ruralMode, toggleRuralMode } = useAccessibility();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav_home'), voiceKey: 'nav_home' },
    { id: 'schemes', label: t('nav_explore'), voiceKey: 'nav_explore' },
    { id: 'assistant', label: t('nav_assistant'), voiceKey: 'nav_assistant' },
    { id: 'eligibility', label: t('nav_eligibility'), voiceKey: 'nav_eligibility' },
    { id: 'documents', label: t('nav_documents'), voiceKey: 'nav_documents' },
    { id: 'admin', label: t('nav_admin'), voiceKey: 'nav_admin' },
  ];

  const handleNavClick = (id: string, voiceKey: string) => {
    handleAccessibleAction(voiceKey, () => {
      setActiveTab(id);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm transition-colors">
      {/* Top Accessibility & Language Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1 font-medium bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] text-amber-300">
              <ShieldCheck className="w-3 h-3" /> ఆంధ్రప్రదేశ్ కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ (CSP)
            </span>
            <span className="hidden md:inline text-emerald-300">• హెల్ప్‌లైన్: 1902</span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Font Size Scaling */}
            <div className="flex items-center space-x-1 bg-emerald-800/60 rounded px-1.5 py-0.5" title="అక్షరాల పరిమాణం">
              <button
                onClick={() => handleAccessibleAction('action_font_decrease', decreaseFontSize)}
                className="px-1.5 py-0.5 hover:text-white font-bold text-xs"
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => handleAccessibleAction('action_font_increase', resetFontSize)}
                className="px-1.5 py-0.5 hover:text-white font-bold text-xs"
                aria-label="Default Font Size"
              >
                A
              </button>
              <button
                onClick={() => handleAccessibleAction('action_font_increase', increaseFontSize)}
                className="px-1.5 py-0.5 hover:text-white font-bold text-xs"
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => handleAccessibleAction('action_high_contrast', toggleHighContrast)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition ${highContrast ? 'bg-amber-400 text-slate-950 font-semibold' : 'hover:bg-emerald-800 text-emerald-200'}`}
              title="హై కాంట్రాస్ట్ మోడ్"
            >
              <SunMoon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">కాంట్రాస్ట్</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-800/60 rounded px-1.5 py-0.5">
              <Languages className="w-3.5 h-3.5 text-emerald-300" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-emerald-100 text-xs focus:outline-none cursor-pointer"
              >
                <option value="te" className="text-slate-900 bg-white">తెలుగు (Telugu)</option>
                <option value="en" className="text-slate-900 bg-white">English</option>
                <option value="hi" className="text-slate-900 bg-white">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home', 'nav_home')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 100" className="w-7 h-7 text-amber-300 fill-current">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#f59e0b" strokeWidth="4"/>
              <circle cx="50" cy="50" r="14" fill="#fdfbf7"/>
              <path d="M50 18 C65 24 75 38 70 50 C58 50 50 35 50 18 Z" fill="#34d399"/>
              <path d="M50 18 C35 24 25 38 30 50 C42 50 50 35 50 18 Z" fill="#10b981"/>
              <path d="M50 50 L50 82" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                {t('app_name')}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                AI SARATHI
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-600 font-medium">
              గ్రామీణ వికాస ప్రభుత్వ పథకాల సహాయ వేదిక
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.voiceKey)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20'
                    : 'text-stone-700 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-2.5">
          {/* Rural Mode Toggle */}
          <button
            onClick={() => handleAccessibleAction(ruralMode ? 'action_rural_mode_off' : 'action_rural_mode_on', toggleRuralMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              ruralMode
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="గ్రామీణ పౌరుల కోసం సులభమైన మోడ్"
          >
            <span className="text-sm">🌾</span>
            <span>{ruralMode ? 'గ్రామీణ మోడ్ ఆన్' : 'గ్రామీణ మోడ్'}</span>
          </button>

          {/* Voice Guidance Toggle */}
          <button
            onClick={toggleVoiceGuidance}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              voiceGuidanceEnabled
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
            }`}
            title={voiceGuidanceEnabled ? 'వాయిస్ మార్గదర్శనం ఆన్ చేయబడింది' : 'వాయిస్ మార్గదర్శనం మ్యూట్'}
          >
            {voiceGuidanceEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>వాయిస్ గైడ్</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span>వాయిస్ ఆఫ్</span>
              </>
            )}
          </button>

          {/* Live Voice Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isListening
                ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
                : isSpeaking
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-stone-50 text-stone-600 border-stone-200'
            }`}
          >
            {isListening ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>వింటున్నాను...</span>
              </>
            ) : isSpeaking ? (
              <>
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-1 bg-emerald-600 h-full voice-wave-bar"></span>
                  <span className="w-1 bg-emerald-600 h-2/3 voice-wave-bar"></span>
                  <span className="w-1 bg-emerald-600 h-4/5 voice-wave-bar"></span>
                </div>
                <span>మాట్లాడుతోంది</span>
              </>
            ) : (
              <>
                <Mic className="w-3 h-3 text-emerald-700" />
                <span>సిద్ధంగా ఉంది</span>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-2 shadow-lg">
          <div className="flex flex-wrap gap-2 pb-3 border-b border-stone-100">
            <button
              onClick={() => handleAccessibleAction(ruralMode ? 'action_rural_mode_off' : 'action_rural_mode_on', toggleRuralMode)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold border ${
                ruralMode ? 'bg-amber-500 text-slate-950 border-amber-600' : 'bg-stone-100 text-stone-800 border-stone-200'
              }`}
            >
              <span>🌾</span>
              <span>{ruralMode ? 'గ్రామీణ మోడ్ ఆన్' : 'గ్రామీణ మోడ్'}</span>
            </button>
            <button
              onClick={toggleVoiceGuidance}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold border ${
                voiceGuidanceEnabled ? 'bg-emerald-800 text-white border-emerald-900' : 'bg-stone-100 text-stone-700'
              }`}
            >
              {voiceGuidanceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{voiceGuidanceEnabled ? 'వాయిస్ సహాయం ఆన్' : 'వాయిస్ ఆఫ్'}</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.voiceKey)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${
                activeTab === item.id ? 'bg-emerald-800 text-white' : 'text-stone-800 hover:bg-emerald-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
