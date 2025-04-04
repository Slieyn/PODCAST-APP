// Import necessary modules from React and React Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { podcasts } from "../utils/Data";

/**
 * PodcastInfo component displays details about a specific podcast.
 * Users can view the podcast title, image, description, and play episodes.
 * Audio playback and text-to-speech functionality are included.
 * 
 * @returns {JSX.Element} The PodcastInfo component.
 */
export default function PodcastInfo() {
  // Extract the podcast ID from the URL parameters
  const { podcastId } = useParams();

  // State to store the selected podcast data
  const [podcast, setPodcast] = useState(null);

  // State to handle loading and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track which episode is currently playing
  const [playingEpisodeId, setPlayingEpisodeId] = useState(null);

  // State to store the currently playing audio instance
  const [audio, setAudio] = useState(null);

  // State to handle text-to-speech functionality
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState(null);

  /**
   * Fetches the podcast data from the local 'podcasts' array based on the podcast ID.
   * Runs once when the component mounts or when the `podcastId` changes.
   */
  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        // Find the podcast matching the provided ID
        const podcastData = podcasts.find(podcast => podcast.id === podcastId);
        
        if (!podcastData) throw new Error("Podcast not found");

        setPodcast(podcastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  /**
   * Handles episode playback and text-to-speech for the episode description.
   * @param {Object} episode - The episode object containing audio and description.
   */
  const playEpisodes = (episode) => {
    // Stop any currently playing audio
    if (audio) {
      audio.pause();
      setAudio(null);
    }

    // Stop any ongoing speech synthesis
    if (speechSynthesisUtterance) {
      window.speechSynthesis.cancel();
      setSpeechSynthesisUtterance(null);
    }

    // Create and play new audio instance
    const newAudio = new Audio(episode.audio); // Ensure 'audio' field is present in your data
    newAudio.play();
    setAudio(newAudio);

    // Read out the episode description using text-to-speech
    if (episode.description) {
      const utterance = new SpeechSynthesisUtterance(episode.description);
      window.speechSynthesis.speak(utterance);
      setSpeechSynthesisUtterance(utterance);
    }

    // Set the currently playing episode ID
    setPlayingEpisodeId(episode.id);
  };

  return (
    <div className="podcast-details">
      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message if fetching fails */}
      {error && <p className="error">{error}</p>}

      {/* Render podcast details if data is available */}
      {podcast && (
        <>
          {/* Podcast Title and Cover Image */}
          <h1>{podcast.title}</h1>
          <img src={podcast.image} alt={podcast.title} className="podcast-image" />
          <p>{podcast.description}</p>

          {/* Episodes Section */}
          <h2>Episodes</h2>
          {podcast.episodes && podcast.episodes.length > 0 ? (
            <ul className="episodes-list">
              {podcast.episodes.map((episode) => (
                <li key={episode.id}>
                  <button onClick={() => playEpisodes(episode)}>
                    {playingEpisodeId === episode.id ? "Playing..." : "▶ Play"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No episodes found.</p>
          )}
        </>
      )}
    </div>
  );
}
