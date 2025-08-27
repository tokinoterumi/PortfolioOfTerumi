<script>
	// No script logic needed for this component's core functionality.
	// All effects are handled by CSS for performance and simplicity.
</script>

<!-- 
	The root section container.
	- `group` is used to enable parent-hover effects on child elements.
	- The background is set to black as our base.
-->
<section class="group relative h-screen overflow-hidden bg-black">
	<!-- The photo unit, positioned top-right -->
	<div class="absolute top-0 right-0 h-[85vh] w-[90vw]">
		<div class="relative h-full w-full overflow-hidden">
			<img
				src="https://images.unsplash.com/photo-1755437928467-e66886951e8f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
				class="hero-image"
			/>
		</div>
	</div>

	<!-- 
		The headline, positioned bottom-left.
		The knockout effect is restored using mix-blend-mode.
	-->
	<h1 class="hero-headline">
		TERUMI TOKINO
	</h1>

	<!-- The scroll indicator, positioned based on the photo's height -->
	<div class="scroll-indicator">
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		filter: grayscale(1);
		transition: all 0.7s;
		transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
	}

	.group:hover .hero-image {
		filter: grayscale(0);
	}

	.hero-headline {
		position: absolute;
		bottom: 80px;
		left: 60px;
		z-index: 10;
		color: white;
		user-select: none;
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(4rem, 15vw, 12rem);
		line-height: 0.8;
		margin-bottom: -1.5rem;
		margin-left: -0.5rem;

		/* This is the key to the knockout effect */
		mix-blend-mode: difference;
	}

	.scroll-indicator {
		position: absolute;
		top: 90vh;
		bottom: 1rem;
		left: 50%;
		z-index: 3;
		width: 1px;
		transform: translateX(-50%);
	}

	.scroll-line {
		width: 100%;
		height: 100%;
		background-color: white;
		animation: subtleBreathe 5s ease-in-out infinite;
	}

	@keyframes subtleBreathe {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
		}
	}

	/* --- Responsive & Accessibility --- */
	@media (max-width: 768px) {
		.hero-headline {
			margin-bottom: -1rem !important;
			margin-left: -0.25rem !important;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-image {
			transition: none !important;
		}
		.scroll-line {
			animation: none !important;
			opacity: 0.5 !important;
		}
	}
</style>
