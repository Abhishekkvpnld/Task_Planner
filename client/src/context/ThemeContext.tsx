import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeContextType = {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useChangeTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useChangeTheme must be used within a ThemeProvider");
  }
  return context;
};
