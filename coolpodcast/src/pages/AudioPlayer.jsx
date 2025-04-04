import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from './AudioPlayerContext'; // Import context hook
import { podcasts } from '../utils/Data';

const AudioPlayer = () => {
  const { currentEpisode } = useAudioPlayer(); // Get current episode from context
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(currentEpisode?.audioUrl));

  useEffect(() => {
    if (currentEpisode) {
      audio.play();
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      setIsPlaying(false);
    };
  }, [currentEpisode, audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!currentEpisode) {
    return null; // Return nothing if no episode is selected
  }

  return (
    <div className="audio-player">
      <div className="player-info">
        <img src={currentEpisode.image} alt={currentEpisode.title} />
        <div>
          <h3>{currentEpisode.title}</h3>
          <p>{currentEpisode.description}</p>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
