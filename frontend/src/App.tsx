import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickAccessCards } from './components/QuickAccessCards';
import { AIAssistant } from './components/AIAssistant';
import { EligibilityChecker } from './components/EligibilityChecker';
import { ExploreSchemes } from './components/ExploreSchemes';
import { DocumentGuidance } from './components/DocumentGuidance';
import { RuralModeView } from './components/RuralModeView';
import { AdminDashboard } from './components/AdminDashboard';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { VoiceFeedbackBar } from './components/VoiceFeedbackBar';
import { Footer } from './components/Footer';

import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { VoiceProvider, useVoice } from './context/VoiceContext';

import { fetchCategories, fetchSchemes } from './services/api';
import { Category, SchemeSummary } from './types';

const MainContent: React.FC = () => {
  const { ruralMode } = useAccessibility();
  const { handleAccessibleAction } = useVoice();

  const [activeTab, setActiveTab] = useState('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [schemes, setSchemes] = useState<SchemeSummary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSchemeSlug, setSelectedSchemeSlug] = useState<string | null>(null);

  const loadData = () => {
    fetchCategories().then(setCategories).catch(console.error);
    fetchSchemes().then((data) => setSchemes(data.schemes)).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategorySelect = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setActiveTab('schemes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssistant = () => {
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEligibility = () => {
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSchemeModal = (slug: string) => {
    setSelectedSchemeSlug(slug);
  };

  const handleCheckEligibilityForScheme = (schemeId: number) => {
    setActiveTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAssistant={handleOpenAssistant}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {ruralMode ? (
          /* Simplified Rural Friendly View */
          <RuralModeView
            onOpenAssistant={handleOpenAssistant}
            onSelectCategory={handleCategorySelect}
            onOpenEligibility={handleOpenEligibility}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <>
                <Hero
                  onStartVoice={handleOpenAssistant}
                  onExploreSchemes={() => {
                    setSelectedCategory('all');
                    setActiveTab('schemes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onCheckEligibility={handleOpenEligibility}
                />

                <QuickAccessCards
                  categories={categories}
                  onSelectCategory={handleCategorySelect}
                />

                {/* AI Assistant Section Preview on Homepage */}
                <AIAssistant
                  onOpenSchemeModal={handleOpenSchemeModal}
                  onOpenEligibility={handleOpenEligibility}
                />

                {/* Eligibility Wizard Section Preview */}
                <EligibilityChecker
                  onOpenSchemeModal={handleOpenSchemeModal}
                />
              </>
            )}

            {activeTab === 'schemes' && (
              <ExploreSchemes
                schemes={schemes}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenDetails={handleOpenSchemeModal}
                onCheckEligibilityForScheme={handleCheckEligibilityForScheme}
              />
            )}

            {activeTab === 'assistant' && (
              <div className="py-6">
                <AIAssistant
                  onOpenSchemeModal={handleOpenSchemeModal}
                  onOpenEligibility={handleOpenEligibility}
                />
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="py-6">
                <EligibilityChecker
                  onOpenSchemeModal={handleOpenSchemeModal}
                />
              </div>
            )}

            {activeTab === 'documents' && (
              <DocumentGuidance />
            )}

            {activeTab === 'admin' && (
              <AdminDashboard
                schemes={schemes}
                onRefreshSchemes={loadData}
              />
            )}
          </>
        )}
      </main>

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        slug={selectedSchemeSlug}
        onClose={() => setSelectedSchemeSlug(null)}
        onCheckEligibilityForScheme={handleCheckEligibilityForScheme}
      />

      {/* Floating Audio Status Pill */}
      <VoiceFeedbackBar />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <VoiceProvider>
          <MainContent />
        </VoiceProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
