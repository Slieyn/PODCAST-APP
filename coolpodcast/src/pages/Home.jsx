import React, { useState, useEffect } from "react";
import { podcasts } from "../utils/Data";
import { filterPodcasts } from "../pages/filterPodcasts";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { applyTheme } from "../Components/Theme";

export default function Home() {
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
    const [filters, setFilters] = useState({ genre: "any", title: "" });
    const [sortOrder, setSortOrder] = useState("asc"); // Default: A-Z Sorting
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        applyTheme(); // ✅ Ensures theme is applied correctly
    }, []);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Apply filters and sorting together
    useEffect(() => {
        let filtered = filterPodcasts(podcasts, filters);

        // Apply sorting
        filtered.sort((a, b) => {
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title) // A-Z
                : b.title.localeCompare(a.title); // Z-A
        });

        setFilteredPodcasts(filtered);
    }, [filters, sortOrder]);

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);
    };

    const toggleFavorite = (podcast) => {
        let updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex((fav) => fav.id === podcast.id);

        if (index === -1) {
            updatedFavorites.push({ ...podcast, addedAt: new Date().toISOString() });
        } else {
            updatedFavorites.splice(index, 1);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="home-page">
            {/* Search & Sorting Bar */}
            <div className="search-bar">
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
                            <img
                                src={podcast.image}
                                alt={`${podcast.title} cover`}
                                className="podcast-image"
                            />
                            <div className="podcast-info">
                                <h2 className="podcast-title">{podcast.title}</h2>
                                <p className="podcast-seasons">
                                    <Link to={`/shows/${podcast.id}`}>
                                        Seasons: Explore episodes {Array.isArray(podcast.seasons) ? podcast.seasons.length : 0}
                                    </Link>
                                </p>
                                <p className="podcast-updated">
                                    Last Updated: {new Date(podcast.updated).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Heart Icon on the Right Side */}
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
