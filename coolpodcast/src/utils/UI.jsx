/**
 * @file UI utility functions for managing overlays, dropdowns, and podcast previews.
 * @module ui
 */

import { genres } from "../utils/Data";

const PODCASTS_PER_PAGE = 6; // Number of podcasts displayed per page

/**
 * Toggles the visibility of an overlay (modal).
 *
 * @param {string} selector - The CSS selector of the overlay element.
 * @param {boolean} isOpen - Determines whether the overlay should be opened (true) or closed (false).
 */
export function toggleOverlay(selector, isOpen) {
  const overlay = document.querySelector(selector);
  if (overlay) overlay.open = isOpen;
}

/**
 * Populates a dropdown list with data options.
 *
 * @param {Object} data - The data object containing key-value pairs (e.g., authors or genres).
 * @param {string} selector - The CSS selector of the dropdown element.
 * @param {string} defaultText - The default option text (e.g., "All Genres").
 */
export function populateDropdown(data, selector, defaultText) {
  const dropdown = document.querySelector(selector);
  dropdown.innerHTML =
    `<option value="any">${defaultText}</option>` + // Default option
    Object.entries(data)
      .map(([id, name]) => `<option value="${id}">${name}</option>`)
      .join(""); // Convert data object into dropdown options
}

/**
 * Creates a podcast preview button element.
 *
 * @param {Object} podcast - The podcast object containing details like genre, id, image, title, and description.
 * @param {string} podcast.id - The unique identifier of the podcast.
 * @param {string} podcast.image - The podcast cover image URL.
 * @param {string} podcast.title - The title of the podcast.
 * @param {string} podcast.description - A brief description of the podcast.
 * @returns {HTMLButtonElement} - A button element containing podcast preview details.
 */
export function createPodcastPreviewButton({ id, image, title, description }) {
  const button = document.createElement("button");
  button.classList.add("preview"); // Assigns class for styling
  button.setAttribute("data-preview", id); // Adds dataset for preview identification
  button.innerHTML = `
    <img class="preview__image" src="${image}" alt="Podcast Cover" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <p class="preview__description">${description}</p>
    </div>`;
  return button;
}

/**
 * Renders podcast previews on the page.
 *
 * @param {Array<Object>} podcastList - An array of podcast objects to be displayed.
 */
export function renderPodcastPreviews(podcastList) {
  const fragment = document.createDocumentFragment(); // Improves performance by reducing reflows
  podcastList.slice(0, PODCASTS_PER_PAGE).forEach((podcast) => {
    fragment.appendChild(createPodcastPreviewButton(podcast));
  });

  // Append podcast previews to the list container
  document.querySelector("[data-list-items]").appendChild(fragment);
}
