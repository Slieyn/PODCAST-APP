import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Heart icon for favorites
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation popups
import { applyTheme } from "../Components/Theme";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // For A-Z sorting (default)
    const [dateSortOrder, setDateSortOrder] = useState("desc"); // For Most Recent sorting (default)

    useEffect(() => {
        applyTheme(); // ✅ Ensures the theme is applied when navigating to this page
    }, []);

    useEffect(() => {
        // Get favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Sort the podcasts based on the selected order (A-Z, Z-A, or Most Recent)
    const sortedFavorites = [...favorites].sort((a, b) => {
        if (dateSortOrder === "desc") {
            // Sort by 'updated' in descending order (most recent first)
            return new Date(b.updated || 0) - new Date(a.updated || 0);
        } else if (sortOrder === "asc") {
            // Sort by title in ascending order (A-Z)
            return a.title.localeCompare(b.title);
        } else {
            // Sort by title in descending order (Z-A)
            return b.title.localeCompare(a.title);
        }
    });

    // Handle the sorting filter change for A-Z or Z-A
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // Handle the sorting filter change for Most Recent or Oldest
    const handleDateSortChange = (e) => {
        setDateSortOrder(e.target.value);
    };

    // Handle podcast deletion with confirmation
    const handleDelete = (podcastId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove the podcast from favorites
                const updatedFavorites = favorites.filter((podcast) => podcast.id !== podcastId);
                setFavorites(updatedFavorites);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                Swal.fire("Deleted!", "Your favorite podcast has been deleted.", "success");
            }
        });
    };

    return (

        <div className="favorites-page">
            <h1>Your Favorite Podcasts</h1>

            {/* Sorting options */}
            <div className="sort-filter">
                <label htmlFor="sortOrder">Sort by Title: </label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <label htmlFor="dateSortOrder">Sort by Date Added: </label>
                <select id="dateSortOrder" value={dateSortOrder} onChange={handleDateSortChange}>
                    <option value="desc">Most Recent</option>
                    <option value="asc">Oldest</option>
                </select>
            </div>

            {/* Check if there are any favorites */}
            {favorites.length === 0 ? (
                <div>
                    <p>You have no favorite podcasts yet. <Link to="/">Add some from the homepage!</Link></p>
                </div>
            ) : (
                <div className="podcast-list">
                    {sortedFavorites.map((podcast) => (
                        <div className="podcast-item" key={podcast.id}>
                            <div className="favorite-icon">
                                <FaHeart color="red" size={24} />
                            </div>
                            <img
                                src={podcast.image}
                                alt={`${podcast.title} cover`}
                                className="podcast-image"
                            />
                            <div className="podcast-info">
                                <h2 className="podcast-title">{podcast.title}</h2>
                                <p className="podcast-description">{podcast.description}</p>
                                <p className="podcast-seasons">
                                    <Link to={`/shows/${podcast.id}`}>
                                        Seasons: {podcast.seasons.length} {/* ✅ FIXED */}
                                    </Link>
                                </p>
                                {/* Show Updated Date */}
                                <p className="podcast-updated">
                                    Last Updated: {podcast.updated
                                        ? new Date(podcast.updated).toLocaleDateString()
                                        : "No Update Info"}
                                </p>
                                {/* Delete button */}
                                <button
                                    onClick={() => handleDelete(podcast.id)}
                                    className="delete-btn"
                                >
                                    Delete from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Link to Shows Page */}
            <Link to="/" className="back-home">🏠 Back to Home</Link>
        </div>
    );
};

export default Favorites;
