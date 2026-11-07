import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'te' | 'en' | 'hi';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  te: {
    app_name: 'స్కీమ్ సారథి',
    app_tagline: 'గ్రామీణ వికాస పథక సహాయ వేదిక',
    nav_home: 'ముఖ్యాంశాలు',
    nav_explore: 'పథకాలు',
    nav_assistant: 'సారథి AI',
    nav_eligibility: 'అర్హత పరీక్ష',
    nav_documents: 'పత్రాల గైడ్',
    nav_about: 'మా గురించి',
    nav_admin: 'అడ్మిన్',
    voice_guidance: 'వాయిస్ సహాయం',
    rural_mode: 'గ్రామీణ మోడ్',
    high_contrast: 'హై కాంట్రాస్ట్',
    search_placeholder: 'పథకం పేరు లేదా వర్గం శోధించండి...',
    all_categories: 'అన్ని వర్గాలు',
    all_levels: 'కేంద్ర & రాష్ట్ర పథకాలు',
    verified_badge: 'ప్రభుత్వ ధృవీకృతం',
    check_eligibility_btn: 'అర్హతను తనిఖీ చేయండి',
    view_details_btn: 'పూర్తి వివరాలు',
    official_portal_btn: 'అధికారిక వెబ్‌సైట్',
    listen_voice_btn: 'వాయిస్‌లో వినండి',
  },
  en: {
    app_name: 'Scheme Sarathi',
    app_tagline: 'Empowering Rural Communities Through Government Schemes',
    nav_home: 'Home',
    nav_explore: 'Explore Schemes',
    nav_assistant: 'Sarathi AI',
    nav_eligibility: 'Eligibility Checker',
    nav_documents: 'Document Guidance',
    nav_about: 'About Project',
    nav_admin: 'Admin',
    voice_guidance: 'Voice Guidance',
    rural_mode: 'Rural Mode',
    high_contrast: 'High Contrast',
    search_placeholder: 'Search scheme name or category...',
    all_categories: 'All Categories',
    all_levels: 'Central & State Schemes',
    verified_badge: 'Verified Official',
    check_eligibility_btn: 'Check Eligibility',
    view_details_btn: 'View Details',
    official_portal_btn: 'Official Portal',
    listen_voice_btn: 'Listen in Audio',
  },
  hi: {
    app_name: 'स्कीम सारथी',
    app_tagline: 'ग्रामीण समुदाय कल्याण एवं सरकारी योजना सहायक',
    nav_home: 'होम',
    nav_explore: 'योजनाएं',
    nav_assistant: 'सारथी एआई',
    nav_eligibility: 'पात्रता जांच',
    nav_documents: 'दस्तावेज़ गाइड',
    nav_about: 'हमारे बारे में',
    nav_admin: 'व्यवस्थापक',
    voice_guidance: 'ध्वनि सहायता',
    rural_mode: 'ग्रामीण मोड',
    high_contrast: 'उच्च कंट्रास्ट',
    search_placeholder: 'योजना का नाम या श्रेणी खोजें...',
    all_categories: 'सभी श्रेणियां',
    all_levels: 'केंद्रीय और राज्य योजनाएं',
    verified_badge: 'सत्यापित योजना',
    check_eligibility_btn: 'पात्रता जांचें',
    view_details_btn: 'पूरा विवरण',
    official_portal_btn: 'आधिकारिक पोर्टल',
    listen_voice_btn: 'आवाज में सुनें',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('te');

  useEffect(() => {
    const saved = localStorage.getItem('scheme_sarathi_lang') as SupportedLanguage;
    if (saved && ['te', 'en', 'hi'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('scheme_sarathi_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['te'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
