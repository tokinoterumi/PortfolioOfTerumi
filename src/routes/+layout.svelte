<script>
	import '../app.css';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';
	import { page } from '$app/stores';

	$: isHomepage = $page.url.pathname === '/';
</script>

<div class="app-container">
	<main class="min-h-screen">
		<slot />
	</main>
	{#if isHomepage}
		<BackToTop />
	{/if}
	<Footer />
</div>

