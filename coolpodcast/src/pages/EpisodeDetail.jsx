import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * EpisodeDetail Component - Displays details of a specific podcast episode.
 * It fetches episode data based on the podcast and episode IDs from the URL.
 *
 * @component
 * @returns {JSX.Element} The rendered episode detail page.
 */
function EpisodeDetail() {
    const { id, episodeId } = useParams(); // Get podcast and episode IDs from the URL
    const [episode, setEpisode] = useState(null); // State to store episode details

    useEffect(() => {
        /**
         * Fetch podcast data using the provided API endpoint.
         * Extracts the specific episode based on episodeId.
         */
        fetch(`https://podcast-api.netlify.app/id/${id}`) // Fetch podcast details by `id`
            .then((response) => response.json())
            .then((data) => {
                const podcast = data; // Store the fetched podcast object

                // Find the specific episode by episodeId
                const episode = podcast.episodes.find((ep) => ep.id === episodeId);
                setEpisode(episode); // Update state with the selected episode
            })
            .catch((error) => console.error('Error fetching episode data:', error));
    }, [id, episodeId]);

    // Show loading message until the episode data is fetched
    if (!episode) {
        return <p>Loading episode...</p>;
    }

    return (
        <div className="episode-detail">
            {/* Display episode title */}
            <h2>{episode.title}</h2>

            {/* Show episode description */}
            <p>{episode.description}</p>

            {/* Display episode image */}
            <img
                src={episode.image}
                alt={episode.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />

            {/* Check if the episode has an audio file before rendering the player */}
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
