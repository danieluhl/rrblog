import { createContext, useContext, useEffect, useState } from "react";
import z from "zod";

export const THEME_KEY = "tpp_theme";
const themes = ["light", "dark", "system"] as const;
export const themeSchema = z.enum(themes);

type Theme = z.infer<typeof themeSchema>;
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "system";
    }
    const rawTheme = window.localStorage.getItem(THEME_KEY);
    let initial: Theme = "system";
    try {
      initial = themeSchema.parse(rawTheme);
    } catch (err) {
      console.error(err);
    }
    return initial;
  });

  // synchronize on change
  useEffect(() => {
    const root = window.document.documentElement;
    // remove all existing themes
    themes.forEach((t) => {
      root.classList.remove(t);
    });
    let resolvedTheme = theme;

    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    root.classList.add(resolvedTheme);
    window.localStorage.setItem(THEME_KEY, resolvedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider {...props} value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
