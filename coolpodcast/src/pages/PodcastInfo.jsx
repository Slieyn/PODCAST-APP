import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PodcastInfo() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);
  const [audio, setAudio] = useState(null);
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
        if (!response.ok) throw new Error("Failed to fetch podcast data");

        const data = await response.json();
        setPodcast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  // Function to play episode audio & read description
  const playEpisode = (episode) => {
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
    const newAudio = new Audio(episode.audioUrl);
    newAudio.play();
    setAudio(newAudio);

    // Read episode description
    if (episode.description) {
      const utterance = new SpeechSynthesisUtterance(episode.description);
      window.speechSynthesis.speak(utterance);
      setSpeechSynthesisUtterance(utterance);
    }

    setPlayingEpisode(episode.id);
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
            <ul className="episode-list">
              {podcast.episodes.map((episode) => (
                <li key={episode.id}>
                  <h3>{episode.title}</h3>
                  <button onClick={() => playEpisode(episode)}>
                    {playingEpisode === episode.id ? "Playing..." : "▶ Play"}
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
