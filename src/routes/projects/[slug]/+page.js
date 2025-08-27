import { error } from '@sveltejs/kit';
import { allProjects } from '$lib/data/projects.js';

export async function load({ params }) {
	const project = allProjects.find(p => p.slug === params.slug);
	
	if (!project) {
		error(404, 'Project not found');
	}
	
	return {
		project
	};
}