import { createContext, useState } from "react";

// Create a context for the audio player
export const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
  // State to track the currently selected episode
  const [currentEpisode, setCurrentEpisode] = useState(null);
  
  // State to track whether the audio is playing or paused
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioPlayerContext.Provider 
      value={{ currentEpisode, setCurrentEpisode, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
