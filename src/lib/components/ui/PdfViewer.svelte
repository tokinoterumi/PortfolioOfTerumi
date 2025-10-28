<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let src;

	let canvasContainer;
	let currentPage = 1;
	let totalPages = 0;
	let pdfDoc = null;
	let rendering = false;
	let mounted = false;
	let isFullscreen = false;
	let viewerElement;

	async function loadPDF() {
		if (!browser) return;

		try {
			const pdfjsLib = await import('pdfjs-dist');

			// Import the worker as a URL
			const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
			pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

			const loadingTask = pdfjsLib.getDocument({
				url: src,
				// Enable standard font support for better character rendering
				useSystemFonts: false,
				standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/standard_fonts/',
				cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/cmaps/',
				cMapPacked: true
			});

			pdfDoc = await loadingTask.promise;
			totalPages = pdfDoc.numPages;
			await renderPage(currentPage);
		} catch (error) {
			console.error('Error loading PDF:', error);
			console.error('PDF source:', src);
		}
	}

	async function renderPage(pageNum) {
		if (!browser || rendering || !canvasContainer) return;
		rendering = true;

		const page = await pdfDoc.getPage(pageNum);

		// Get device pixel ratio for high-DPI displays
		const dpr = window.devicePixelRatio || 1;

		// Calculate scale to fit container dimensions while maintaining aspect ratio
		const containerWidth = canvasContainer.clientWidth;
		const containerHeight = canvasContainer.clientHeight;
		const baseViewport = page.getViewport({ scale: 1 });

		// Calculate scale to fit both width and height (use smaller to ensure fit)
		const scaleX = containerWidth / baseViewport.width;
		const scaleY = containerHeight / baseViewport.height;
		const scale = Math.min(scaleX, scaleY) * 0.98; // 98% to give slight padding

		// Apply higher resolution for better quality
		const outputScale = dpr * scale * 2; // 2x for extra quality
		const viewport = page.getViewport({ scale: outputScale });

		// Clear previous content
		canvasContainer.innerHTML = '';

		// Create wrapper for canvas and annotation layer
		const pageWrapper = document.createElement('div');
		pageWrapper.className = 'page-wrapper';
		pageWrapper.style.position = 'relative';
		pageWrapper.style.width = `${viewport.width / (dpr * 2)}px`;
		pageWrapper.style.height = `${viewport.height / (dpr * 2)}px`;

		// Create and setup canvas
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = viewport.width;
		canvas.style.width = `${viewport.width / (dpr * 2)}px`;
		canvas.style.height = `${viewport.height / (dpr * 2)}px`;
		canvas.style.display = 'block';

		pageWrapper.appendChild(canvas);

		// Render PDF content to canvas
		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		await page.render(renderContext).promise;

		// Create annotation layer for clickable links
		const annotationLayer = document.createElement('div');
		annotationLayer.className = 'annotation-layer';
		annotationLayer.style.position = 'absolute';
		annotationLayer.style.top = '0';
		annotationLayer.style.left = '0';
		annotationLayer.style.width = '100%';
		annotationLayer.style.height = '100%';

		pageWrapper.appendChild(annotationLayer);

		// Get and render annotations (links, etc.)
		try {
			const annotations = await page.getAnnotations();
			const displayViewport = page.getViewport({ scale: scale });

			// Render annotations manually
			annotations.forEach((annotation) => {
				if (annotation.subtype === 'Link' && annotation.url) {
					const rect = displayViewport.convertToViewportRectangle(annotation.rect);
					const link = document.createElement('a');
					link.href = annotation.url;
					link.target = '_blank';
					link.rel = 'noopener noreferrer';
					link.style.position = 'absolute';
					link.style.left = `${Math.min(rect[0], rect[2])}px`;
					link.style.top = `${Math.min(rect[1], rect[3])}px`;
					link.style.width = `${Math.abs(rect[2] - rect[0])}px`;
					link.style.height = `${Math.abs(rect[3] - rect[1])}px`;
					link.style.background = 'transparent';
					link.style.cursor = 'pointer';

					annotationLayer.appendChild(link);
				}
			});
		} catch (e) {
			console.warn('Could not render annotations:', e);
		}

		canvasContainer.appendChild(pageWrapper);
		rendering = false;
	}

	function prevPage() {
		if (currentPage <= 1) return;
		currentPage--;
		renderPage(currentPage);
	}

	function nextPage() {
		if (currentPage >= totalPages) return;
		currentPage++;
		renderPage(currentPage);
	}

	function handleKeydown(e) {
		if (e.key === 'ArrowLeft') prevPage();
		if (e.key === 'ArrowRight') nextPage();
	}

	function handleResize() {
		if (pdfDoc && currentPage) {
			renderPage(currentPage);
		}
	}

	function toggleFullscreen() {
		if (!browser || !viewerElement) return;

		if (!isFullscreen) {
			// Enter fullscreen
			if (viewerElement.requestFullscreen) {
				viewerElement.requestFullscreen();
			} else if (viewerElement.webkitRequestFullscreen) {
				viewerElement.webkitRequestFullscreen();
			} else if (viewerElement.msRequestFullscreen) {
				viewerElement.msRequestFullscreen();
			}
		} else {
			// Exit fullscreen
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	}

	function handleFullscreenChange() {
		isFullscreen = !!(
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.msFullscreenElement
		);
		// Re-render to fit new dimensions
		if (pdfDoc && currentPage) {
			setTimeout(() => renderPage(currentPage), 100);
		}
	}

	onMount(() => {
		mounted = true;
		loadPDF();
		window.addEventListener('keydown', handleKeydown);
		window.addEventListener('resize', handleResize);
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('msfullscreenchange', handleFullscreenChange);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.removeEventListener('msfullscreenchange', handleFullscreenChange);
		};
	});
