import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // We'll use useParams to get the podcast ID
import { podcasts } from "../utils/Data"; // Import your data

export default function SeasonsPage() {
    const { podcastId } = useParams(); // Get podcastId from URL
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        // Find the podcast from the podcasts data
        const podcast = podcasts.find((podcast) => podcast.id === podcastId);

        if (podcast) {
            // Set the seasons of the found podcast
            setSeasons(podcast.seasons || []); // Assuming seasons is an array inside podcast
        }
    }, [podcastId]);

    return (
        <div className="seasons-page">
            <h1>Seasons for Podcast {podcastId}</h1>

            <div className="seasons-list">
                {seasons.length > 0 ? (
                    seasons.map((season) => (
                        <div className="season-item" key={season.id}>
                            <img
                                src={season.image}
                                alt={season.title}
                                className="season-image"
                            />
                            <h3>{season.title}</h3>
                            <p>Season ID: {season.id}</p>
                            <Link to={`/episodes/${season.id}`} className="season-link">
                                View Episodes
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No seasons available.</p>
                )}
            </div>
        </div>
    );
}
