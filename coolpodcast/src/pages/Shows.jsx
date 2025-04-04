// Import necessary React hooks and utilities
import React, { useState, useEffect } from "react";
import { podcasts } from "../utils/Data"; // Ensure data includes description and seasons
import { filterPodcasts } from "../pages/filterPodcasts";
import { Link, useNavigate } from "react-router-dom";
import { applyTheme } from "../Components/Theme";

/**
 * Home component displays a searchable list of podcasts.
 * Users can filter by title and genre, and navigate to podcast details.
 * @returns {JSX.Element} The Home page component.
 */
export default function Home() {
    // State to manage filtered podcasts
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

    // State to store search filters (default: any genre, empty title)
    const [filters, setFilters] = useState({ genre: "any", title: "" });

    // State to store favorite podcasts retrieved from localStorage
    const [favorites, setFavorites] = useState([]);

    // React Router navigation hook
    const navigate = useNavigate();

    // Apply the theme when the component mounts
    useEffect(() => {
        applyTheme(); // Ensures the correct theme is applied when loading this page
    }, []);

    // Load favorite podcasts from localStorage on mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    /**
     * Handles the search form submission.
     * Filters podcasts based on user input.
     * @param {Event} event - The form submission event.
     */
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);

        // Apply the filters to the podcast list
        const matches = filterPodcasts(podcasts, newFilters);
        setFilteredPodcasts(matches);
    };

    return (
        <div className="home-page">
            {/* Back to Home Link */}
            <div className="back-home">
                <Link to="/">Back to Home</Link>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                {/* Title Search Input */}
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                />

                {/* Genre Filter Dropdown */}
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
                    <div
                        className="podcast-item"
                        key={podcast.id}
                        onClick={() => navigate(`/shows/${podcast.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="podcast-info">
                            {/* Podcast Title */}
                            <h2 className="podcast-title">{podcast.title}</h2>

                            {/* Display Podcast ID */}
                            <p className="podcast-id">ID: {podcast.id}</p>

                            {/* Podcast Description */}
                            <p className="podcast-description">{podcast.description}</p>

                            {/* Number of Seasons with a Link to Podcast Page */}
                            <p className="podcast-seasons">
                                <Link to={`/shows/${podcast.id}`}>
                                    Seasons: {podcast.seasons.length}
                                </Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
