import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Shows from "./pages/Shows"
import Favorites from "./pages/Favorites"
import './Components/Theme'
import './index.css'





function App() {
  return (                      
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">#COOLPODCAST</Link>
        <nav>
          <Link to="/shows">Shows</Link>
          <Link to="/favorite">Favorites</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);