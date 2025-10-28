<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import WhatIDo from '$lib/components/sections/WhatIDo.svelte';
	import SelectedWorks from '$lib/components/sections/SelectedWorks.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';

	// Get photos from server-side project-content loading
	let { data } = $props();
	const photos = data.photos || [];
</script>

<div>
	<section>
		<Hero />
	</section>

	<section>
		<WhatIDo />
	</section>

	<section>
		<SelectedWorks />
	</section>

	<section>
		<About />
	</section>

	<section>
		<Gallery {photos} />
	</section>
</div>