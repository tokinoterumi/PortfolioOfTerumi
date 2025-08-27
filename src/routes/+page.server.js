import { fetchUserPhotos } from '$lib/services/unsplash.js';
import { error } from '@sveltejs/kit';
import { customCaptions } from '$lib/data/captions.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// Fetch photos for the homepage gallery section
		const photos = await fetchUserPhotos('driftingislander', {
			per_page: 12, // Fewer photos for homepage section
			order_by: 'popular' // Show popular photos first
		});

		// Transform data for the Gallery component
		const processedPhotos = photos.map(photo => {
			// Check if we have custom caption data for this photo
			const captionData = customCaptions.get(photo.id);

			return {
				id: photo.id,
				alt: photo.alt,
				urls: {
					small: photo.urls.small,
					regular: photo.urls.regular,
					full: photo.urls.full
				},
				created_at: photo.created_at,
				likes: photo.likes,
				downloads: photo.downloads,
				color: photo.color,
				// Use custom captions if available, otherwise fallback to Unsplash data
				title: captionData?.title || photo.description || 'Untitled',
				story: captionData?.story || photo.alt || 'A wanderer\'s moment captured'
			};
		});

		return {
			photos: processedPhotos
		};

	} catch (err) {
		console.error('Failed to load homepage photos:', err);
		// Don't fail the entire page if photos can't load
		return {
			photos: []
		};
	}
}