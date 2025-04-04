// Import necessary modules from React and React Router
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import page components
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Favorites from "./pages/Favorites";
import PodcastInfo from "./pages/PodcastInfo";
import PodcastList from "./pages/PodcastList";
import EpisodeDetail from "./pages/EpisodeDetail";
import EpisodeList from "./pages/EpisodeList";
import AudioPlayer from "./pages/AudioPlayer";

// Import context provider for the audio player
import { AudioPlayerProvider } from "./pages/AudioPlayerContext";

// Import theme utilities
import { ThemeToggle } from "./Components/ThemeToggle";  // Component for toggling themes
import { applyTheme } from "./Components/Theme";  // Function to apply the theme on load

/**
 * The main App component that sets up routing and global providers.
 * It initializes the theme on mount and provides the global audio player.
 * @returns {JSX.Element} The App component
 */
function App() {
  // Apply the theme when the component mounts
  useEffect(() => {
    applyTheme();  // Ensures the correct theme is applied when the app loads
  }, []);

  return (
    <AudioPlayerProvider> {/* Provides global audio player state */}
      <Router>
        <header>
          <nav>
            <Link to="/" className="site-logo">#COOLPODCAST</Link>
            <Link to="/podcasts">Podcasts</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/favorite">Favorites</Link>
          </nav>
          <div className="theme-toggle-container">
            <ThemeToggle /> {/* Theme toggle button */}
          </div>
        </header>

        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows/:podcastId" element={<PodcastInfo />} />
          <Route path="/podcasts" element={<PodcastList />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/episodes" element={<EpisodeList />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>

        {/* Global audio player component */}
        <AudioPlayer />
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
