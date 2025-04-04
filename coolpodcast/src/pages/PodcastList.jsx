// Import necessary modules from React and React Router
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * PodcastsList component displays a list of podcasts with filtering options.
 * Users can search by title, filter by genre, and toggle full descriptions.
 * @returns {JSX.Element} The PodcastsList component.
 */
export default function PodcastsList() {
    // State to store the fetched podcasts
    const [podcasts, setPodcasts] = useState([]);

    // State to store the currently filtered list of podcasts
    const [filteredPodcasts, setFilteredPodcasts] = useState([]);

    // State to handle loading and error messages
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for search and filtering
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // State for managing "Read More" toggles per podcast
    const [readMoreState, setReadMoreState] = useState({});

    /**
     * Fetches the podcast data from an API on component mount.
     */
    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await fetch("https://podcast-api.netlify.app");
                if (!response.ok) throw new Error("Failed to fetch podcasts data");
                const data = await response.json();
                setPodcasts(data);
                setFilteredPodcasts(data); // Set initial state
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, []);

    /**
     * Filters podcasts based on selected genre and search query.
     */
    const handleFilterChange = () => {
        const filtered = podcasts.filter((podcast) => {
            const matchesGenre =
                selectedGenre === "all" || podcast.genres.includes(parseInt(selectedGenre));
            const matchesTitle =
                podcast.title.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesGenre && matchesTitle; // Return podcasts that match both criteria
        });

        setFilteredPodcasts(filtered);
    };

    /**
     * Handles changes in the genre selection dropdown.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the select element.
     */
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    /**
     * Handles changes in the search input for filtering by title.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
     */
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    /**
     * Toggles the "Read More" state for a given podcast.
     * @param {string} podcastId - The ID of the podcast to toggle.
     */
    const toggleDescription = (podcastId) => {
        setReadMoreState((prev) => ({
            ...prev,
            [podcastId]: !prev[podcastId],
        }));
    };

    /**
     * Renders the podcast description with a "Read More/Less" toggle.
     * @param {string} description - The full podcast description.
     * @param {string} podcastId - The ID of the podcast.
     * @returns {JSX.Element} Description paragraph with toggle button.
     */
    const renderDescription = (description, podcastId) => {
        const isReadMore = readMoreState[podcastId];
        const truncatedDescription = description.substring(0, 150) + "...";

        return (
            <>
                <p>{isReadMore ? description : truncatedDescription}</p>
                <button onClick={() => toggleDescription(podcastId)}>
                    {isReadMore ? "Read Less" : "Read More"}
                </button>
            </>
        );
    };

    // Re-run filtering whenever the genre or search query changes
    useEffect(() => {
        handleFilterChange();
    }, [selectedGenre, searchQuery]);

    // Show loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Show error message if fetching failed
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="cool-list">
            <h1>All Podcasts</h1>

            {/* Search and Genre Filter Form */}
            <div className="filter-bar">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFilterChange(); // Trigger filtering on form submit
                    }}
                    className="search-form"
                >
                    {/* Search by Title */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {/* Genre Selection Dropdown */}
                    <select name="genre" value={selectedGenre} onChange={handleGenreChange}>
                        <option value="all">All Genres</option>
                        <option value="1">True Crime</option>
                        <option value="2">Storytelling</option>
                        <option value="3">History</option>
                        {/* More genres can be added dynamically */}
                    </select>

                    <button type="submit">Search</button>
                </form>
            </div>

            {/* Podcasts Preview */}
            <div className="cool-preview">
                {filteredPodcasts.length > 0 ? (
                    filteredPodcasts.map((podcast) => (
                        <div key={podcast.id} className="card">
                            {/* Podcast Cover Image */}
                            <img
                                src={podcast.image || "https://via.placeholder.com/150"}
                                alt={podcast.title}
                                className="card-image"
                            />

                            {/* Podcast Title */}
                            <h3>{podcast.title}</h3>

                            {/* Podcast Description with Read More/Less Toggle */}
                            {renderDescription(podcast.description, podcast.id)}

                            {/* Link to Podcast Episodes */}
                            <Link to={`/shows/${podcast.id}`} className="view-details-link">
                                View Episodes
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No podcasts available.</p>
                )}
            </div>
        </div>
    );
}
