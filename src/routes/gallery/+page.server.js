import { fetchUserPhotos } from '$lib/services/unsplash.js';
import { error } from '@sveltejs/kit';
import { customCaptions } from '$lib/data/captions.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const photos = await fetchUserPhotos('driftingislander', {
			per_page: 25,
			order_by: 'latest'
		});

		// Transform data for the gallery component
		const processedPhotos = photos.map(photo => {
			// Check if we have custom caption data for this photo
			const captionData = customCaptions.get(photo.id);

			return {
				id: photo.id,
				alt: photo.alt,
				blurhash: photo.blurhash || null,
				urls: {
					small: photo.urls.small,
					regular: photo.urls.regular,
					full: photo.urls.full
				},
				created_at: photo.created_at,
				likes: photo.likes,
				downloads: photo.downloads,
				location: photo.location,
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
		console.error('Gallery loading failed:', err);
		throw error(500, 'Failed to load gallery images');
	}
}