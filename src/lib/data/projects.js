import capicoImage from '$lib/assets/capico-case-study-cover.png';
import inboundStatsImage from '$lib/assets/inboundstats-case-study-cover.png';
import capicarImage from '$lib/assets/capicar-case-study-cover.png';

export const featuredProjects = [
	{
		id: 'capico',
		title: 'Capico for YIC: An Operation Assistant for Visitor Center',
		technologies: ['SvelteKit', 'PWA', 'Google Apps Script', 'Tailwind CSS'],
		featured: true,
		size: 'large',
		image: capicoImage,
		slug: 'capico',
		pdfPath: '/capicokeynote.pdf'
	},
	{
		id: 'capicar',
		title: 'CapiCar: A Lightweight WES for Growing Small Business',
		technologies: ['SwiftUI', 'Make', 'Express', 'Native App', 'Automation', 'Offline-First', 'Distributed Systems'],
		featured: true,
		size: 'medium',
		image: capicarImage,
		slug: 'capicar',
		pdfPath: '/capicarkeynote.pdf'
	},
	{
		id: 'inbound-stats',
		title: 'Inbound Stats @YIC: A Custom BI-Tool for Data-Driven Tourism',
		technologies: ['Google Apps Script', 'Data Governance', 'Data-Driven System Building'],
		featured: true,
		size: 'medium',
		image: inboundStatsImage,
		slug: 'inbound-stats',
		pdfPath: '/inboundstatskeynote.pdf'
	},
	{
		id: 'streetcorner-photo-show-in-showayu',
		title: 'A Corner Photo Show: The Stirring Seascape',
		technologies: ['Vessels', 'Harbors', 'Shikoku', 'Setouchi', 'Pacific Ocean'],
		featured: true,
		size: 'small',
		image: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/poster-in-showayu.jpg',
		slug: 'streetcorner-photo-show-in-showayu'
	}
];

export const allProjects = [
	...featuredProjects,
];

// Helper function to get all projects
export function getProjects() {
	return allProjects;
}

// Helper function to get featured projects
export function getFeaturedProjects() {
	return featuredProjects.filter(project => project.featured);
}

// Helper function to get projects by category
export function getProjectsByCategory(category) {
	return allProjects.filter(project =>
		project.category.toLowerCase() === category.toLowerCase()
	);
}

// Helper function to get project by slug
export function getProjectBySlug(slug) {
	return allProjects.find(project => project.slug === slug);
}