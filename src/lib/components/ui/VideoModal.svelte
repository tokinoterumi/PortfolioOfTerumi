<script>
	export let videoId;
	export let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	let showModal = false;
</script>

<div
	class="relative w-full max-w-xl mx-auto cursor-pointer group"
	on:click={() => (showModal = true)}
>
	<img
		src={thumbnailUrl}
		alt="Video thumbnail"
		class="rounded-2xl shadow-md w-full transition-transform duration-300 group-hover:scale-[1.02]"
	/>
	<div
		class="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-16 w-16 text-white drop-shadow-lg"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M8 5v14l11-7z" />
		</svg>
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
		on:click={() => (showModal = false)}
	>
		<div
			class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
			on:click|stopPropagation
		>
			<iframe
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				class="w-full h-full"
			></iframe>

			<button
				class="absolute top-3 right-3 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
				on:click={() => (showModal = false)}
			>
				×
			</button>
		</div>
	</div>
{/if}