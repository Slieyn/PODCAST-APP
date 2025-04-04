import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Heart icon for favorites
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation popups
import { applyTheme } from "../Components/Theme";

/**
 * Favorites Component - Displays a list of user's favorite podcasts.
 * Users can sort favorites by title (A-Z, Z-A) or by date added (most recent, oldest).
 * They can also remove podcasts from their favorites with confirmation.
 *
 * @returns {JSX.Element} The rendered Favorites page.
 */
const Favorites = () => {
    const [favorites, setFavorites] = useState([]); // Stores the favorite podcasts
    const [sortOrder, setSortOrder] = useState("asc"); // Sorting by title (default: A-Z)
    const [dateSortOrder, setDateSortOrder] = useState("desc"); // Sorting by date added (default: Most Recent)

    useEffect(() => {
        applyTheme(); // ✅ Ensures the theme is applied when navigating to this page
    }, []);

    useEffect(() => {
        // Retrieve favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    /**
     * Sorts the favorite podcasts based on the selected order:
     * - By title (A-Z or Z-A)
     * - By last updated date (Most Recent or Oldest)
     */
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

    /**
     * Handles sorting order change (A-Z or Z-A).
     * @param {Event} e - The event object from the dropdown selection.
     */
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    /**
     * Handles sorting by date added (Most Recent or Oldest).
     * @param {Event} e - The event object from the dropdown selection.
     */
    const handleDateSortChange = (e) => {
        setDateSortOrder(e.target.value);
    };

    /**
     * Handles podcast deletion with a confirmation prompt.
     * Updates the localStorage and removes the podcast from favorites.
     *
     * @param {string} podcastId - The ID of the podcast to be removed.
     */
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

            {/* Sorting Options */}
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

            {/* Check if there are any favorite podcasts */}
            {favorites.length === 0 ? (
                <div>
                    <p>
                        You have no favorite podcasts yet.{" "}
                        <Link to="/">Add some from the homepage!</Link>
                    </p>
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
                                    Last Updated:{" "}
                                    {podcast.updated
                                        ? new Date(podcast.updated).toLocaleDateString()
                                        : "No Update Info"}
                                </p>
                                {/* Delete Button */}
                                <button onClick={() => handleDelete(podcast.id)} className="delete-btn">
                                    Delete from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Link to Home Page */}
            <Link to="/" className="back-home">
                🏠 Back to Home
            </Link>
        </div>
    );
};

export default Favorites;
