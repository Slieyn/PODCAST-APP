import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Favorites from "./pages/Favorites";
import PodcastDetails from "./pages/PodcastInfo";
import EpisodeDetail from "./pages/EpisodeDetail"; 
import EpisodeList from "./pages/EpisodeList";
import AudioPlayer from "./pages/AudioPlayer";
import { AudioPlayerProvider } from "./pages/AudioPlayerContext";

export default function App() {
  return (
    <AudioPlayerProvider> {/* ✅ Moved AudioPlayerProvider to wrap Router */}
      <Router>
        <header>
          <nav>
            <Link to="/" className="site-logo">#COOLPODCAST</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/favorite">Favorites</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows/:podcastId" element={<PodcastDetails />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/episodes" element={<EpisodeList />} /> {/* ✅ Fixed conflict */}
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>

        <AudioPlayer /> {/* ✅ Audio player at the bottom of the app */}
      </Router>
    </AudioPlayerProvider>
  );
}
