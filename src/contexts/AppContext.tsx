import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Language,
  ThemeMode,
  UnitSystem,
  MeasureMode,
  FitPreference,
  detectDefaultLanguage,
  getDirection,
  translate,
} from '@/i18n/translations';

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  unit: UnitSystem;
  setUnit: (unit: UnitSystem) => void;
  mode: MeasureMode;
  setMode: (mode: MeasureMode) => void;
  fitPreference: FitPreference;
  setFitPreference: (fit: FitPreference) => void;
  heightCm: number | null;
  setHeightCm: (h: number | null) => void;
  hasOnboarded: boolean;
  setHasOnboarded: (v: boolean) => void;
  t: (path: string, vars?: Record<string, string | number>) => any;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEY = 'mysize_prefs_v1';

interface StoredPrefs {
  language?: Language;
  theme?: ThemeMode;
  unit?: UnitSystem;
  mode?: MeasureMode;
  fitPreference?: FitPreference;
  heightCm?: number | null;
  hasOnboarded?: boolean;
}

function loadPrefs(): StoredPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function savePrefs(prefs: StoredPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore write errors (e.g. private mode)
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = useMemo(loadPrefs, []);
  const [language, setLanguageState] = useState<Language>(initial.language || detectDefaultLanguage());
  const [theme, setThemeState] = useState<ThemeMode>(initial.theme || 'light');
  const [unit, setUnitState] = useState<UnitSystem>(initial.unit || 'cm');
  const [mode, setModeState] = useState<MeasureMode>(initial.mode || 'normal');
  const [fitPreference, setFitPreferenceState] = useState<FitPreference>(initial.fitPreference || 'regular');
  const [heightCm, setHeightCmState] = useState<number | null>(
    typeof initial.heightCm === 'number' ? initial.heightCm : null
  );
  const [hasOnboarded, setHasOnboardedState] = useState<boolean>(!!initial.hasOnboarded);

  const dir = getDirection(language);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', dir);
    html.classList.toggle('dark', theme === 'dark');
  }, [language, dir, theme]);

  const persist = useCallback(
    (partial: Partial<StoredPrefs>) => {
      const current = loadPrefs();
      savePrefs({ ...current, ...partial });
    },
    []
  );

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    persist({ language: lang });
  }, [persist]);

  const setTheme = useCallback((th: ThemeMode) => {
    setThemeState(th);
    persist({ theme: th });
  }, [persist]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      persist({ theme: next });
      return next;
    });
  }, [persist]);

  const setUnit = useCallback((u: UnitSystem) => {
    setUnitState(u);
    persist({ unit: u });
  }, [persist]);

  const setMode = useCallback((m: MeasureMode) => {
    setModeState(m);
    persist({ mode: m });
  }, [persist]);

  const setFitPreference = useCallback((f: FitPreference) => {
    setFitPreferenceState(f);
    persist({ fitPreference: f });
  }, [persist]);

  const setHeightCm = useCallback((h: number | null) => {
    setHeightCmState(h);
    persist({ heightCm: h });
  }, [persist]);

  const setHasOnboarded = useCallback((v: boolean) => {
    setHasOnboardedState(v);
    persist({ hasOnboarded: v });
  }, [persist]);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => translate(language, path, vars),
    [language]
  );

  const value: AppContextValue = {
    language,
    setLanguage,
    dir,
    theme,
    setTheme,
    toggleTheme,
    unit,
    setUnit,
    mode,
    setMode,
    fitPreference,
    setFitPreference,
    heightCm,
    setHeightCm,
    hasOnboarded,
    setHasOnboarded,
    t,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}