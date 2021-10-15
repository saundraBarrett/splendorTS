import { createContext, useContext } from 'react';
import { ThemeChoices } from '../types/themes';

  
  type ThemeContextProps = {
    theme: ThemeChoices;
    setTheme: (Theme: ThemeChoices) => void;
  };

export const ThemeContext = createContext<ThemeContextProps>({ theme: ThemeChoices.Original, setTheme: theme => console.warn('no theme provider')});
export const useTheme = () => useContext(ThemeContext);
  