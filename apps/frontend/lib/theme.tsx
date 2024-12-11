import { createContext, PropsWithChildren, useContext } from "react";

export type ColorScheme = 'light' | 'dark';

export type PaletteColorName =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error';

export type PaletteColor = {
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  textInverted: string;
  link: string;
  border: string;
  borderDark: string;
  icon: string;
  [k: string]: string
}

export type Palette = Record<PaletteColorName, PaletteColor>

export interface Theme {
  colorScheme: ColorScheme
  palette: Palette
  // shapes: Shapes
  // typography: Typography
}

const defaultTheme = {
  colorScheme: 'light',
  palette: {
    default: {
      background: 'hsl(240 5.9% 90%)',
      backgroundLight: 'hsl(0 0% 98%)',
      icon: 'hsl(240 3.7% 15.9%)',
      link: 'hsl(160.1 84.1% 39.4%)',
      text: 'hsl(240 5.9% 10%)',
      textLight: 'hsl(240 3.7% 15.9%)',
      border: 'hsl(240 5.3% 26.1%)',
      borderDark: 'hsl(240 10% 3.9%)',
      textInverted: 'hsl(240 4.8% 95.9%)',
    },
    error: {
      background: 'hsl(0 70% 35.3%)',
      backgroundLight: 'hsl(0 90.6% 70.8%)',
      icon: 'hsl(0 84.2% 60.2%)',
      link: 'hsl(0 84.2% 60.2%)',
      text: 'hsl(0 84.2% 60.2%)',
      textLight: 'hsl(0 93.5% 81.8%)',
      border: 'hsl(0 84.2% 60.2%)',
      borderDark: 'hsl(0 84.2% 60.2%)',
      textInverted: 'hsl(0 84.2% 60.2%)',
    },
    primary: {
      background: 'hsl(240 5.9% 90%)',
      backgroundLight: 'hsl(0 0% 98%)',
      icon: 'hsl(240 3.7% 15.9%)',
      link: 'hsl(160.1 84.1% 39.4%)',
      text: 'hsl(240 5.9% 10%)',
      textLight: 'hsl(240 3.7% 15.9%)',
      border: 'hsl(240 5.3% 26.1%)',
      borderDark: 'hsl(240 10% 3.9%)',
      textInverted: 'hsl(240 4.8% 95.9%)',
    },
    secondary: {
      background: 'hsl(240 5.9% 90%)',
      backgroundLight: 'hsl(0 0% 98%)',
      icon: 'hsl(240 3.7% 15.9%)',
      link: 'hsl(160.1 84.1% 39.4%)',
      text: 'hsl(240 5.9% 10%)',
      textLight: 'hsl(240 3.7% 15.9%)',
      border: 'hsl(240 5.3% 26.1%)',
      borderDark: 'hsl(240 10% 3.9%)',
      textInverted: 'hsl(240 4.8% 95.9%)',
    },
  },
} satisfies Theme;

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
  )
}