</script>

<div class="pdf-viewer" bind:this={viewerElement}>
	<div class="pdf-canvas-container" bind:this={canvasContainer}>
		<!-- Canvas will be inserted here -->
	</div>

	<div class="pdf-controls">
		<button class="nav-button" on:click={prevPage} disabled={currentPage <= 1} aria-label="Previous page">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>

		<span class="page-info">
			{currentPage} / {totalPages}
		</span>

		<button class="nav-button" on:click={nextPage} disabled={currentPage >= totalPages} aria-label="Next page">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>

		<button class="nav-button fullscreen-button" on:click={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
			{#if isFullscreen}
				<!-- Exit fullscreen icon -->
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
				</svg>
			{:else}
				<!-- Enter fullscreen icon -->
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
				</svg>
			{/if}
		</button>
	</div>
</div>

<style>
	.pdf-viewer {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pdf-canvas-container {
		width: 100%;
		/* 16:9 aspect ratio - will scale responsively */
		aspect-ratio: 16 / 9;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
		background: transparent;
		min-height: 400px;
	}

	.pdf-canvas-container canvas {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	/* Annotation layer styles for clickable links */
	:global(.annotation-layer) {
		position: absolute;
		top: 0;
		left: 0;
	}

	:global(.annotation-layer section) {
		position: absolute;
		text-align: initial;
	}

	:global(.annotation-layer .linkAnnotation > a) {
		position: absolute;
		font-size: 1em;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		cursor: pointer;
	}

	:global(.annotation-layer .linkAnnotation > a:hover) {
		opacity: 0.2;
		background: rgba(0, 0, 255, 0.1);
	}

	.pdf-controls {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-top: 1.5rem;
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.nav-button {
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.2);
		color: var(--text-primary, #000000);
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
	}

	.nav-button:hover:not(:disabled) {
		background: rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 0, 0, 0.3);
	}

	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.page-info {
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 0.875rem;
		color: var(--text-primary, #000000);
		min-width: 80px;
		text-align: center;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.pdf-viewer {
			max-width: 100%;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.pdf-canvas-container {
			min-height: 300px;
		}

		.pdf-controls {
			gap: 1rem;
			padding: 0.5rem 1rem;
		}

		.nav-button {
			width: 32px;
			height: 32px;
		}
	}

	/* Large screens */
	@media (min-width: 1600px) {
		.pdf-viewer {
			max-width: 1920px;
		}
	}

	/* Fullscreen mode */
	.pdf-viewer:fullscreen,
	.pdf-viewer:-webkit-full-screen,
	.pdf-viewer:-moz-full-screen,
	.pdf-viewer:-ms-fullscreen {
		background: #000000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		padding: 2rem;
	}

	.pdf-viewer:fullscreen .pdf-canvas-container,
	.pdf-viewer:-webkit-full-screen .pdf-canvas-container {
		width: 100%;
		max-width: 100vw;
		max-height: calc(100vh - 120px);
		flex: 1;
	}

	.pdf-viewer:fullscreen .pdf-controls,
	.pdf-viewer:-webkit-full-screen .pdf-controls {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.pdf-viewer:fullscreen .nav-button,
	.pdf-viewer:-webkit-full-screen .nav-button {
		border-color: rgba(255, 255, 255, 0.3);
		color: #ffffff;
	}

	.pdf-viewer:fullscreen .nav-button:hover:not(:disabled),
	.pdf-viewer:-webkit-full-screen .nav-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.pdf-viewer:fullscreen .page-info,
	.pdf-viewer:-webkit-full-screen .page-info {
		color: #ffffff;
	}
</style>