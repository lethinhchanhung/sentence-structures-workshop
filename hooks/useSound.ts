// Fix: Import React to use React.createElement
import React, { useCallback, useContext, createContext, ReactNode, useState } from 'react';

type SoundType = 'correct' | 'incorrect' | 'drag' | 'drop';
type SoundContextType = {
  playSound: (sound: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback((sound: SoundType) => {
    if (isMuted) return;
    try {
      const audio = document.getElementById(`sfx-${sound}`) as HTMLAudioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error(`Error playing sound '${sound}':`, error));
      }
    } catch (error) {
      console.error(`Could not play sound: ${sound}`, error);
    }
  }, [isMuted]);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Fix: Replaced JSX with React.createElement to be compatible with a .ts file.
  return React.createElement(
    SoundContext.Provider,
    { value: { playSound, isMuted, toggleMute } },
    children
  );
};
