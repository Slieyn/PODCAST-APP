import React, { createContext, useContext, useState, useEffect } from 'react';
import { podcasts } from '../utils/Data'; // Assuming podcasts data is available here

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    // Try to get the last played episode from localStorage
    const savedEpisode = JSON.parse(localStorage.getItem('currentEpisode'));
    return savedEpisode || null;
  });

  const playEpisode = (episodeId) => {
    // Find the episode by ID from the podcasts data
    const episode = podcasts.flatMap(podcast => podcast.episodes).find(ep => ep.id === episodeId);

    if (episode) {
      setCurrentEpisode(episode);
      localStorage.setItem('currentEpisode', JSON.stringify(episode)); // Save the episode in localStorage
    }
  };

  const pauseEpisode = () => {
    setCurrentEpisode(null);
    localStorage.removeItem('currentEpisode'); // Remove the current episode from localStorage
  };

  return (
    <AudioPlayerContext.Provider value={{ currentEpisode, playEpisode, pauseEpisode }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
