/**
 * Filters podcasts based on the provided search criteria (genre and title).
 *
 * @param {Array} podcasts - The list of all available podcasts.
 * @param {Object} filters - The filter criteria containing genre and title.
 * @param {string} filters.genre - The selected genre (ID as a string or "any").
 * @param {string} filters.title - The search query for the podcast title.
 * @returns {Array} - The filtered list of podcasts matching the criteria.
 */
export function filterPodcasts(podcasts, filters) {
  return podcasts.filter((podcast) => {
    // Check if the genre matches:
    // - If "any" is selected, all genres are included
    // - If podcast.genres is an array, check if it includes the selected genre
    const genreMatch =
      filters.genre === "any" ||
      (Array.isArray(podcast.genres) && podcast.genres.includes(parseInt(filters.genre)));

    // Check if the title matches (case-insensitive search)
    const titleMatch =
      filters.title.trim() === "" || // If no title is provided, allow all
      podcast.title.toLowerCase().includes(filters.title.toLowerCase());

    return genreMatch && titleMatch; // Include podcast if both conditions are met
  });
}
