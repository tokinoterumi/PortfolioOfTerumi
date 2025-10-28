<script>
	import LanguageSwitch from '$lib/components/ui/LanguageSwitch.svelte';
	import PdfViewer from '$lib/components/ui/PdfViewer.svelte';
	import VideoModal from '$lib/components/ui/VideoModal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { currentLanguage } from '$lib/stores/language.js';
	import capicoImage from '$lib/assets/capico-details-cover.jpg';

	// Get project-content from the server load function
	export let data;

	const caseStudyData = {
		en: {
			title: 'Capico: A Digital Operations System for Visitor Center Services',
			coverImage: capicoImage,
			overview: {
				Role: 'Product Engineer, Full-Stack Developer',
				Timeline: '2 Weeks',
				Tech: 'SvelteKit, Google Workspace API, PWA'
			}
		},
		ja: {
			title: 'Capico：観光案内所の統合運用ハブ',
			coverImage: capicoImage,
			overview: {
				役割: 'プロダクトエンジニア、フルスタック開発者',
				期間: '2週間 (2025年)',
				技術: 'SvelteKit, Google Workspace API, PWA'
			}
		}
	};

	$: content = caseStudyData[$currentLanguage] || caseStudyData['en'];
</script>

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
					{content.title}
				</h1>
				<p class="subtitle mt-8 max-w-prose font-['DM_Sans'] text-lg leading-relaxed text-[var(--text-secondary)]">
					{content.subtitle}
				</p>
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

		<!-- Portfolio Deck Section -->
		{#if data.project?.pdfPath}
			<div class="pdf-section mx-auto max-w-6xl px-6 mb-24">
				<PdfViewer src={data.project.pdfPath} />
			</div>
		{/if}

		<!-- Main Content -->
		<div class="prose-container mx-auto max-w-4xl px-6">
			<section id="demo" class="my-12">
				<h2 class="text-2xl font-semibold mb-4 text-center">Demo Video</h2>
				<VideoModal videoId="Pn4k0Nv6ZfE" />
			</section>
			<section class="prose">
				{@html data.caseStudyContent}
			</section>
		</div>
	</div>
</article>

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
        font-family: 'greycliff-cf', sans-serif;
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

    /* --- Prose Styling --- */
    /* We use :global because the content is coming from a slot or markdown */
    :global(.prose) {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.125rem;
        line-height: 1.9;
        color: var(--text-secondary);
    }
    :global(.prose h1) {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-top: 2rem;
        margin-bottom: 3rem;
        line-height: 1.2;
    }
    :global(.prose h2) {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-top: 4rem;
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    :global(.prose h3) {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        margin-left: 2rem;
    }
    :global(.prose h4) {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
    :global(.prose ul) {
        margin: 1.5rem 0;
        padding-left: 2rem;
        list-style-type: disc !important;
        list-style-position: outside;
    }
    :global(.prose li) {
        margin-bottom: 0.75rem;
        line-height: 1.7;
        display: list-item !important;
        list-style: disc !important;
        margin-left: 0;
    }
    :global(.prose p) {
        margin: 1.5rem 0;
    }
    :global(.prose strong) {
        font-weight: 600;
        color: var(--text-primary);
    }
    :global(.prose figure) {
        margin: 3rem 0;
    }
    :global(.prose figcaption) {
        text-align: center;
        font-size: 0.875rem;
        color: var(--silver-halide-grey);
        margin-top: 1rem;
    }
</style>
