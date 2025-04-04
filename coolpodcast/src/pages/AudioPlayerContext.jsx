import React, { createContext, useContext, useState, useEffect } from 'react';
import { podcasts } from '../utils/Data'; // Assuming podcasts data is available here

/**
 * Context for managing audio player state, including the current episode and player controls.
 * Provides functions to play and pause episodes, and shares the current episode state.
 * 
 * @context
 * @returns {Object} The context value containing the current episode, playEpisode, and pauseEpisode functions.
 */
const AudioPlayerContext = createContext();

/**
 * Custom hook to access the audio player context.
 * 
 * @hook
 * @returns {Object} The audio player context values (current episode, play, pause functions).
 */
export const useAudioPlayer = () => useContext(AudioPlayerContext);

/**
 * Provider component to wrap the app and provide the audio player context to children.
 * Manages the state of the current episode and controls playback (play/pause).
 * Saves and retrieves the last played episode from localStorage.
 * 
 * @component
 * @param {ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component wrapping the children with audio player context.
 */
export const AudioPlayerProvider = ({ children }) => {
  // State to store the current episode that is being played
  const [currentEpisode, setCurrentEpisode] = useState(() => {
    // Try to get the last played episode from localStorage
    const savedEpisode = JSON.parse(localStorage.getItem('currentEpisode'));
    return savedEpisode || null; // Return the saved episode or null if not found
  });

  /**
   * Function to play an episode by its ID.
   * Searches through all episodes in podcasts and sets the matching episode as the current episode.
   * Saves the current episode in localStorage for persistence.
   * 
   * @param {string} episodeId - The ID of the episode to be played.
   */
  const playEpisode = (episodeId) => {
    // Find the episode by ID from the podcasts data
    const episode = podcasts.flatMap(podcast => podcast.episodes).find(ep => ep.id === episodeId);

    if (episode) {
      setCurrentEpisode(episode); // Set the found episode as the current episode
      localStorage.setItem('currentEpisode', JSON.stringify(episode)); // Save the episode in localStorage
    }
  };

  /**
   * Function to pause the current episode.
   * Clears the current episode state and removes the saved episode from localStorage.
   */
  const pauseEpisode = () => {
    setCurrentEpisode(null); // Reset the current episode state
    localStorage.removeItem('currentEpisode'); // Remove the current episode from localStorage
  };

  return (
    // Provide the audio player context to children components
    <AudioPlayerContext.Provider value={{ currentEpisode, playEpisode, pauseEpisode }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
