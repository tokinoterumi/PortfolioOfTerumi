<script>
	import { onMount } from 'svelte';
	export let visible = false;
</script>

<header class="site-header" class:scrolled={visible}>
	<div class="header-content">
		<!-- The brand/logo is now the primary content of the header -->
		<div class="brand">
			<a href="/" class="brand-link" aria-label="Back to homepage">
				<span class="brand-text">Terumi</span>
			</a>
		</div>
	</div>
</header>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1050;

		/* Initial State: Invisible, off-screen, and fully transparent */
		opacity: 0;
		transform: translateY(-100%);
		pointer-events: none;
		background-color: transparent;

		/* Smooth transition for all properties */
		transition:
			opacity 0.4s ease,
			transform 0.4s ease,
			background-color 0.4s ease,
			border-color 0.4s ease;
	}

	/* Scrolled State: Visible and on-screen */
	.site-header.scrolled {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
		background-color: rgba(245, 245, 244, 0.8); /* Slightly transparent background */
		border-bottom: 1px solid rgba(170, 178, 189, 0.2); /* Subtle border */

		/* Frosted glass effect */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.header-content {
		display: flex;
		/* MODIFIED: Justify to the end since only the brand remains */
		justify-content: flex-end;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		padding: 1.5rem 2rem;
		/* Ensure header content doesn't overlap hamburger menu */
		padding-right: 5rem;
	}

	.brand-link {
		text-decoration: none;
	}

	.brand-text {
		font-family: 'Urbanist', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary, #333333);
		transition: color 0.3s ease;
	}

	.brand-link:hover .brand-text {
		color: var(--darkroom-red, #b22222);
	}

	/* --- Responsive Design --- */
	@media (max-width: 768px) {
		.header-content {
			padding: 1rem 1.5rem;
			padding-right: 4rem;
		}
	}
</style>
