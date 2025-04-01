import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Favorites from "./pages/Favorites";
import PodcastDetails from "./pages/PodcastInfo";

export default function App() {
  return (
    <Router>
      <header>
        <nav>
          <a href="/" className="site-logo">#COOLPODCAST</a>
          <a href="/shows">Shows</a>
          <a href="/favorite">Favorites</a>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows/:podcastId" element={<PodcastDetails />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
