import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { podcasts } from "../utils/Data"; // Import your manually added podcast data

/**
 * EpisodesList Component - Displays a list of podcast episodes.
 * Each episode includes an image, title, description, and an audio player.
 *
 * @returns {JSX.Element} The rendered Episodes list page.
 */
function EpisodesList() {
  // Set the manually added podcasts as the initial state
  const [episodes, setEpisodes] = useState(podcasts);

  // Show a loading message if no episodes are available
  if (episodes.length === 0) return <p>Loading episodes...</p>;

  return (
    <div>
      <h2>Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link to={`/episode/${episode.id}`}>
              {/* Display Episode Image */}
              <img src={episode.image} alt={episode.title} width="100" />

              {/* Episode Title */}
              <h3>{episode.title}</h3>

              {/* Episode Description */}
              <p>{episode.description}</p>

              {/* Audio Player for the Episode */}
              <audio controls>
                <source src={episode.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodesList;
