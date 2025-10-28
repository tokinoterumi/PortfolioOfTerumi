<script>
	import LanguageSwitch from '$lib/components/ui/LanguageSwitch.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { currentLanguage } from '$lib/stores/language.js';
	const projectData = {
		exhibitionPhotoGroups: [
			// Group 1
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF4051.jpg',
					alt: 'Kitadomari'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF4062.jpg',
					alt: 'Kitadomari'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF4065.jpg',
					alt: 'Kitadomari'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF4066.jpg',
					alt: 'Kitadomari'
				}
			],
			// Group 2
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3159.JPG',
					alt: 'Akashi Strait, Liner, Port Cat'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3163.JPG',
					alt: 'Akashi Strait, Liner, Port Cat'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3166.JPG',
					alt: 'Akashi Strait, Liner, Port Cat'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3167.jpg',
					alt: 'Akashi Strait, Liner, Port Cat'
				}
			],
			// Group 3
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3430.jpg',
					alt: 'Placeholder Photo 9'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3431.jpg',
					alt: 'Placeholder Photo 10'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3432.jpg',
					alt: 'Placeholder Photo 11'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF3435.jpg',
					alt: 'Placeholder Photo 12'
				}
			],
			// Group 4
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0262.jpg',
					alt: 'Port Tomoura'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0167.jpg',
					alt: 'Fishing Bucket'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0275.jpg',
					alt: 'Wakaba Mark on Bicycle'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0277.jpg',
					alt: 'Neko & Nekoguruma'
				}
			],
			// Group 5
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0481.jpg',
					alt: 'Port Hirose'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0509.jpg',
					alt: 'Coming Back From Fishing'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0504.jpg',
					alt: 'Harbor Morning'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0537.jpg',
					alt: 'Seaside Path'
				}
			],

			// Group 6
			[
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF2779.jpg',
					alt: 'Tosa Gulf'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF0578.jpg',
					alt: 'Uwa Sea'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF2100.jpg',
					alt: 'Port Takamatsu'
				},
				{
					src: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/DSCF4153.jpg',
					alt: 'Harima Sea'
				}
			]
		],
		venuePhoto: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/gallery-in-showayu.jpeg',
		afterword: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/%E3%82%A2%E3%83%88%E3%82%AB%E3%82%99%E3%82%AD%20for%20Portfolio.jpg',
		index: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/Index%20for%20Portfolio.jpg',
	};
	const caseStudyData = {
		en: {
			title: 'A Corner Photo Show: <br/> The Stirring Seascape',
			coverImage: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/poster-in-showayu.jpg',
			overview: {
				Role: 'Photographer, Curator',
				Timeline: '2 Months',
			}
		},
		ja: {
			title: '小さな写真展 in 昭和湯 <br/> 〜みなととふねと心揺さぶる風景〜',
			coverImage: 'https://ioucafusxjuxhwrh.public.blob.vercel-storage.com/poster-in-showayu.jpg',
			overview: {
				役割: '撮影、企画',
				期間: '2ヶ月間 (2022年)',
			}
		}
	};

	let isGroupLightboxOpen = $state(false);
	let currentGroupIndex = $state(0);

	const content = $derived(caseStudyData[$currentLanguage] || caseStudyData['en']);

	function openGroupLightbox(groupIndex) {
		currentGroupIndex = groupIndex;
		isGroupLightboxOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeGroupLightbox() {
		isGroupLightboxOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'auto';
		}
	}

	function handleKeydown(event) {
		if (isGroupLightboxOpen && event.key === 'Escape') {
			closeGroupLightbox();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<article class="case-study">
<div class="case-study-container mx-auto max-w-6xl px-6 py-24 md:py-32">
	<!-- Back to Homepage Button -->
	<div class="mb-12">
		<Button href="/" variant="secondary" icon="<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='square' stroke-linejoin='miter' stroke-width='2' d='M10 19l-7-7m0 0l7-7m-7 7h18'/></svg>">
			Back to Homepage
		</Button>
	</div>

	<!-- Part 1: The Cover -->
	<header class="mb-24 grid grid-cols-1 items-end gap-12 md:mb-32 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
		<div class="cover-container">
			<img
				src={content.coverImage}
				alt={content.title}
				class="mx-auto w-full max-w-md shadow-xl"
			/>
		</div>
		<div class="text-content text-center lg:text-left">
			<div class="language-switch-container mb-4 flex justify-center lg:justify-end">
				<LanguageSwitch />
			</div>
			<h1 class="title font-['greycliff-cf'] text-4xl font-semibold leading-tight text-[var(--text-primary)]">
				{@html content.title}
			</h1>
			<section class="overview-section mt-8">
				{#each Object.entries(content.overview) as [key, value]}
					<div class="overview-item">
						<span class="overview-key">{key}</span>
						<span class="overview-value">{value}</span>
					</div>
				{/each}
			</section>
		</div>
	</header>

	<!-- Part 2: The Exhibition Works -->
	<section class="mb-24 md:mb-24">
		{#each projectData.exhibitionPhotoGroups as photoGroup, groupIndex}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-8">
				{#each photoGroup as photo}
					<button
						class="group relative aspect-[3/2] w-full cursor-pointer overflow-hidden border-0 bg-gray-100 p-0"
						on:click={() => openGroupLightbox(groupIndex)}
						aria-label="Click to view the photo set"
					>
						<img
							src={photo.src}
							alt={photo.alt}
							class="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<span class="font-['greycliff-cf'] text-4xl font-light text-white">+</span>
						</div>
					</button>
				{/each}
			</div>
		{/each}
		<figcaption class="mt-4 text-center font-['DM_Sans'] text-sm text-[var(--silver-halide-grey)]">
			A selection of works from the exhibition. Click to view the full set.
		</figcaption>
	</section>

	<!-- Part 3: The Story & The Proof -->
	<section class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-center font-['greycliff-cf'] text-3xl font-semibold text-[var(--text-primary)]">
			The Venue as a Canvas
		</h2>
		<div class="prose prose-lg mx-auto text-left font-['DM_Sans'] text-[var(--text-secondary)]">
			<p>
				One of the core challenges was to respectfully integrate the photographs into the historic
				Sento space without disrupting its unique atmosphere. The photos were carefully placed along
				the tiled walls, creating a dialogue between the art and the environment.
			</p>
		</div>
		<figure class="mt-12">
			<img
				src={projectData.venuePhoto}
				alt="Gallery in Showa-Yu"
				class="w-full"
			/>
			<figcaption class="mt-4 text-center font-['DM_Sans'] text-sm text-[var(--silver-halide-grey)]">
				The final display at Showa-Yu
			</figcaption>
		</figure>

		<figure class="mt-24">
			<div class="flex flex-col md:flex-row">
				<img
					src={projectData.afterword}
					alt="Afterword"
					class="w-full md:w-1/2"
				/>
				<img
					src={projectData.index}
					alt="Index"
					class="w-full md:w-1/2"
				/>
			</div>
			<figcaption class="mt-4 text-center font-['DM_Sans'] text-sm text-[var(--silver-halide-grey)]">
				Curator's afterword and index
			</figcaption>
		</figure>
	</section>
</div>
</article>

{#if isGroupLightboxOpen}
	<div
		class="fixed inset-0 z-[2000] flex cursor-pointer items-center justify-center bg-black/90 p-8 backdrop-blur-sm md:p-16"
		on:click={closeGroupLightbox}
		role="dialog"
		aria-modal="true"
	>
		<!-- This inner container stops click propagation and holds the content -->
		<div class="relative h-full w-full max-w-screen-lg cursor-default" on:click|stopPropagation>
			<button
				class="absolute -top-12 right-0 cursor-pointer border-0 bg-transparent text-4xl leading-none text-white transition-transform hover:scale-110"
				on:click={closeGroupLightbox}
				aria-label="Close"
			>
				×
			</button>

			<!-- Grid for Lightbox - shows clicked group (4 photos) -->
			<div class="grid h-full w-full grid-cols-2 grid-rows-2 gap-x-5.5">
				{#each projectData.exhibitionPhotoGroups[currentGroupIndex] as photo}
					<div class="relative bg-black">
						<img src={photo.src} alt={photo.alt} class="h-full w-full object-contain" />
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
    .overview-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(0,0,0,0.1);
    }

    .overview-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .overview-key {
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--silver-halide-grey);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .overview-value {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        color: var(--text-primary);
    }
</style>
