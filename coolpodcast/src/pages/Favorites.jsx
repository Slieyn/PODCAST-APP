import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa"; // Import Heart and Trash icons
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation popups

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // For sorting A-Z (ascending)

    useEffect(() => {
        // Get favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Sort the podcasts based on the selected order (A-Z or Z-A)
    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title); // Ascending order (A-Z)
        } else {
            return b.title.localeCompare(a.title); // Descending order (Z-A)
        }
    });

    // Handle the sorting filter change
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
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

            {/* Filter for A-Z sorting */}
            <div className="sort-filter">
                <label htmlFor="sortOrder">Sort A-Z: </label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
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
                                        Seasons: {podcast.seasons}
                                    </Link>
                                </p>
                                {/* Delete button */}
                                <button onClick={() => handleDelete(podcast.id)} className="delete-btn">
                                    <FaTrash className="trash-icon" /> 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Link to Shows Page */}
            <Link to="/" className="home-btn">Go back to Home!</Link>
        </div>
    );
};

export default Favorites;
