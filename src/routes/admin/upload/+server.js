import { put } from '@vercel/blob';
import { json } from '@sveltejs/kit';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { Buffer } from 'node:buffer';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file || typeof file === 'string') {
			return json({ message: 'No file found or invalid file format.' }, { status: 400 });
		}

		const body = await file.arrayBuffer();
		const buffer = Buffer.from(body);

		const blob = await put(file.name, buffer, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

		return json(blob);
	} catch (error) {
		console.error('API Upload Error:', error);
		return json({ message: `Upload failed: ${error.message}` }, { status: 500 });
	}
}
