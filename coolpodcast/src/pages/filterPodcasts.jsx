// This function filters podcasts based on search criteria (genre, title).
export function filterPodcasts(podcasts, filters) {
  return podcasts.filter((podcast) => {
    // Check if podcast.genres is an array before calling 'includes'
    const genreMatch =
      filters.genre === "any" ||
      (Array.isArray(podcast.genres) && podcast.genres.includes(parseInt(filters.genre)));

    const titleMatch =
      filters.title.trim() === "" ||
      podcast.title.toLowerCase().includes(filters.title.toLowerCase());

    return genreMatch && titleMatch;
  });
}
