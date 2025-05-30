import { useState } from 'react';

/**
 * Custom hook quản lý theme (Dark/Light mode)
 */
export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    toggleDarkMode,
  };
};
