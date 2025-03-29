

/**
 * @file Theme management module that handles light and dark mode settings for the podcast app.
 * @module theme
 */

/**
 * Automatically applies the theme based on the user's system preference.
 * Uses the `prefers-color-scheme` media query to detect dark mode.
 */
export function applyTheme() {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    // Set theme based on system preference
    const theme = isDarkMode ? "night" : "day";
    setTheme(theme);
  }
  
  /**
   * Sets the theme colors for the podcast application.
   *
   * @param {"day" | "night"} theme - The selected theme ("day" for light mode, "night" for dark mode).
   */
  export function setTheme(theme) {
    const colors = {
      night: { background: "rgb(10, 10, 20)", text: "rgb(255, 255, 255)", button: "rgb(30, 30, 50)" }, // Dark mode colors
      day: { background: "rgb(255, 255, 255)", text: "rgb(10, 10, 20)", button: "rgb(200, 200, 200)" }, // Light mode colors
    };
  
    // Apply colors to CSS variables
    document.documentElement.style.setProperty(
      "--color-background",
      colors[theme].background
    );
    document.documentElement.style.setProperty(
      "--color-text",
      colors[theme].text
    );
    document.documentElement.style.setProperty(
      "--color-button",
      colors[theme].button
    );
  }
  
  /**
   * Handles the theme selection form submission.
   * Retrieves the selected theme from the form and updates the theme accordingly.
   *
   * @param {Event} event - The form submission event.
   */
  export function handleThemeSettings(event) {
    event.preventDefault();
  
    // Get the selected theme from the form
    const formData = new FormData(event.target);
    setTheme(formData.get("theme"));
  }
  