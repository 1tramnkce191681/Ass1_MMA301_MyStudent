import { createContext, useContext, useEffect, useState } from 'react';
import { loadTheme, saveTheme } from '../Services/storage';

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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
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