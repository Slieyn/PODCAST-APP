import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { podcasts } from "../utils/Data"; // Import static data

export default function PodcastInfo() {
  const { podcastId } = useParams(); // Get podcast ID from URL
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingEpisode, setPlayingEpisode] = useState(null);

  useEffect(() => {
    // Find the selected podcast from static data
    const podcast = podcasts.find((podcast) => podcast.id === podcastId);

    if (podcast) {
      // Simulate fetching episodes
      setEpisodes(podcast.episodes || []); // Assuming episodes are inside the podcast object
      setLoading(false);
    } else {
      setError("Podcast not found.");
      setLoading(false);
    }
  }, [podcastId]);

  // Play selected episode
  const playEpisode = (episodeId) => {
    setPlayingEpisode(episodeId);
  };

  return (
    <div className="podcast-details">
      <h1>Podcast Episodes</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && episodes.length > 0 ? (
        <ul className="episode-list">
          {episodes.map((episode) => (
            <li key={episode.id} onClick={() => playEpisode(episode.id)}>
              <h3>{episode.title}</h3>
              
              {/* Show audio player if clicked */}
              {playingEpisode === episode.id && (
                <audio controls autoPlay>
                  <source src={episode.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No episodes found.</p>
      )}
    </div>
  );
}
