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
					class="mb-4 leading-tight font-light md:text-4xl lg:text-4xl"
					style="color: #333333;"
				>
					Systems to Stories
				</h2>
			</div>

			<div
				class="absolute top-1/2 right-0 z-0 -translate-y-2/5 text-gray-300 opacity-60 lg:right-auto lg:left-0 lg:-translate-y-1/2"
			>
				<svg
					width="80"
					height="80"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="h-20 w-20"
				>
					<!-- The outlined square -->
					<rect
						x="5"
						y="5"
						width="70"
						height="70"
						stroke="currentColor"
						stroke-width="2"
						vector-effect="non-scaling-stroke"
					/>
					<!-- The filled square, with a new class for animation -->
					<rect
						x="0"
						y="0"
						width="60"
						height="60"
						fill="currentColor"
						class="cubic-bezier-[0.25,1,0.5,1] inner-rect transition-transform duration-[400ms]"
					/>
				</svg>
			</div>
		</div>

		<!-- Projects Grid -->
		<div
			class="mb-24 grid grid-cols-[2fr_1fr_1fr] grid-rows-[auto_auto] gap-8 md:grid-cols-1 md:gap-6 lg:grid-cols-2 lg:gap-6"
			class:animate-projects={isVisible}
		>
			{#each featuredProjects as project, i (project.id)}
				<article
					class="project-card translate-y-8 opacity-0 {project.size}"
					class:delay-1={i === 1}
					class:delay-2={i === 2}
					class:delay-3={i === 3}
				>
					<a
						href="/projects/{project.slug}"
						class="block h-full text-inherit no-underline transition-transform duration-[400ms] ease-in-out"
					>
						<!-- Project Image -->
						<div
							class="large:h-80 small:h-40 relative h-52 overflow-hidden bg-gray-100 transition-transform duration-[400ms] ease-in-out md:h-48"
						>
							<div
								class="flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-50 via-stone-200 to-stone-50"
							>
								<!-- Placeholder background when image doesn't exist -->
								<div class="text-center">
									<span
										class="text-sm font-medium tracking-wider uppercase"
										style="color: #AAB2BD;"
									>
										{project.category}
									</span>
								</div>
							</div>
						</div>

						<!-- Project Info -->
						<div class="large:py-8 small:py-5 flex flex-col gap-4 py-6">
							<h3
								class="large:text-2xl m-0 text-xl leading-tight font-semibold"
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
	/* Grid Layout Sizes */
	.project-card.large {
		grid-column: 1;
		grid-row: 1 / 3; /* Span two rows */
	}

	.project-card.medium:nth-child(2) {
		grid-column: 2;
		grid-row: 1;
	}

	.project-card.medium:nth-child(3) {
		grid-column: 3;
		grid-row: 1;
	}

	.project-card.small {
		grid-column: 2 / 4; /* Span two columns */
		grid-row: 2;
	}

	/* Size-specific styles */
	.project-card.large .h-52 {
		height: 20rem; /* 320px */
	}

	.project-card.small .h-52 {
		height: 10rem; /* 160px */
	}

	/* Hover effects */
	.project-card a:hover .h-52 {
		transform: scale(1.05);
	}

	.project-card a:hover .view-case-study {
		opacity: 1;
		transform: translateY(0);
	}

	/* SVG animation */
	.inner-rect {
		transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
	}

	section:hover .inner-rect {
		transform: translate(5px, 5px);
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

	/* Removed unused CSS selector */

	/* Responsive grid adjustments */
	@media (max-width: 1024px) {
		.project-card.large {
			grid-column: 1 / 3;
			grid-row: 1;
		}

		.project-card.medium:nth-child(2) {
			grid-column: 1;
			grid-row: 2;
		}

		.project-card.medium:nth-child(3) {
			grid-column: 2;
			grid-row: 2;
		}

		.project-card.small {
			grid-column: 1 / 3;
			grid-row: 3;
		}
	}

	@media (max-width: 768px) {
		.project-card.large,
		.project-card.medium,
		.project-card.small {
			grid-column: 1;
			grid-row: auto;
		}

		.project-card .h-52,
		.project-card.large .h-52,
		.project-card.small .h-52 {
			height: 12rem !important; /* 192px */
		}
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

		.project-card a:hover .h-52 {
			transform: none !important;
		}

		.view-case-study {
			transition: none !important;
		}

		.inner-rect {
			transition: none !important;
		}
	}
</style>