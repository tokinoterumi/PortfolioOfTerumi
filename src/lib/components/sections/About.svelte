<script>
	const impact = {
		views: '730K+',
		downloads: '4K+',
		citation: {
			label: 'World Economic Forum',
			link: 'https://jp.weforum.org/stories/2024/07/art-festival-impact-aging-communities/'
		}
	};
	const skills = {
		development: [
			'SvelteKit',
			'SwiftUI',
			'Tailwind CSS',
			'JavaScript',
			'Shopify Liquid',
			'CMS'
		],
		languages: [
			'English',
			'Japanese',
			'Mandarin',
		],

		gadgetsAndTools: [
			'Fujifilm X-T4',
			'XF16mmF1.4',
			'XF18-55mm',
			'XF70-300mm',
		]
	};
</script>

<section class="about-section">
	<div class="content-wrapper">
		<div class="narrative-row">
			<header class="section-header">
				<h1 class="headline">WHO IS TERUMI</h1>
			</header>
			<div class="bio-grid">
				<div class="bio-text">
					<p>
						Born in Hainan, a tropical island as large as Kyūshū, and with living experience in Shikoku, the smallest main island of Japan, Terumi describes herself as a drifting islander.
					</p>
					<p>
						Terumi's adventurous nature continually drives her to explore and create, which has led her becoming a skillful photographer and has now focused her ambitions on a career as a digital solutions developer. She continues leveraging technology as a powerful tool to materialize her observations.
					</p>
				</div>
				<div class="manifesto-text">
					<h3 class="manifesto-title">What I Am Looking For</h3>
					<p>
						My experience in conservative, change-resistant environments has proven my ability to deliver results under challenging conditions. It also solidified my conviction: my next step is to join a team that values innovation, respects diversity, and fosters a supportive environment where I can fully amplify my strengths. I am eager to collaborate with passionate builders and thinkers who prioritize tangible impact over procedural ritual.
					</p>
				</div>
			</div>
		</div>

		<div class="separator"></div>

		<div class="data-row">

			<div class="impact-column">
				<h2 class="data-section-title">Visual Impact</h2>
				<div class="impact-grid">
					<div class="impact-item">
						<span class="impact-metric">{impact.views}</span>
						<a href="https://unsplash.com/@driftingislander" target="_blank" rel="noopener noreferrer" class="impact-label citation-link">
							Views on Unsplash
						</a>
					</div>
					<div class="impact-item">
						<span class="impact-metric">{impact.downloads}</span>
						<span class="impact-label">Downloads Worldwide</span>
					</div>
					<div class="impact-item">
						<span class="impact-metric">Cited by</span>
						<a href={impact.citation.link} target="_blank" rel="noopener noreferrer" class="impact-label citation-link">
							{impact.citation.label}
						</a>
					</div>
				</div>
			</div>

			<div class="skills-column">
				<h2 class="data-section-title">Skills & Toolkit</h2>
				<div class="skills-grid">
					<div class="skill-category">
						<h3 class="category-title">Development</h3>
						<ul>
							{#each skills.development as skill}
								<li>{skill}</li>
							{/each}
						</ul>
					</div>
					<div class="skill-category">
						<h3 class="category-title">Languages</h3>
						<ul>
							{#each skills.languages as skill}
								<li>{skill}</li>
							{/each}
						</ul>
					</div>
					<div class="skill-category">
						<h3 class="category-title">Gadgets</h3>
						<ul>
							{#each skills.gadgetsAndTools as skill}
								<li>{skill}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</section>

<style>
    .about-section {
        padding: 8rem 2rem;
        background-color: var(--background-light);
    }

    .content-wrapper {
        max-width: 1100px;
        margin: 0 auto;
    }

    /* --- Row 1: Narrative --- */
    .narrative-row .section-header {
        text-align: center;
        margin-bottom: 4rem;
    }
    .narrative-row .headline {
        font-family: 'Bebas Neue', sans-serif;
        font-size: clamp(3rem, 10vw, 5rem);
        line-height: 1;
        font-weight: 400;
        color: var(--text-primary);
    }

    .bio-grid {
        max-width: 85ch;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        text-align: left;
    }

    .bio-text p, .manifesto-text p {
        font-family: 'DM Sans', sans-serif;
				font-weight: lighter;
        font-size: 1.125rem;
        line-height: 1.8;
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
    }
    .manifesto-title {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
    }


    /* --- Separator --- */
    .separator {
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.1);
        margin: 5rem 0;
    }

    /* --- Row 2: Data --- */
    .data-row {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 4rem;
    }
    .data-section-title {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        color: var(--silver-halide-grey);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 2rem;
    }

    /* --- Impact Column --- */
    .impact-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .impact-metric {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 2.5rem;
        line-height: 1;
        color: var(--text-primary);
    }
    .impact-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
    .citation-link {
        text-decoration: none;
        border-bottom: 1px solid var(--text-secondary);
        transition: border-color 0.3s ease;
    }
    .citation-link:hover {
        border-bottom-color: var(--cyanotype-blue);
    }

    /* --- Skills Column --- */
    .skills-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    @media (min-width: 768px) {
        .skills-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .category-title {
        font-family: 'greycliff-cf', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    .skill-category ul { list-style: none; padding: 0; margin: 0; }
    .skill-category li {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        line-height: 1.8;
        color: var(--text-secondary);
    }

    /* --- Responsive --- */
    @media (max-width: 768px) {
        .bio-grid {
            grid-template-columns: 1fr;
        }
        .data-row {
            grid-template-columns: 1fr;
            gap: 4rem;
        }
    }
</style>
