import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import { ThemeToggle } from "./Components/ThemeToggle";  // Import the ThemeToggle component
import Favorites from "./pages/Favorites";
import PodcastInfo from "./pages/PodcastInfo";
import PodcastList from "./pages/PodcastList";
import EpisodeDetail from "./pages/EpisodeDetail";
import EpisodeList from "./pages/EpisodeList";
import AudioPlayer from "./pages/AudioPlayer";
import { AudioPlayerProvider } from "./pages/AudioPlayerContext";
import { applyTheme } from "./Components/Theme";  // Import applyTheme to set the theme on load

function App() {
  // Apply the theme on component mount
  useEffect(() => {
    applyTheme();  // Apply the initial theme when the component is mounted
  }, []);

  return (
    <AudioPlayerProvider>
      <Router>
        <header>
          <nav>
            <Link to="/" className="site-logo">#COOLPODCAST</Link>
            <Link to="/podcasts">Podcasts</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/favorite">Favorites</Link>
          </nav>
          <div className="theme-toggle-container">
            <ThemeToggle /> {/* ✅ Moves toggle to the far right */}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows/:podcastId" element={<PodcastInfo />} />
          <Route path="/podcasts" element={<PodcastList />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/episodes" element={<EpisodeList />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>

        <AudioPlayer />
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
