// Unsplash API Configuration
import { UNSPLASH_ACCESS_KEY, UNSPLASH_USERNAME } from '$env/static/private';

export const UNSPLASH_API_URL = 'https://api.unsplash.com';

export const unsplashConfig = {
	accessKey: UNSPLASH_ACCESS_KEY,
	username: UNSPLASH_USERNAME || 'your_username_here', // fallback if not set
	apiUrl: UNSPLASH_API_URL,
	// Default parameters for photo requests
	defaultParams: {
		per_page: 12, // Number of photos to fetch
		order_by: 'latest' // latest, oldest, popular, views, downloads
	}
};

/**
 * Create headers for Unsplash API requests
 */
export function createHeaders() {
	return {
		Authorization: `Client-ID ${unsplashConfig.accessKey}`,
		'Content-Type': 'application/json'
	};
}

/**
 * Build URL for fetching user photos
 * @param {string} username - Unsplash username
 * @param {Object} params - Query parameters
 */
export function buildUserPhotosUrl(username, params = {}) {
	const searchParams = new URLSearchParams({
		...unsplashConfig.defaultParams,
		...params
	});
	
	return `${unsplashConfig.apiUrl}/users/${username}/photos?${searchParams.toString()}`;
}

/**
 * Build URL for fetching user statistics
 * @param {string} username - Unsplash username
 */
export function buildUserStatsUrl(username) {
	return `${unsplashConfig.apiUrl}/users/${username}/statistics`;
}

/**
 * Build URL for searching photos
 * @param {string} query - Search query
 * @param {Object} params - Query parameters
 */
export function buildSearchUrl(query, params = {}) {
	const searchParams = new URLSearchParams({
		query,
		...unsplashConfig.defaultParams,
		...params
	});
	
	return `${unsplashConfig.apiUrl}/search/photos?${searchParams.toString()}`;
}