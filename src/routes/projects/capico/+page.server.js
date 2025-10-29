import { marked } from 'marked';
import { getProjectBySlug } from '$lib/data/projects.js';

export async function load() {
	try {
		// Get project data
		const project = getProjectBySlug('capico');

		// Import both English and Japanese markdown files
		const markdownModuleEn = await import('$lib/data/project-content/capico-case-study.md?raw');
		const markdownModuleJa = await import('$lib/data/project-content/capico-case-study-ja.md?raw');

		// Parse markdown to HTML for both languages
		const htmlContentEn = marked(markdownModuleEn.default);
		const htmlContentJa = marked(markdownModuleJa.default);

		return {
			project,
			caseStudyContent: {
				en: htmlContentEn,
				ja: htmlContentJa
			}
		};
	} catch (error) {
		console.error('Error loading case study content:', error);
		return {
			project: null,
			caseStudyContent: {
				en: '<p>Error loading case study content.</p>',
				ja: '<p>ケーススタディの読み込みに失敗しました。</p>'
			}
		};
	}
}