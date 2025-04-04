import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { podcasts } from "../utils/Data";


export default function PodcastInfo() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingEpisodeId, setPlayingEpisodeId] = useState(null); // Track which episode is playing
  const [audio, setAudio] = useState(null);
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        // Fetching the podcast data from your local 'podcasts' array
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

  // Function to play episode audio & read description
  const playEpisodes = (episode) => {
    // Stop any currently playing audio
    if (audio) {
      audio.pause();
      setAudio(null);
    }

    // Stop any ongoing speech
    if (speechSynthesisUtterance) {
      window.speechSynthesis.cancel();
      setSpeechSynthesisUtterance(null);
    }

    // Play new episode audio
    const newAudio = new Audio(episode.audio); // Use 'audio' field from your data
    newAudio.play();
    setAudio(newAudio);

    // Read episode description
    if (episode.description) {
      const utterance = new SpeechSynthesisUtterance(episode.description);
      window.speechSynthesis.speak(utterance);
      setSpeechSynthesisUtterance(utterance);
    }

    setPlayingEpisodeId(episode.id);
  };

  return (
    <div className="podcast-details">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {podcast && (
        <>
          <h1>{podcast.title}</h1>
          <img src={podcast.image} alt={podcast.title} className="podcast-image" />
          <p>{podcast.description}</p>

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
