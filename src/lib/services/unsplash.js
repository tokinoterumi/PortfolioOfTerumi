// Unsplash API Service Functions
import { createHeaders, buildUserPhotosUrl, buildUserStatsUrl, unsplashConfig } from '$lib/config/unsplash.js';

/**
 * Fetch user photos from Unsplash
 * @param {string} username - Unsplash username (optional, uses config default)
 * @param {Object} options - Additional options
 */
export async function fetchUserPhotos(username = unsplashConfig.username, options = {}) {
	try {
		const url = buildUserPhotosUrl(username, options);
		const headers = createHeaders();

		const response = await fetch(url, { headers });
		
		if (!response.ok) {
			throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
		}

		const photos = await response.json();
		
		// Transform the data to match our needs
		return photos.map(photo => ({
			id: photo.id,
			description: photo.description || photo.alt_description || '',
			urls: {
				raw: photo.urls.raw,
				full: photo.urls.full,
				regular: photo.urls.regular,
				small: photo.urls.small,
				thumb: photo.urls.thumb
			},
			alt: photo.alt_description || photo.description || 'Untitled',
			width: photo.width,
			height: photo.height,
			color: photo.color,
			created_at: photo.created_at,
			updated_at: photo.updated_at,
			likes: photo.likes,
			downloads: photo.downloads,
			location: photo.location,
			exif: photo.exif,
			tags: photo.tags || [],
			user: {
				name: photo.user.name,
				username: photo.user.username,
				profile_image: photo.user.profile_image
			},
			links: {
				html: photo.links.html,
				download: photo.links.download
			}
		}));
	} catch (error) {
		console.error('Error fetching user photos:', error);
		throw error;
	}
}

/**
 * Fetch user statistics from Unsplash
 * @param {string} username - Unsplash username (optional, uses config default)
 */
export async function fetchUserStats(username = unsplashConfig.username) {
	try {
		const url = buildUserStatsUrl(username);
		const headers = createHeaders();

		const response = await fetch(url, { headers });
		
		if (!response.ok) {
			throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
		}

		const stats = await response.json();
		
		return {
			downloads: {
				total: stats.downloads.total,
				historical: stats.downloads.historical
			},
			views: {
				total: stats.views.total,
				historical: stats.views.historical
			},
			likes: {
				total: stats.likes.total,
				historical: stats.likes.historical
			}
		};
	} catch (error) {
		console.error('Error fetching user stats:', error);
		throw error;
	}
}

/**
 * Format large numbers for display (e.g., 1000 -> 1K)
 * @param {number} num - Number to format
 */
export function formatNumber(num) {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
}

/**
 * Get optimized image URL for different screen sizes
 * @param {Object} urls - Photo URLs object from Unsplash
 * @param {string} size - Desired size ('thumb', 'small', 'regular', 'full')
 * @param {Object} params - Additional parameters (w, h, fit, etc.)
 */
export function getOptimizedImageUrl(urls, size = 'regular', params = {}) {
	const baseUrl = urls[size] || urls.regular;
	
	if (Object.keys(params).length === 0) {
		return baseUrl;
	}
	
	const searchParams = new URLSearchParams(params);
	const separator = baseUrl.includes('?') ? '&' : '?';
	
	return `${baseUrl}${separator}${searchParams.toString()}`;
}