<script>
	import { getFeaturedProjects } from '$lib/data/projects.js';
	import { onMount } from 'svelte';

	const featuredProjects = getFeaturedProjects();

	let sectionElement;
	let isVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			if (sectionElement) observer.unobserve(sectionElement);
		};
	});
</script>

<section
	class="relative py-32 px-0"
	style="background-color: #f8f8f7;"
	bind:this={sectionElement}
>
	<div class="container mx-auto max-w-6xl px-8 2xl:max-w-7xl">
		<!-- Section Header -->
		<div class="relative mb-24 flex justify-end pr-8 lg:justify-start lg:pr-0 lg:pl-4">
			<div class="relative z-10 max-w-2xl text-right lg:text-left">
				<h2
					class="mb-4 leading-tight font-bold text-4xl"
					style="color: #333333;"
				>
					HANDPRINTS
				</h2>
				<p
					class="m-0 text-lg leading-relaxed font-normal"
					style="font-family: 'Inter', sans-serif; color: #AAB2BD;"
				>
					A crafter's journal
				</p>
			</div>
		</div>

		<!-- Projects Grid -->
		<div
			class="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
			class:animate-projects={isVisible}
		>
			{#each featuredProjects as project, i (project.id)}
				<article
					class="project-card translate-y-8 opacity-0"
					class:delay-1={i === 1}
					class:delay-2={i === 2}
					class:delay-3={i === 3}
				>
					<a
						href="/projects/{project.slug}"
						class="block h-full text-inherit no-underline transition-transform duration-[400ms] ease-in-out"
					>
						<!-- Project Image with 3:2 aspect ratio -->
						<div
							class="relative overflow-hidden bg-gray-100 transition-transform duration-[400ms] ease-in-out"
							style="aspect-ratio: 3 / 2;"
						>
							<img
								src={project.image}
								alt={project.title}
								class="h-full w-full object-cover"
							class:object-top={project.id === 'inbound-stats' || project.id === 'streetcorner-photo-show-in-showayu'}
							/>
						</div>

						<!-- Project Info -->
						<div class="flex flex-col gap-4 py-6">
							<h3
								class="m-0 text-xl leading-tight font-semibold"
								style="color: #333333;"
							>
								{project.title}
							</h3>

							<!-- View Case Study text that appears on hover -->
							<p
								class="view-case-study m-0 -translate-y-2 text-sm font-medium opacity-0 transition-all duration-300 ease-in-out"
								style="color: #AAB2BD;"
							>
								View Case Study →
							</p>

							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech (tech)}
									<span
										class="bg-gray-200 px-2 py-1 text-xs font-normal"
										style="color: #666666;"
									>
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Hover effects */
	.project-card a:hover > div:first-child {
		transform: scale(1.05);
	}

	.project-card a:hover .view-case-study {
		opacity: 1;
		transform: translateY(0);
	}

	/* Animation keyframes */
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(2rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Animation classes */
	.animate-projects .project-card {
		animation: slideInUp 0.8s ease-out forwards;
	}

	.animate-projects .project-card.delay-1 {
		animation-delay: 0.15s;
	}

	.animate-projects .project-card.delay-2 {
		animation-delay: 0.3s;
	}

	.animate-projects .project-card.delay-3 {
		animation-delay: 0.45s;
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.project-card {
			transition: none !important;
			opacity: 1 !important;
			transform: none !important;
		}

		.animate-projects .project-card {
			animation: none !important;
		}

		.view-case-study {
			transition: none !important;
		}
	}
</style>