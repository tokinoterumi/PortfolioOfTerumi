export const featuredProjects = [
	{
		id: 'capico',
		title: 'Capico for YIC',
		subtitle: 'Folklore Documentation Platform',
		description: 'A full-stack web application for preserving and sharing traditional Japanese stories and customs. Built with SvelteKit and featuring advanced search, multimedia support, and community contributions.',
		category: 'Development',
		year: '2025',
		technologies: ['SvelteKit', 'PWA', 'Google Apps Script', 'Tailwind CSS'],
		color: 'cyanotype-blue',
		featured: true,
		size: 'large',
		image: '/projects/cultural-archive.jpg',
		slug: 'capico-for-yic'
	},
	{
		id: 'capicar',
		title: 'CapiCar for YOS',
		subtitle: 'Documentary Photography Series',
		description: 'An intimate portrait series capturing the everyday moments and stories of Tokyo residents. Shot over 12 months across various districts.',
		category: 'Photography',
		year: '2025',
		technologies: ['Documentary', 'Street Photography', 'Film & Digital'],
		color: 'polaroid-yellow',
		featured: true,
		size: 'medium',
		image: '/projects/street-portraits.jpg',
		slug: 'street-portraits'
	},
	{
		id: 'inbound-stats',
		title: 'Inbound Stats for YIC',
		subtitle: 'Heritage Research Project',
		description: 'Documenting traditional Japanese craftsmanship techniques and the artisans who preserve them. Combining oral history with visual documentation.',
		category: 'Folklore',
		year: '2023-2024',
		technologies: ['Ethnographic Research', 'Oral History', 'Cultural Analysis'],
		color: 'darkroom-red',
		featured: true,
		size: 'medium',
		image: '/projects/craft-traditions.jpg',
		slug: 'craft-traditions'
	},
	{
		id: 'streetcorner-photo-show-in-showayu',
		title: 'A Corner Photo Show: The Stirring Seascape',
		subtitle: 'Minimalist Web Design',
		description: 'This portfolio website showcasing minimalist design principles and modern web technologies. Focus on performance and accessibility.',
		category: 'Development',
		year: '2024',
		technologies: ['Vessels', 'Harbors', 'Furusato'],
		color: 'cyanotype-blue',
		featured: true,
		size: 'small',
		image: '/projects/portfolio-site.jpg',
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