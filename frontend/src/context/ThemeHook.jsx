import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";


export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // throws an error if the hook is used outside of the ThemeProvider
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}