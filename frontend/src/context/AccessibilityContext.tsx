import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  fontScale: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  ruralMode: boolean;
  toggleRuralMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontScale, setFontScale] = useState<number>(1.0);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [ruralMode, setRuralMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (ruralMode) {
      document.body.classList.add('rural-mode');
      setFontScale(1.15);
    } else {
      document.body.classList.remove('rural-mode');
      setFontScale(1.0);
    }
  }, [ruralMode]);

  const increaseFontSize = () => {
    setFontScale((prev) => Math.min(prev + 0.1, 1.35));
  };

  const decreaseFontSize = () => {
    setFontScale((prev) => Math.max(prev - 0.1, 0.85));
  };

  const resetFontSize = () => {
    setFontScale(1.0);
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const toggleRuralMode = () => {
    setRuralMode((prev) => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        highContrast,
        toggleHighContrast,
        ruralMode,
        toggleRuralMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within an AccessibilityProvider');
  return context;
};
