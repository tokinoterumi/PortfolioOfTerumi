<script>
	import { onMount } from 'svelte';

	// Props for API integration
	let { photos = [] } = $props();

	let sectionElement;
	let lightboxOpen = $state(false);
	let currentImageIndex = $state(0);
	let isVisible = $state(false);

	const galleryPhotos = photos || [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});

	function openLightbox(index) {
		currentImageIndex = index;
		lightboxOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox(event) {
		if (event) {
			event.stopPropagation();
		}
		lightboxOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'auto';
		}
	}

	function nextImage(event) {
		event.stopPropagation();
		currentImageIndex = (currentImageIndex + 1) % galleryPhotos.length;
	}

	function prevImage(event) {
		event.stopPropagation();
		currentImageIndex = (currentImageIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
	}

	function handleKeydown(event) {
		if (!lightboxOpen) return;

		switch (event.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				prevImage();
				break;
			case 'ArrowRight':
				nextImage();
				break;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="px-0 py-32" style="background-color: #f8f8f7;" bind:this={sectionElement}>
	<div class="mx-auto max-w-6xl px-4 2xl:max-w-7xl">
		<!-- Section Header -->
		<div class="mb-12 grid grid-cols-1 items-end gap-16 lg:grid-cols-[2fr_1fr] lg:gap-16">
			<div class="lg:text-left">
				<h2
					class="mb-4 leading-tight font-bold text-4xl"
					style="font-family: 'greycliff-cf', sans-serif; color: #333333;"
				>
					FOOTPRINTS
				</h2>
				<p
					class="m-0 text-lg leading-relaxed font-normal"
					style="font-family: 'greycliff-cf', sans-serif; color: #AAB2BD;"
				>
					A wanderer's diary
				</p>
			</div>
		</div>

		<!-- Gallery Grid - Masonry Style -->
		{#if galleryPhotos.length > 0}
			<div class="mb-24 columns-1 gap-6 md:columns-2 lg:columns-3" class:animate-gallery={isVisible}>
				{#each galleryPhotos as photo, index (photo.id)}
					<button
						class="gallery-item mb-6 block w-full translate-y-6 cursor-pointer break-inside-avoid border-0 bg-transparent p-0 opacity-0"
						class:delay-1={index % 4 === 1}
						class:delay-2={index % 4 === 2}
						class:delay-3={index % 4 === 3}
						onclick={() => openLightbox(index)}
						aria-label="View {photo.alt}"
					>
					<div
						class="image-container relative overflow-hidden border border-stone-200 bg-white transition-all duration-[400ms] ease-in-out hover:-translate-y-1 hover:border-yellow-500"
					>
						<img
							src={photo.urls.small}
							alt={photo.alt}
							class="gallery-image block h-auto w-full transition-transform duration-[400ms] ease-in-out"
							loading="lazy"
						/>
						<div
							class="image-overlay absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
						>
							<div class="text-center">
								<span
									class="text-4xl font-light text-white"
									style="font-family: 'greycliff-cf', sans-serif;">+</span
								>
							</div>
						</div>
					</div>
					</button>
				{/each}
			</div>
		{:else}
			<div class="mb-24 text-center">
				<p class="text-lg text-gray-500" style="font-family: 'DM Sans', sans-serif;">
					Photos are currently loading from Unsplash...
				</p>
			</div>
		{/if}

	</div>
</section>

<!-- Lightbox -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-[2000] flex cursor-pointer items-center justify-center bg-black/95"
		onclick={closeLightbox}
		onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
		role="dialog"
		aria-modal="true"
		tabindex="0"
	>
		<div class="relative max-h-[90vh] max-w-[90vw] cursor-default" onclick={(e) => e.stopPropagation()}>
			<button
				class="absolute -top-12 right-0 cursor-pointer border-0 bg-transparent px-2 py-2 text-4xl leading-none text-white"
				onclick={(e) => closeLightbox(e)}
				aria-label="Close"
			>
				×
			</button>

			<button
				class="absolute top-1/2 -left-16 -translate-y-1/2 cursor-pointer border-0 bg-white/10 px-4 py-4 text-4xl text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/20"
				onclick={(e) => prevImage(e)}
				aria-label="Previous image"
			>
				←
			</button>

			<button
				class="absolute top-1/2 -right-16 -translate-y-1/2 cursor-pointer border-0 bg-white/10 px-4 py-4 text-4xl text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/20"
				onclick={(e) => nextImage(e)}
				aria-label="Next image"
			>
				→
			</button>

			<img
				src={galleryPhotos[currentImageIndex].urls.regular}
				alt={galleryPhotos[currentImageIndex].alt}
				class="max-h-[80vh] max-w-full object-contain"
			/>

			<div class="absolute right-0 -bottom-12 left-0 text-center text-white">
				<p class="m-0 mb-2 text-base" style="font-family: 'greycliff-cf', sans-serif;">
					{galleryPhotos[currentImageIndex].alt}
				</p>
				<span class="text-sm" style="font-family: 'greycliff-cf', sans-serif; color: #AAB2BD;">
					{currentImageIndex + 1} / {galleryPhotos.length}
				</span>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Animation keyframes */
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(1.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Animation classes */
	.animate-gallery .gallery-item {
		animation: slideInUp 0.6s ease-out forwards;
	}

	.animate-gallery .gallery-item.delay-1 {
		animation-delay: 0.1s;
	}

	.animate-gallery .gallery-item.delay-2 {
		animation-delay: 0.2s;
	}

	.animate-gallery .gallery-item.delay-3 {
		animation-delay: 0.3s;
	}

	/* Hover effects */
	.image-container:hover .gallery-image {
		transform: scale(1.05);
	}

	.image-container:hover .image-overlay {
		opacity: 1;
	}

	/* Mobile responsive adjustments for lightbox */
	@media (max-width: 768px) {
		/* Removed unused CSS selector */
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.gallery-item {
			opacity: 1 !important;
			transform: none !important;
		}

		.animate-gallery .gallery-item {
			animation: none !important;
		}

		.image-container:hover {
			transform: none !important;
		}

		.image-container:hover .gallery-image {
			transform: none !important;
		}
	}
</style>
