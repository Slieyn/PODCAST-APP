import React, { useState } from "react";
import { podcasts } from "../utils/Data"; // Import your podcast data
import { filterPodcasts } from "./filterPodcasts"; // Import the filter function
import { Link } from "react-router-dom"; // For linking to the Shows page

export default function Home() {
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
    const [filters, setFilters] = useState({
        genre: "any",
        title: ""
    });

    // State to manage whether the description is expanded or collapsed
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncate description to 100 characters (if it's longer than that)
    const truncatedDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);

        // Apply the filters
        const matches = filterPodcasts(podcasts, newFilters);
        setFilteredPodcasts(matches);
    };

    return (
        <div className="home-page">
            {/* Search Filter Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                />
                <select
                    name="genre"
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                >
                    <option value="any">All Genres</option>
                    <option value="1">True Crime</option>
                    <option value="2">Storytelling</option>
                    <option value="3">History</option>
                </select>
                <button type="submit">Search</button>
            </form>

            {/* Podcast List */}
            <div className="podcast-list">
                {filteredPodcasts.map((podcast) => (
                    <div className="podcast-item" key={podcast.id}>
                        <img
                            src={podcast.image}
                            alt={`${podcast.title} cover`}
                            className="podcast-image"
                        />
                        <div className="podcast-info">
                            <h2 className="podcast-title">{podcast.title}</h2>
                            {/* Show description with read more functionality */}
                            <p className="podcast-description">
                                {isExpanded ? podcast.description : truncatedDescription(podcast.description)}
                                {podcast.description.length > 100 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)} // Toggle between expanded/collapsed state
                                        className="read-more-btn"
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </p>
                            {/* Show Seasons */}
                            <p className="podcast-seasons">
                                <Link to={`/shows/${podcast.id}`}>
                                    Seasons: {podcast.seasons}
                                </Link>
                            </p>
                            {/* Show Genres */}
                            <div className="podcast-genres">
                                {podcast.genres.map((genreId) => (
                                    <span className="genre" key={genreId}>
                                        {genreId === 1
                                            ? "True Crime"
                                            : genreId === 2
                                                ? "Storytelling"
                                                : "History"}
                                    </span>
                                ))}
                            </div>
                            {/* Show Updated Date */}
                            <p className="podcast-updated">{new Date(podcast.updated).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Link back to Home page */}
          <Link to="/" className="home-btn">Go back to Home!</Link>
        </div>
    );
}
