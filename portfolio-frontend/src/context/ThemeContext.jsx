import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Saved choice wins; otherwise follow the visitor's system setting
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
  } catch {
    // storage unavailable, fall through
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable, ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);