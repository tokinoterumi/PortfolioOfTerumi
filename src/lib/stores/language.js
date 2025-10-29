import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Force Japanese as the default language, ignoring browser/system preferences
function getInitialLanguage() {
	if (browser) {
		// Check if user has explicitly set a preference
		const stored = localStorage.getItem('language');

		// If no stored preference exists, force Japanese as default
		if (!stored) {
			localStorage.setItem('language', 'ja');
			return 'ja';
		}

		return stored;
	}
	// Server-side default
	return 'ja';
}

const initialLanguage = getInitialLanguage();

function createLanguageStore() {
	const { subscribe, set } = writable(initialLanguage);

	return {
		subscribe,
		set: (value) => {
			if (browser) {
				localStorage.setItem('language', value);
			}
			set(value);
		}
	};
}

export const currentLanguage = createLanguageStore();