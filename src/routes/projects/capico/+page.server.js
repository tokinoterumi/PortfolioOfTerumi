import { marked } from 'marked';
import { getProjectBySlug } from '$lib/data/projects.js';

export async function load() {
	try {
		// Get project data
		const project = getProjectBySlug('capico');

		// Import markdown file directly using Vite's raw import
		const markdownModule = await import('$lib/data/project-content/capico-case-study.md?raw');
		const markdownContent = markdownModule.default;

		// Parse markdown to HTML
		const htmlContent = marked(markdownContent);

		return {
			project,
			caseStudyContent: htmlContent
		};
	} catch (error) {
		console.error('Error loading case study content:', error);
		return {
			project: null,
			caseStudyContent: '<p>Error loading case study content.</p>'
		};
	}
}