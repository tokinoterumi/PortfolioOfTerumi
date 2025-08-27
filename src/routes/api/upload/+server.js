import { put } from '@vercel/blob';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file || !(file instanceof File)) {
			return json({ message: 'No file provided' }, { status: 400 });
		}

		// Convert file to buffer for Vercel Blob
		const buffer = await file.arrayBuffer();

		// The `put` function from @vercel/blob handles the upload
		const blob = await put(file.name, buffer, {
			access: 'public',
		});

		// It returns an object with the public URL of the uploaded file
		return json(blob);
	} catch (error) {
		console.error('Upload error:', error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
}