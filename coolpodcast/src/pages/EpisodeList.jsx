import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { podcasts } from "../utils/Data"; // Import your manually added podcast data

function EpisodesList() {
  const [episodes, setEpisodes] = useState(podcasts); // Set the manually added podcasts as initial state

  if (episodes.length === 0) return <p>Loading episodes...</p>;

  return (
    <div>
      <h2>Episodes</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link to={`/episode/${episode.id}`}>
              <img src={episode.image} alt={episode.title} width="100" />
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
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
