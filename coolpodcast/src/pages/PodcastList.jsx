import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState([]);
    const [filteredPodcasts, setFilteredPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [searchQuery, setSearchQuery] = useState(""); // For title filter
    const [readMoreState, setReadMoreState] = useState({}); // For toggling "Read More" for each podcast

    // Fetch podcasts data
    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await fetch("https://podcast-api.netlify.app");
                if (!response.ok) throw new Error("Failed to fetch podcasts data");
                const data = await response.json();
                setPodcasts(data);
                setFilteredPodcasts(data); // Initial filter state (no genre filter or title filter)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, []);

    // Filter podcasts by genre and title
    const handleFilterChange = () => {
        const filtered = podcasts.filter((podcast) => {
            const matchesGenre =
                selectedGenre === "all" || podcast.genres.includes(parseInt(selectedGenre)); // Filter by genre
            const matchesTitle =
                podcast.title.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by title

            return matchesGenre && matchesTitle; // Only include podcasts that match both filters
        });

        setFilteredPodcasts(filtered);
    };

    // Handle genre selection change
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    // Handle search input change for title filter
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Toggle "Read More" for description
    const toggleDescription = (podcastId) => {
        setReadMoreState((prev) => ({
            ...prev,
            [podcastId]: !prev[podcastId],
        }));
    };

    // Render read more/less button
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

    useEffect(() => {
        handleFilterChange();
    }, [selectedGenre, searchQuery]); // Re-run filter whenever genre or search query changes

    if (loading) {
        return <p>Loading...</p>;
    }

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
                    <input
                        type="text"
                        name="title"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <select
                        name="genre"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="all">All Genres</option>
                        <option value="1">True Crime</option>
                        <option value="2">Storytelling</option>
                        <option value="3">History</option>
                        {/* Add more genres dynamically if necessary */}
                    </select>
                    <button type="submit">Search</button>
                </form>
            </div>

            {/* Podcasts Preview */}
            <div className="cool-preview">
                {filteredPodcasts.length > 0 ? (
                    filteredPodcasts.map((podcast) => (
                        <div key={podcast.id} className="card-image">
                            <img
                                src={podcast.image || "https://via.placeholder.com/150"}
                                alt={podcast.title}
                                className="card-image"
                            />
                            <h3>{podcast.title}</h3>

                            {renderDescription(podcast.description, podcast.id)}

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
