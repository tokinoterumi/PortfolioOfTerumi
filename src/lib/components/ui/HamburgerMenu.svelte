<script>
	import { isMenuOpen } from '$lib/stores/menu.js';

	// This prop receives the visibility state from +layout.svelte
	export let visible = false;

	const toggleMenu = () => {
		isMenuOpen.update((open) => !open);
	};
</script>

<!-- 
  MODIFIED: Refactored with Tailwind CSS classes
  The dynamic classes are handled through class: directives for visibility and menu state
-->
<button
	class="fixed top-10 right-10 z-[1100] flex h-5 w-7 scale-90 cursor-pointer flex-col justify-between border-0 bg-transparent p-0 opacity-0 transition-all duration-[400ms] ease-in-out focus-visible:outline-2 focus-visible:outline-offset-4 md:top-8 md:right-6"
	class:opacity-100={visible}
	class:scale-100={visible}
	class:visible={visible}
	class:z-[1300]={$isMenuOpen}
	on:click={toggleMenu}
	aria-label="Toggle navigation menu"
	aria-expanded={$isMenuOpen}
	aria-controls="main-menu"
	style="outline-color: var(--darkroom-red, #B22222);"
>
	<span
		class="h-0.5 w-full origin-center transition-all duration-[400ms]"
		class:translate-y-[9px]={$isMenuOpen}
		class:rotate-45={$isMenuOpen}
		class:bg-white={$isMenuOpen}
		class:bg-gray-800={!$isMenuOpen}
		style="transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1); background-color: {$isMenuOpen
			? 'white'
			: 'var(--text-primary, #333333)'};"
	></span>
	<span
		class="h-0.5 w-full origin-center transition-all duration-[400ms]"
		class:-translate-y-[9px]={$isMenuOpen}
		class:-rotate-45={$isMenuOpen}
		class:bg-white={$isMenuOpen}
		class:bg-gray-800={!$isMenuOpen}
		style="transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1); background-color: {$isMenuOpen
			? 'white'
			: 'var(--text-primary, #333333)'};"
	></span>
</button>

<style>
	/* Control pointer events based on visibility */
	button {
		pointer-events: none;
	}
	
	button.visible {
		pointer-events: auto !important;
	}

	/* Ensure high z-index when menu is open to stay above modal */
	button.z-\[1300\] {
		z-index: 1300 !important;
	}

	/* Custom hover styles that can't be easily achieved with Tailwind */
	button:hover span:not(.open) {
		background-color: var(--darkroom-red, #b22222) !important;
	}

	/* Ensure the lines don't change color on hover when menu is open */
	button span {
		transition: background-color 0.4s cubic-bezier(0.25, 1, 0.5, 1);
	}
</style>
