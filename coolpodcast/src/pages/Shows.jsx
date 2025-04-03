import React, { useState, useEffect } from "react";
import { podcasts } from "../utils/Data"; // Ensure your data structure includes description and seasons
import { filterPodcasts } from "../pages/filterPodcasts";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
    const [filters, setFilters] = useState({ genre: "any", title: "" });
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newFilters = Object.fromEntries(formData);
        setFilters(newFilters);
        const matches = filterPodcasts(podcasts, newFilters);
        setFilteredPodcasts(matches);
    };

    return (
        <div className="home-page">
            {/* Back to Home Link */}
            <div className="back-home">
                <Link to="/">Back to Home</Link>
            </div>

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
                    <div
                        className="podcast-item"
                        key={podcast.id}
                        onClick={() => navigate(`/shows/${podcast.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="podcast-info">
                            <h2 className="podcast-title">{podcast.title}</h2>
                            {/* Display the Podcast ID */}
                            <p className="podcast-id">ID: {podcast.id}</p>
                            <p className="podcast-description">{podcast.description}</p>
                            <p className="podcast-seasons">
                                {/* Display the number of seasons */}
                                <Link to={`/shows/${podcast.id}`}>Seasons: {podcast.seasons.length}</Link>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
