import { useContext, useRef, useEffect } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";

function AudioPlayer() {
  const { currentEpisode, isPlaying, setIsPlaying } = useContext(AudioPlayerContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentEpisode) {
      audioRef.current.load(); // Reload audio when episode changes
      audioRef.current.play(); // Auto play when a new episode is selected
      setIsPlaying(true); // Set isPlaying to true when the episode starts
    }
  }, [currentEpisode, setIsPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying); // Toggle isPlaying state
  };

  if (!currentEpisode) return null; // Don't show player if no episode is selected

  return (
    <div style={styles.playerContainer}>
      <img src={currentEpisode.image} alt={currentEpisode.title} style={styles.thumbnail} />
      <div>
        <h4>{currentEpisode.title}</h4>
      </div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <audio ref={audioRef}>
        <source src={currentEpisode.audio} type="audio/mpeg" /> {/* Ensure this matches your data */}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

const styles = {
  playerContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#222",
    color: "#fff",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  },
};

export default AudioPlayer;
