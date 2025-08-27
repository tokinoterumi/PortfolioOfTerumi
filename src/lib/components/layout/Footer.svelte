<script>
	import { siteData } from '$lib/data/site.js';
</script>

<footer class="mt-16 border-t-2 text-gray-800" style="border-color: var(--darkroom-red, #B22222);">
	<div class="mx-auto max-w-6xl px-8 py-12 sm:py-8 2xl:max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-4">
			<!-- Footer Left -->
			<div class="text-center md:text-left">
				<p class="m-0 font-serif text-sm leading-relaxed text-gray-800">
					&copy; {siteData.tech.year}
					{siteData.author}
				</p>
			</div>

			<!-- Footer Center -->
			<div class="text-center">
				<p class="m-0 font-serif text-sm leading-relaxed text-gray-600">
					Built with {siteData.tech.framework} & {siteData.tech.styling}
				</p>
			</div>

			<!-- Footer Right -->
			<div class="text-center md:text-right">
				<div class="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6 md:justify-end">
					<a
						href={siteData.social.github}
						class="border-b border-transparent font-serif text-sm text-gray-800 no-underline transition-all duration-300 ease-in-out hover:border-blue-800 hover:text-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						href={siteData.social.linkedin}
						class="border-b border-transparent font-serif text-sm text-gray-800 no-underline transition-all duration-300 ease-in-out hover:border-blue-800 hover:text-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
					<a
						href={siteData.social.instagram}
						class="border-b border-transparent font-serif text-sm text-gray-800 no-underline transition-all duration-300 ease-in-out hover:border-blue-800 hover:text-blue-800 focus:outline-2 focus:outline-offset-2 focus:outline-blue-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						Instagram
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
