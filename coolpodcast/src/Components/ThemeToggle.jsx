import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { setTheme } from "../Components/Theme"; // ✅ Ensure correct import

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "night"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "day" : "night";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDarkMode ? <FaSun size={24} color="#FFD700" /> : <FaMoon size={24} color="#8A8A8A" />}
    </button>
  );
}
