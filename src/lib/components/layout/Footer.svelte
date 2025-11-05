<script>
	import githubIcon from '$lib/assets/github-mark.png';
	import linkedinIcon from '$lib/assets/InBug-Black.png';
	import unsplashIcon from '$lib/assets/Unsplash_Symbol.png';

	const social = {
		github: "https://github.com/tokinoterumi",
		linkedin: "https://www.linkedin.com/in/terumi-tokino",
		unsplash: "https://unsplash.com/@driftingislander"
	};
</script>

<footer class="text-gray-800">
	<div class="mx-auto max-w-6xl px-8 py-12 pb-20 sm:py-8 sm:pb-16 2xl:max-w-7xl">
		<div class="grid grid-cols-1 items-center gap-8 sm:gap-6 md:grid-cols-3 md:gap-4 lg:gap-8">
			<!-- Footer Left -->
			<div class="text-center md:text-left">
				<p class="m-0 font-['greycliff-cf'] text-sm leading-relaxed text-gray-800">
					&copy; driftingislander by Terumi Tokino. All rights reserved.
				</p>
			</div>

			<!-- Footer Right -->
			<div class="text-center md:col-span-2 md:text-right">
				<div class="flex flex-row justify-center gap-4 sm:gap-4 md:gap-6 md:justify-end lg:gap-8">
					<a
						href={social.github}
						class="transition-opacity duration-300 ease-in-out hover:opacity-60 focus:outline-2 focus:outline-offset-2 focus:outline-gray-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={githubIcon} alt="GitHub" class="h-5 w-5" />
					</a>
					<a
						href={social.unsplash}
						class="transition-opacity duration-300 ease-in-out hover:opacity-60 focus:outline-2 focus:outline-offset-2 focus:outline-gray-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={unsplashIcon} alt="Unsplash" class="h-5 w-5" />
					</a>
					<a
						href={social.linkedin}
						class="transition-opacity duration-300 ease-in-out hover:opacity-60 focus:outline-2 focus:outline-offset-2 focus:outline-gray-800"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={linkedinIcon} alt="LinkedIn" class="h-5 w-5" />
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>