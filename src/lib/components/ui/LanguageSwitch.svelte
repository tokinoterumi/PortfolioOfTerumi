<script>
	import { currentLanguage } from '$lib/stores/language.js';

	function setLanguage(lang) {
		currentLanguage.set(lang);
	}
</script>

<div class="language-switch">
	<button
		class:active={$currentLanguage === 'en'}
		on:click={() => setLanguage('en')}
	>
		EN
	</button>
	<button
		class:active={$currentLanguage === 'ja'}
		on:click={() => setLanguage('ja')}
	>
		JP
	</button>
</div>

<style>
    .language-switch {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1rem;
        font-weight: 500;
    }

    .language-switch button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: var(--silver-halide-grey);
        transition: color 0.3s ease;
    }

    .language-switch button:hover {
        color: var(--text-primary);
    }

    .language-switch button.active {
        color: var(--text-primary);
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
    }

    .separator {
        color: var(--silver-halide-grey);
    }
</style>
