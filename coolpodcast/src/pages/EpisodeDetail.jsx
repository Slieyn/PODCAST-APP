import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EpisodeDetail() {
    const { id, episodeId } = useParams();  // Get podcast and episode IDs from the URL
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        // Fetch podcast data using the API endpoint
        fetch(`https://podcast-api.netlify.app/id/${id}`)  // Fetch podcast details by `id`
            .then((response) => response.json())
            .then((data) => {
                // Assuming the data returned includes seasons and episodes directly
                const podcast = data;  // The entire podcast object

                // Find the specific episode by episodeId
                const episode = podcast.episodes.find((ep) => ep.id === episodeId);
                setEpisode(episode);  // Set the specific episode to state
            })
            .catch((error) => console.error('Error fetching episode data:', error));
    }, [id, episodeId]);

    // Ensure that episode is loaded before rendering
    if (!episode) {
        return <p>Loading episode...</p>;
    }

    return (
        <div className="episode-detail">
            <h2>{episode.title}</h2>
            <p>{episode.description}</p>
            <img src={episode.image} alt={episode.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />

            {/* Check if the episode has audio before rendering the audio player */}
            {episode.audio ? (
                <audio controls>
                    <source src={episode.audio} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>Audio not available for this episode.</p>
            )}
        </div>
    );
}

export default EpisodeDetail;
