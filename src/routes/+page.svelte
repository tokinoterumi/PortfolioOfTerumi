<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import WhatIDo from '$lib/components/sections/WhatIDo.svelte';
	import SelectedWorks from '$lib/components/sections/SelectedWorks.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';

	import { isHeaderVisible } from '$lib/stores/header.js';
	import { onMount, onDestroy } from 'svelte';

	// Get photos from server-side data loading
	let { data } = $props();
	const photos = data.photos || [];

	let heroSectionWrapper;

	onMount(() => {
		isHeaderVisible.set(false);

		const observer = new IntersectionObserver(
			([entry]) => {
				isHeaderVisible.set(!entry.isIntersecting);
			},
			{
				threshold: 0
			}
		);

		if (heroSectionWrapper) {
			observer.observe(heroSectionWrapper);
		}

		return () => {
			if (heroSectionWrapper) {
				observer.unobserve(heroSectionWrapper);
			}
			isHeaderVisible.set(false);
		};
	});
</script>

<div bind:this={heroSectionWrapper}>
	<Hero />
</div>

<WhatIDo />

<SelectedWorks />

<About />

<Gallery {photos} />
