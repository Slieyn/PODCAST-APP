import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from './AudioPlayerContext'; // Import context hook for accessing the current episode
import { podcasts } from '../utils/Data'; // Import podcast data (if needed)

/**
 * AudioPlayer component responsible for controlling playback of the current episode.
 * Provides play/pause functionality and displays the episode's title, description, and image.
 * 
 * @component
 * @returns {JSX.Element} The audio player component for the current episode.
 */
const AudioPlayer = () => {
  // Use context to get the current episode being played
  const { currentEpisode } = useAudioPlayer();

  // State to track whether the episode is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // State to store the audio element for playback control
  const [audio] = useState(new Audio(currentEpisode?.audioUrl)); // Initialize the audio object with the current episode's audio URL

  // Effect to handle audio play/pause when the current episode changes
  useEffect(() => {
    // If there is a current episode, start playing it
    if (currentEpisode) {
      audio.play(); // Start playing the audio
      setIsPlaying(true); // Update state to reflect that the episode is playing
    }

    // Cleanup function to pause the audio when the component is unmounted or the current episode changes
    return () => {
      audio.pause(); // Pause the audio when the component is unmounted or episode changes
      setIsPlaying(false); // Reset play state
    };
  }, [currentEpisode, audio]); // Dependency array to re-run the effect if currentEpisode or audio changes

  /**
   * Toggles between playing and pausing the audio when the play/pause button is clicked.
   * 
   * @function
   */
  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause(); // Pause the audio if it is currently playing
    } else {
      audio.play(); // Play the audio if it is currently paused
    }
    setIsPlaying(!isPlaying); // Toggle the playing state
  };

  // If no episode is selected, return null to render nothing
  if (!currentEpisode) {
    return null; // Return nothing if there is no current episode to play
  }

  return (
    <div className="audio-player">
      <div className="player-info">
        <img src={currentEpisode.image} alt={currentEpisode.title} />
        <div>
          <h3>{currentEpisode.title}</h3> {/* Display the title of the current episode */}
          <p>{currentEpisode.description}</p> {/* Display the description of the current episode */}
        </div>
      </div>
      <div className="controls">
        {/* Play/Pause button */}
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'} {/* Toggle button text between "Play" and "Pause" */}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
