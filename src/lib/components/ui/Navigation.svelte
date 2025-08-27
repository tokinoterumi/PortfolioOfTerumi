<script>
	import { page } from '$app/stores';
	import { isMenuOpen } from '$lib/stores/menu.js';
	import { navigationLinks, socialLinks } from '$lib/data/navigation.js';
	import { onMount, onDestroy } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let menuElement;

	const closeMenu = () => isMenuOpen.set(false);

	onMount(() => {
		function handleKeydown(event) {
			if (event.key === 'Escape' && $isMenuOpen) {
				closeMenu();
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Close menu when route changes
	$: if ($page.url) {
		closeMenu();
	}

	// Prevent body scroll when menu is open
	$: if (typeof document !== 'undefined') {
		document.body.style.overflow = $isMenuOpen ? 'hidden' : 'auto';
	}
</script>

{#if $isMenuOpen}
	<div
		class="fixed inset-0 z-[1200]"
		transition:fly={{ duration: 300, opacity: 0 }}
		bind:this={menuElement}
		role="dialog"
		aria-modal="true"
		aria-label="Main menu"
	>
		<!-- Menu Backdrop with Frosted Glass Effect -->
		<button
			class="absolute inset-0 bg-black/80 backdrop-blur-lg backdrop-grayscale border-0 p-0 cursor-pointer"
			onclick={closeMenu}
			aria-label="Close menu"
		></button>

		<!-- Menu Content -->
		<div
			class="relative z-10 flex h-full flex-col items-start justify-between px-16 py-32 md:px-8 md:py-24"
		>
			<!-- Navigation Links -->
			<nav>
				<ul class="m-0 list-none p-0">
					{#each navigationLinks as link, i}
						<li
							class="mb-2"
							in:fly={{ y: 20, duration: 400, delay: 100 + i * 50, easing: quintOut }}
						>
							<a
								href={link.href}
								class="leading-tight font-light no-underline transition-colors duration-300"
								class:text-white={$page.url.pathname === link.href}
								class:text-gray-400={$page.url.pathname !== link.href}
								class:hover:text-white={true}
								style="font-family: 'Urbanist', sans-serif; font-size: clamp(2.5rem, 8vw, 5rem); color: {$page
									.url.pathname === link.href
									? 'white'
									: 'var(--silver-halide-grey, #AAB2BD)'};"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Social Section -->
			<div class="w-full max-w-md border-t border-gray-400/30 pt-8">
				<ul class="m-0 flex list-none gap-8 p-0">
					{#each socialLinks as social, i}
						<li in:fly={{ y: 20, duration: 400, delay: 300 + i * 50, easing: quintOut }}>
							<a
								href={social.href}
								class="text-base font-normal no-underline transition-colors duration-300 hover:text-white"
								target="_blank"
								rel="noopener noreferrer"
								style="font-family: 'Urbanist', sans-serif; color: var(--silver-halide-grey, #AAB2BD);"
							>
								{social.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}
