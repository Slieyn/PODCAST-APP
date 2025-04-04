// Import necessary modules from React and other dependencies
import React, { useState, useEffect } from "react";
import { podcasts } from "../utils/Data";
import { filterPodcasts } from "../pages/filterPodcasts";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { applyTheme } from "../Components/Theme";

/**
 * Home component displays a list of podcasts with filtering, sorting, and favorite functionality.
 * Users can search by title, filter by genre, and sort podcasts alphabetically.
 * 
 * @returns {JSX.Element} The Home component.
 */
export default function Home() {
    // State for storing filtered podcasts
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

    // State for managing search filters (title & genre)
    const [filters, setFilters] = useState({ genre: "any", title: "" });

    // State for sorting order (A-Z or Z-A)
    const [sortOrder, setSortOrder] = useState("asc");

    // State to store user's favorite podcasts
    const [favorites, setFavorites] = useState([]);

    /**
     * Applies the theme when the component mounts.
     */
    useEffect(() => {
        applyTheme();
    }, []);

    /**
     * Loads favorite podcasts from localStorage when the component mounts.
     */
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    /**
     * Filters and sorts the podcast list whenever filters or sorting order change.
     */
    useEffect(() => {
        let filtered = filterPodcasts(podcasts, filters);

        // Sort podcasts alphabetically based on sort order
        filtered.sort((a, b) => {
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title) // A-Z
                : b.title.localeCompare(a.title); // Z-A
        });

        setFilteredPodcasts(filtered);
    }, [filters, sortOrder]);

    /**
     * Handles search form submission and updates filters.
     * @param {Event} event - The form submission event.
     */
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);
    };

    /**
     * Toggles a podcast as a favorite and updates localStorage.
     * @param {Object} podcast - The podcast object to be favorited or unfavorited.
     */
    const toggleFavorite = (podcast) => {
        let updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex((fav) => fav.id === podcast.id);

        if (index === -1) {
            // Add podcast to favorites with timestamp for sorting if needed
            updatedFavorites.push({ ...podcast, addedAt: new Date().toISOString() });
        } else {
            // Remove podcast from favorites
            updatedFavorites.splice(index, 1);
        }

        // Update state and localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="home-page">
            {/* Search & Sorting Bar */}
            <div className="search-bar">
                <form onSubmit={handleSearch} className="search-form">
                    {/* Search Input Field */}
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

                    {/* Search Button */}
                    <button type="submit">Search</button>
                </form>

                {/* Sorting Dropdown */}
                <select
                    className="sort-dropdown"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>

            {/* Podcast List */}
            <div className="podcast-list">
                {filteredPodcasts.map((podcast) => (
                    <div className="podcast-item" key={podcast.id}>
                        <div className="podcast-content">
                            {/* Podcast Cover Image */}
                            <img
                                src={podcast.image}
                                alt={`${podcast.title} cover`}
                                className="podcast-image"
                            />

                            {/* Podcast Info */}
                            <div className="podcast-info">
                                <h2 className="podcast-title">{podcast.title}</h2>

                                {/* Link to show details */}
                                <p className="podcast-seasons">
                                    <Link to={`/shows/${podcast.id}`}>
                                        Seasons: Explore episodes {Array.isArray(podcast.seasons) ? podcast.seasons.length : 0}
                                    </Link>
                                </p>

                                {/* Last Updated Time */}
                                <p className="podcast-updated">
                                    Last Updated: {new Date(podcast.updated).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={() => toggleFavorite(podcast)}
                            className="favorite-btn"
                            title={favorites.some((fav) => fav.id === podcast.id) ? "Remove from Favorites" : "Add to Favorites"}
                        >
                            {favorites.some((fav) => fav.id === podcast.id) ? (
                                <FaHeart color="red" size={24} />
                            ) : (
                                <FaRegHeart color="gray" size={24} />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
