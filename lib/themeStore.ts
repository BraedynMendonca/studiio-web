import { create } from 'zustand';

interface ThemeState {
  color: string;
  setColor: (color: string) => void;
  background: string;
  setBackground: (background: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  color: '#ffffff',
  setColor: (color) => set({ color }),
  background: 'liquid-ether',
  setBackground: (background) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('studiio-background', background);
    }
    set({ background });
  },
}));
