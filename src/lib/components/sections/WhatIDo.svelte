<script>
	import { onMount } from 'svelte';

	const roles = [
		{
			id: 'developer',
			title: 'DEVELOPER',
			accentColor: 'var(--cyanotype-blue)',
			content: {
				description:
					'An intruder lost between folklore and firmware, tinkering systems that locals might mistake for witchcraft.'
			}
		},
		{
			id: 'photographer',
			title: 'PHOTOGRAPHER',
			accentColor: 'var(--darkroom-red)',
			content: {
				description:
					"Or more precisely: a <em>satoyama</em> wanderer, chasing light along the Pacific and Setouchi coastlines."
			}
		},
	];

	let sectionElement;
	let isVisible = $state(false);

	// --- Intersection Observer for entry animation ---
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

		return () => observer.disconnect();
	});
</script>

<!-- 
  This section now contains both the desktop and mobile layouts,
  using Tailwind's responsive classes (`lg:hidden`, `lg:grid`) to toggle visibility.
-->
<section class="what-i-do-section" bind:this={sectionElement} class:visible={isVisible}>
	<!-- Desktop Layout (hidden on mobile/tablet) -->
	<div class="content-container hidden lg:grid">
		<div class="roles-wrapper">
			{#each roles as role, i (role.id)}
				<div class="role-item">
					<h3 class="role-title" style="color: {role.accentColor};">
						{role.title}
					</h3>
					<div class="role-content">
						<h4 class="role-subtitle">{role.content.subtitle}</h4>
						<p class="role-description">{@html role.content.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Mobile/Tablet Layout (hidden on large screens) -->
	<div class="mobile-container lg:hidden">
		{#each roles as role (role.id)}
			<div class="mobile-role-item">
				<h3 class="mobile-role-title" style="color: {role.accentColor};">
					{role.title}
				</h3>
				<div class="mobile-role-content">
					<h4 class="mobile-role-subtitle">
						{role.content.subtitle}
					</h4>
					<p class="mobile-role-description">
						{@html role.content.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.what-i-do-section {
		padding: 8rem 2rem;
		background-color: var(--background-light);
		opacity: 0;
		transition: opacity 1s ease-out;
	}
	.what-i-do-section.visible {
		opacity: 1;
	}

	/* --- Desktop Styles --- */
	.content-container {
		max-width: 1200px;
		margin: 0 auto;
	}

  .roles-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5rem;
  }

	.role-item {
		text-align: left;
		opacity: 0;
		transform: translateY(2rem);
		animation: fadeInUp 0.8s ease-out forwards;
	}

	.what-i-do-section.visible .role-item:nth-child(1) {
		animation-delay: 0.1s;
	}
	.what-i-do-section.visible .role-item:nth-child(2) {
		animation-delay: 0.2s;
	}
	.what-i-do-section.visible .role-item:nth-child(3) {
		animation-delay: 0.3s;
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.role-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 3rem;
		line-height: 1;
		margin-bottom: 2rem;
	}

	.role-description {
		font-family: 'DM Sans', sans-serif;
			font-weight: lighter;
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0;
	}

	/* --- Mobile Styles --- */
	.mobile-container {
		max-width: 42rem; /* 672px */
		margin: 0 auto;
		padding: 0 1rem;
	}

	.mobile-role-item {
		margin-bottom: 4rem;
	}
	.mobile-role-item:last-child {
		margin-bottom: 0;
	}

	.mobile-role-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 3.5rem;
		line-height: 1;
		margin-bottom: 1.5rem;
	}

	.mobile-role-description {
		font-family: 'DM Sans', sans-serif;
		font-size: 1rem;
		line-height: 1.8;
		color: var(--text-secondary);
		margin: 0;
	}

	/* --- Responsive Overrides --- */
	@media (max-width: 1024px) {
		/* Desktop styles adjustments for smaller desktops */
		.roles-wrapper {
			gap: 3rem;
		}
		.role-title {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 768px) {
		/* Global section padding for mobile */
		.what-i-do-section {
			padding: 6rem 1rem;
		}
	}
</style>
