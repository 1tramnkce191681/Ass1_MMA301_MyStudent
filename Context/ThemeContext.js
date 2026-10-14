import { createContext, useContext, useEffect, useState } from 'react';
import { loadTheme, saveTheme } from '../Services/storage';

export const THEME_COLORS = {
  light: {
    mode: 'light',
    background: '#F8FAFC',
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    cardMuted: '#F1F5F9',
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    primaryLight: '#EEF2FF',
    secondary: '#06B6D4',
    secondaryLight: '#ECFEFF',
    accent: '#EC4899',
    accentLight: '#FDF2F8',
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    divider: '#F1F5F9',
    success: '#10B981',
    successLight: '#ECFDF5',
    warning: '#F59E0B',
    warningLight: '#FFFBEB',
    danger: '#EF4444',
    dangerLight: '#FEF2F2',
    inputBg: '#FFFFFF',
    inputBorder: '#CBD5E1',
    navBg: '#FFFFFF',
    navBorder: '#E2E8F0',
    shadowColor: '#0F172A',
  },
  dark: {
    mode: 'dark',
    background: '#0B0F19',
    card: '#161F30',
    cardBorder: '#223249',
    cardMuted: '#1E293B',
    primary: '#6366F1',
    primaryHover: '#818CF8',
    primaryLight: 'rgba(99, 102, 241, 0.18)',
    secondary: '#22D3EE',
    secondaryLight: 'rgba(34, 211, 238, 0.18)',
    accent: '#F472B6',
    accentLight: 'rgba(244, 114, 182, 0.18)',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#23324A',
    divider: '#1E293B',
    success: '#34D399',
    successLight: 'rgba(52, 211, 153, 0.18)',
    warning: '#FBBF24',
    warningLight: 'rgba(251, 191, 36, 0.18)',
    danger: '#F87171',
    dangerLight: 'rgba(248, 113, 113, 0.18)',
    inputBg: '#111827',
    inputBorder: '#334155',
    navBg: '#0F172A',
    navBorder: '#1E293B',
    shadowColor: '#000000',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateTheme = async () => {
      const savedTheme = await loadTheme();

      if (savedTheme) {
        setTheme(savedTheme);
      }

      setIsLoading(false);
    };

    hydrateTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await saveTheme(newTheme);
  };

  const setThemeExplicit = async (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
      await saveTheme(newTheme);
    }
  };

  const colors = THEME_COLORS[theme] || THEME_COLORS.light;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        isDark: theme === 'dark',
        toggleTheme,
        setThemeExplicit,
        isLoading
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};