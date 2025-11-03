<script>
	import '../app.css';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

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

