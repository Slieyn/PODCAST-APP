// This function filters podcasts based on search criteria (genre, title).
export function filterPodcasts(podcasts, filters) {
    return podcasts.filter((podcast) => {
      const genreMatch =
        filters.genre === "any" || podcast.genres.includes(parseInt(filters.genre));
      const titleMatch =
        filters.title.trim() === "" ||
        podcast.title.toLowerCase().includes(filters.title.toLowerCase());
      return genreMatch && titleMatch;
    });
  }
  