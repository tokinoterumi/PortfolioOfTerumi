<script>
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import HamburgerMenu from '$lib/components/ui/HamburgerMenu.svelte';
	import Navigation from '$lib/components/ui/Navigation.svelte'; // The full-screen modal
	import { isHeaderVisible } from '$lib/stores/header.js';
</script>

<Header visible={$isHeaderVisible} />
<HamburgerMenu visible={$isHeaderVisible} />

<Navigation />

<div class="app-container">
	<main class="min-h-screen">
		<slot />
	</main>
	<Footer />
</div>

<style>
	/* This global style targets the HamburgerMenu component from the layout,
	   giving it the fixed positioning it needs to be visible and clickable.
	   Since the HamburgerMenu component now uses Tailwind internally,
	   we can remove most of these styles as they're handled by the component itself.
	*/
	:global(.hamburger-menu) {
		/* The positioning is now handled by Tailwind classes in the HamburgerMenu component,
		   but we keep this as a fallback or for any additional global overrides if needed */
	}
</style>
