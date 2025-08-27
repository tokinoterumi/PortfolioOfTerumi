<script>
	import { onMount } from 'svelte';

	let fileInput;
	let uploadUrl = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let selectedFile = $state(null);
	let isDragging = $state(false); // State to track drag-over event

	function handleFileSelect(files) {
		if (files && files[0]) {
			selectedFile = files[0];
			uploadUrl = '';
			errorMessage = '';
		}
	}

	async function handleUpload() {
		if (!selectedFile) return;

		isLoading = true;
		errorMessage = '';
		uploadUrl = '';

		try {
			// MODIFIED: Using FormData is more efficient and standard for file uploads.
			// This avoids Base64 encoding/decoding issues entirely.
			const formData = new FormData();
			formData.append('file', selectedFile, selectedFile.name);

			const response = await fetch('/admin/upload', {
				method: 'POST',
				// The browser will automatically set the correct 'multipart/form-data' header.
				body: formData
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `Upload failed with status: ${response.status}`);
			}

			const newBlob = await response.json();
			uploadUrl = newBlob.url;
			selectedFile = null;
		} catch (error) {
			console.error('Upload error:', error);
			errorMessage = error.message;
		} finally {
			isLoading = false;
		}
	}

	// --- Drag & Drop Handlers ---
	function handleDragOver(event) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(event) {
		event.preventDefault();
		isDragging = false;
		handleFileSelect(event.dataTransfer.files);
	}
</script>

<div class="upload-page-container">
	<div class="uploader-card">
		<h1 class="title">Upload Image</h1>
		<p class="subtitle">Upload a high-resolution photo to Vercel Blob.</p>

		<div class="form-area">
			<label
				for="file-upload"
				class="drop-zone"
				class:dragging={isDragging}
				on:dragover={handleDragOver}
				on:dragleave={handleDragLeave}
				on:drop={handleDrop}
			>
				{#if selectedFile}
					<span class="file-name">{selectedFile.name}</span>
				{:else}
					<span class="placeholder-text">Click to select or drag & drop a file</span>
				{/if}
			</label>
			<input
				id="file-upload"
				type="file"
				accept="image/*"
				class="hidden-input"
				on:change={(e) => handleFileSelect(e.target.files)}
				bind:this={fileInput}
			/>

			<button class="upload-button" on:click={handleUpload} disabled={!selectedFile || isLoading}>
				{#if isLoading}
					Uploading...
				{:else}
					Upload to Blob
				{/if}
			</button>
		</div>

		{#if uploadUrl}
			<div class="status-message success">
				<p>Upload successful! Your URL is:</p>
				<input type="text" value={uploadUrl} readonly on:click={(e) => e.target.select()} />
			</div>
		{/if}

		{#if errorMessage}
			<div class="status-message error">
				<p>Error: {errorMessage}</p>
			</div>
		{/if}
	</div>
</div>

<style>
    .upload-page-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: var(--background-light, #f5f5f4);
        padding: 2rem;
    }

    .uploader-card {
        width: 100%;
        max-width: 500px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 3rem;
        text-align: center;
    }

    .title {
        font-family: 'Urbanist', sans-serif;
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-primary, #333);
    }

    .subtitle {
        font-family: 'DM Sans', sans-serif;
        color: var(--text-secondary, #666);
        margin-top: 0.5rem;
        margin-bottom: 2.5rem;
    }

    .form-area {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .hidden-input {
        display: none;
    }

    .drop-zone {
        border: 2px dashed #e0e0e0;
        padding: 3rem 1rem;
        cursor: pointer;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        font-family: 'DM Sans', sans-serif;
    }

    .drop-zone.dragging {
        border-color: var(--cyanotype-blue, #1d4e89);
        background-color: #f0f8ff; /* A light blue tint */
    }

    .file-name {
        color: var(--text-primary, #333);
        font-weight: 500;
    }
    .placeholder-text {
        color: var(--silver-halide-grey, #aab2bd);
    }

    .upload-button {
        background: transparent;
        border: 1px solid var(--text-primary, #333);
        color: var(--text-primary, #333);
        padding: 0.75rem 1.5rem;
        font-family: 'Urbanist', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .upload-button:hover:not(:disabled) {
        background-color: var(--text-primary, #333);
        color: white;
    }

    .upload-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .status-message {
        margin-top: 2rem;
        padding: 1rem;
        font-family: 'DM Sans', sans-serif;
        text-align: left;
    }
    .status-message.success {
        background-color: #e8f5e9;
    }
    .status-message.error {
        background-color: #ffebee;
        color: var(--darkroom-red, #b22222);
    }
    .status-message p {
        margin-bottom: 0.5rem;
        word-break: break-all;
    }
    .status-message input {
        width: 100%;
        padding: 0.5rem;
        font-family: monospace;
        border: 1px solid #ccc;
        background: #fafafa;
    }
</style>
