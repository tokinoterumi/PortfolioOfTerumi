<script>
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			visible = window.scrollY > 300;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

{#if visible}
	<button
		onclick={scrollToTop}
		class="fixed bottom-8 right-8 z-[1000] flex h-12 w-12 items-center justify-center border border-[var(--text-primary)] bg-[var(--background-light)] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--background-light)]"
		aria-label="Back to top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="square"
				stroke-linejoin="miter"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
	</button>
{/if}