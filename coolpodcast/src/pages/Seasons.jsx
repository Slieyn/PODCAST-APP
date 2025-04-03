import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Seasons() {
    const { id } = useParams(); // Get podcast ID from URL
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPodcastData = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
                const data = await response.json();
                setPodcast(data); // Save podcast data to state
            } catch (error) {
                console.error("Error fetching podcast data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcastData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!podcast) return <p>No podcast found</p>;

    return (
        <div>
            <h1>{podcast.title}</h1>
            <img src={podcast.image} alt={podcast.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            <p>{podcast.description}</p>

            {/* Render seasons */}
            {podcast.seasons && podcast.seasons.map((season) => (
                <div key={season.id} className="season">
                    <h2>Season {season.number}: {season.title}</h2>
                    <img src={season.image} alt={season.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />

                    {/* Render episodes for this season */}
                    {season.episodes && season.episodes.map((episode) => (
                        <div key={episode.id} className="episode">
                            <h3>{episode.title}</h3>
                            <p>{episode.description}</p>

                            {/* Audio player */}
                            <audio controls>
                                <source src={episode.audio} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Seasons;
