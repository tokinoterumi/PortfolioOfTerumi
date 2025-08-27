<script>
    import { onMount } from 'svelte';

    let { data } = $props();
    const { project } = data;

    // Lightbox state
    let lightboxOpen = $state(false);
    let currentImageIndex = $state(0);

    // Example project data - you'll replace these paths with your actual image paths
    const projectData = {
        posterImage: '/path/to/your/vertical-A4-poster.jpg', // image_bbc7e7.jpg
        title: '銭湯での写真展',
        subtitle: 'みなととふねと心揺さぶる風景',
        tagline: '在百年歷史的公共錢湯中舉辦的展覽，記錄港口與船隻動人心弦的風景。',
        exhibitionPhotos: [
            {
                src: '/path/to/exhibit-1.jpg', // image_bbc121.jpg 左上
                alt: '停泊在港口的漁船隊'
            },
            {
                src: '/path/to/exhibit-2.jpg', // image_bbc121.jpg 右上
                alt: '遠處冒著蒸汽的漁船'
            },
            {
                src: '/path/to/exhibit-3.jpg', // image_bbc121.jpg 左下
                alt: '帶有初心者標誌的自行車與港口'
            },
            {
                src: '/path/to/exhibit-4.jpg', // image_bbc121.jpg 右下
                alt: '在手推車旁休息的貓'
            }
        ],
        venuePhoto: '/path/to/venue-photo.jpg', // image_bc3541.jpg
        afterwordImage: '/path/to/afterword-image.jpg' // image_bc221e.jpg
    };

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
        currentImageIndex = (currentImageIndex + 1) % projectData.exhibitionPhotos.length;
    }

    function prevImage(event) {
        event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + projectData.exhibitionPhotos.length) % projectData.exhibitionPhotos.length;
    }

    function handleKeydown(event) {
        if (!lightboxOpen) return;

        switch (event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage(event);
                break;
            case 'ArrowRight':
                nextImage(event);
                break;
        }
    }

    onMount(() => {
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'auto';
            }
        };
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="case-study-container mx-auto max-w-6xl px-6 py-24 md:py-32">
    <!-- Part 1: The Cover (封面) -->
    <header class="mb-24 grid grid-cols-1 items-center gap-12 md:mb-32 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <!-- 左欄：海報 -->
        <div class="poster-container">
            <img
                src={projectData.posterImage}
                alt="錢湯寫真展的縱向A4海報"
                class="mx-auto max-h-[70vh] w-auto object-contain"
            />
        </div>
        <!-- 右欄：標題與概述 -->
        <div class="text-content text-center lg:text-left">
            <h1
                class="text-5xl font-normal leading-tight text-zinc-900 md:text-6xl lg:text-7xl"
                style="font-family: 'Bebas Neue', sans-serif;"
            >
                {projectData.title}
            </h1>
            <p class="mt-4 text-2xl text-zinc-600" style="font-family: 'IBM Plex Sans JP', sans-serif;">
                {projectData.subtitle}
            </p>
            <p class="mt-8 max-w-prose text-lg leading-relaxed text-zinc-600" style="font-family: 'IBM Plex Sans JP', sans-serif;">
                {projectData.tagline}
            </p>
        </div>
    </header>

    <!-- Part 2: The Exhibition Works (寫真展本人) -->
    <section class="mb-24 md:mb-32">
        <div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-6">
            {#each projectData.exhibitionPhotos as photo, i}
                <button
                    class="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden border-0 bg-gray-100 p-0"
                    on:click={() => openLightbox(i)}
                    aria-label="查看 {photo.alt} 的大圖"
                >
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        class="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                        <span class="text-4xl font-light text-white" style="font-family: 'IBM Plex Sans JP', sans-serif;">+</span>
                    </div>
                </button>
            {/each}
        </div>
        <figcaption class="mt-4 text-center text-sm text-zinc-400" style="font-family: 'IBM Plex Sans JP', sans-serif;">
            A selection of works from the exhibition.
        </figcaption>
    </section>

    <!-- Part 3: The Story & The Proof (故事與證明) -->
    <section class="mx-auto max-w-4xl">
        <h2 class="mb-8 text-center text-3xl font-light text-zinc-900" style="font-family: 'IBM Plex Sans JP', sans-serif;">
            The Venue as a Canvas
        </h2>
        <div class="prose prose-lg mx-auto text-left text-zinc-600" style="font-family: 'IBM Plex Sans JP', sans-serif;">
            <p>
                One of the core challenges was to respectfully integrate the photographs into the historic
                Sento space without disrupting its unique atmosphere. The photos were carefully placed along
                the tiled walls, creating a dialogue between the art and the environment...
            </p>
        </div>
        <figure class="mt-12">
            <img
                src={projectData.venuePhoto}
                alt="展覽在昭和湯的現場全景"
                class="w-full"
            />
            <figcaption class="mt-4 text-center text-sm text-zinc-400" style="font-family: 'IBM Plex Sans JP', sans-serif;">
                The final exhibition in situ at Showa-yu.
            </figcaption>
        </figure>

        <figure class="mt-24">
            <img
                src={projectData.afterwordImage}
                alt="展覽的後記與索引"
                class="w-full"
            />
            <figcaption class="mt-4 text-center text-sm text-zinc-400" style="font-family: 'IBM Plex Sans JP', sans-serif;">
                Curator's afterword and index.
            </figcaption>
        </figure>
    </section>
</div>

<!-- Lightbox -->
{#if lightboxOpen}
    <div
        class="fixed inset-0 z-[2000] flex cursor-pointer items-center justify-center bg-black/95"
        on:click={closeLightbox}
        on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
        role="dialog"
        aria-modal="true"
        tabindex="0"
    >
        <div class="relative max-h-[90vh] max-w-[90vw] cursor-default" on:click={(e) => e.stopPropagation()}>
            <button
                class="absolute -top-12 right-0 cursor-pointer border-0 bg-transparent px-2 py-2 text-4xl leading-none text-white"
                on:click={(e) => closeLightbox(e)}
                aria-label="Close"
            >
                ×
            </button>

            <button
                class="absolute top-1/2 -left-16 -translate-y-1/2 cursor-pointer border-0 bg-white/10 px-4 py-4 text-4xl text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/20"
                on:click={(e) => prevImage(e)}
                aria-label="Previous image"
            >
                ←
            </button>

            <button
                class="absolute top-1/2 -right-16 -translate-y-1/2 cursor-pointer border-0 bg-white/10 px-4 py-4 text-4xl text-white backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-white/20"
                on:click={(e) => nextImage(e)}
                aria-label="Next image"
            >
                →
            </button>

            <img
                src={projectData.exhibitionPhotos[currentImageIndex].src}
                alt={projectData.exhibitionPhotos[currentImageIndex].alt}
                class="max-h-[80vh] max-w-full object-contain"
            />

            <div class="absolute right-0 -bottom-12 left-0 text-center text-white">
                <p class="m-0 mb-2 text-base" style="font-family: 'IBM Plex Sans JP', sans-serif;">
                    {projectData.exhibitionPhotos[currentImageIndex].alt}
                </p>
                <span class="text-sm" style="font-family: 'IBM Plex Sans JP', sans-serif; color: #AAB2BD;">
                    {currentImageIndex + 1} / {projectData.exhibitionPhotos.length}
                </span>
            </div>
        </div>
    </div>
{/if}

<style>
    @media (prefers-reduced-motion: reduce) {
        .group:hover img {
            transform: none !important;
        }
        
        .transition-transform,
        .transition-opacity {
            transition: none !important;
        }
    }
</style>