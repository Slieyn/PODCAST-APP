import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AudioPlayerContext } from "./AudioPlayerContext";
import { podcasts } from "../utils/Data"; // Import your podcast data

function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const { setCurrentEpisode } = useContext(AudioPlayerContext);

  useEffect(() => {
    // Find the episode based on the ID from the URL params
    const foundEpisode = podcasts.find((ep) => ep.id === parseInt(id)); // Make sure the id is compared correctly
    if (foundEpisode) {
      setEpisode(foundEpisode);
    } else {
      console.error("Episode not found");
    }
  }, [id]);

  if (!episode) return <p>Loading...</p>;

  return (
    <div>
      <h2>{episode.title}</h2>
      <p>{episode.description}</p>
      <audio controls>
        <source src={episode.audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={() => setCurrentEpisode(episode)}>Play Episode</button>
    </div>
  );
}

export default EpisodeDetail;
