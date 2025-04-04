import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Favorites from "./pages/Favorites";
import PodcastInfo from "./pages/PodcastInfo";
import Seasons from "./pages/Seasons";
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
            <Link to="/seasons"> Seasons </Link>


          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows/:podcastId" element={<PodcastInfo />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/episodes" element={<EpisodeList />} />
          <Route path="/episode/:id" element={<EpisodeDetail episode={EpisodeDetail} />} />
          <Route path="/seasons" element={<Seasons />} />
        


        </Routes>

        <AudioPlayer /> {/* ✅ Audio player at the bottom of the app */}
      </Router>
    </AudioPlayerProvider>
  );
}
