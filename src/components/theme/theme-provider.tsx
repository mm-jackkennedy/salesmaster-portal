
import React, { createContext, useContext, useEffect, useState } from "react";
import { getTheme } from "@/services/configService";
import { ThemeConfig } from "@/types/config";

// Create context for theme
const ThemeContext = createContext<ThemeConfig | null>(null);

// Hook to use theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(getTheme());

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    
    root.style.setProperty('--primary', theme.primaryColor);
    root.style.setProperty('--secondary', theme.secondaryColor);
    root.style.setProperty('--accent', theme.accentColor);
    root.style.setProperty('--background', theme.backgroundColor);
    root.style.setProperty('--foreground', theme.textColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
