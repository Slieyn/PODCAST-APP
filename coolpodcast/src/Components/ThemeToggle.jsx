import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons for sun (day mode) and moon (night mode)
import { setTheme } from "../Components/Theme"; // Import the setTheme function for applying the theme

/**
 * ThemeToggle component that allows users to toggle between dark mode and light mode.
 * It changes the theme and stores the user's preference in localStorage.
 * 
 * @component
 * @returns {JSX.Element} Button to toggle between dark mode and light mode.
 */
export function ThemeToggle() {
  // State to track whether dark mode is enabled or not. It checks the saved preference in localStorage.
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "night" // If the theme is stored as "night", set dark mode to true.
  );

  /**
   * useEffect hook to toggle the "dark-mode" class on the document root when the theme changes.
   * This ensures that the page reflects the correct theme when it is loaded or when toggled.
   */
  useEffect(() => {
    // Toggle "dark-mode" class on <html> element based on the state of dark mode
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]); // Dependency array: Re-run the effect when isDarkMode changes.

  /**
   * Toggles the theme between "day" and "night" modes.
   * Updates the theme state, applies the new theme, and stores the preference in localStorage.
   * 
   * @function
   */
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "day" : "night"; // Switch theme based on current state
    setTheme(newTheme); // Call setTheme to apply the new theme
    setIsDarkMode(!isDarkMode); // Toggle the state to reflect the new theme
    localStorage.setItem("theme", newTheme); // Save the new theme preference in localStorage
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {/* Display sun icon for dark mode, moon icon for light mode */}
      {isDarkMode ? <FaSun size={24} color="#FFD700" /> : <FaMoon size={24} color="#8A8A8A" />}
    </button>
  );
}
