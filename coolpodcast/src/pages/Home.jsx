import React, { useState, useEffect } from "react";
import { podcasts } from "../utils/Data"; // Import your podcast data
import { filterPodcasts } from "../pages/filterPodcasts"; // Import the filter function
import { Link } from "react-router-dom"; // For linking to the Shows page
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons from React Icons

export default function Home() {
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
    const [filters, setFilters] = useState({
        genre: "any",
        title: ""
    });

    const [favorites, setFavorites] = useState([]);

    const [isExpanded, setIsExpanded] = useState(false);

    // Fetch favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);  // Empty dependency array means this runs only once when the component mounts

    // Handle search functionality
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);

        // Apply the filters
        const matches = filterPodcasts(podcasts, newFilters);
        setFilteredPodcasts(matches);
    };

    // Function to mark a podcast as favorite
    const toggleFavorite = (podcast) => {
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex((fav) => fav.id === podcast.id);

        if (index === -1) {
            updatedFavorites.push(podcast); // Add to favorites
        } else {
            updatedFavorites.splice(index, 1); // Remove from favorites
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
    };

    // Truncate description to 100 characters (if it's longer than that)
    const truncatedDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    };

    // Sort podcasts to display favorites first
    const sortedPodcasts = filteredPodcasts.sort((a, b) => {
        const isAFavorite = favorites.some((fav) => fav.id === a.id);
        const isBFavorite = favorites.some((fav) => fav.id === b.id);

        if (isAFavorite && !isBFavorite) return -1;
        if (!isAFavorite && isBFavorite) return 1;
        return 0; // Keep the original order if both or neither are favorites
    });

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
                {sortedPodcasts.map((podcast) => (
                    <div className="podcast-item" key={podcast.id}>
                        <div className="favorite-icon">
                            {/* Heart Icon */}
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
                            <p className="podcast-seasons">
                                <Link to={`/shows/${podcast.id}`}>
                                    Seasons: {podcast.seasons}
                                </Link>
                            </p>

                            <p className="podcast-updated">{podcast.updated}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Link to Shows Page */}
            <Link to="/shows">Shows page here!</Link>
        </div>
    );
}
