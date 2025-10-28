import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProjectBySlug } from '$lib/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function load() {
	try {
		// Get project data
		const project = getProjectBySlug('capicar');

		// Read the markdown file
		const markdownPath = path.join(__dirname, '..', '..', '..', 'lib', 'data', 'project-content', 'capicar-case-study.md');
		const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

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