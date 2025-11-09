<script>
	export let href = null;
	export let variant = 'primary'; // 'primary' | 'secondary'
	export let icon = null; // Optional icon (can be a component or string)
	export let ariaLabel = null;

	const variantClasses = {
		primary: 'border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--darkroom-red)] hover:border-[var(--darkroom-red)]',
		secondary: 'border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)]'
	};
</script>

{#if href}
	<a
		{href}
		class="inline-flex items-center gap-2 border-[1px] bg-transparent px-6 py-3 font-['greycliff-cf'] text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:text-white {variantClasses[variant]}"
		aria-label={ariaLabel}
	>
		{#if icon}
			<span class="icon">{@html icon}</span>
		{/if}
		<slot />
	</a>
{:else}
	<button
		class="inline-flex items-center gap-2 border-[1px] bg-transparent px-6 py-3 font-['greycliff-cf'] text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:text-white {variantClasses[variant]}"
		aria-label={ariaLabel}
		on:click
	>
		{#if icon}
			<span class="icon">{@html icon}</span>
		{/if}
		<slot />
	</button>
{/if}

<style>
	:global(.icon svg) {
		width: 1rem;
		height: 1rem;
	}
</style>
