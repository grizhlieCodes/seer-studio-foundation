<script lang="ts">
	// import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	// export let blok;

	// $: console.log( {blok} );

    interface VerticalPaddings {
        [key: string]: string;
    }

    export let verticalPadding: keyof VerticalPaddings = "normal";

	const verticalPaddings: VerticalPaddings = {
		large: 'py-24 md:py-36 lg:py-48',
		normal: 'py-20 md:py-24 lg:py-32',
		none: ''
	};

	const contentGridSpan = {
		fullScreen: '[&>*]:col-start-1 [&>*]:col-end-4',
		center: '[&>*]:col-start-2 [&>*]:col-end-3'
	};

	const sectionBackgrounds = {
		light: 'bg-beige-300',
		dark: 'bg-beige-500',
		none: 'bg-transparent'
	};

	const justifyItemsOptions = {
		start: 'justify-items-start',
		end: 'justify-items-end',
		center: 'justify-items-center',
		stretch: 'justify-items-stretch'
	};

	const alignItemsOptions = {
		stretch: 'items-stretch',
		start: 'items-start',
		end: 'items-end',
		center: 'items-center',
		baseline: 'items-baseline'
	};

	const gaps = {
        large: "gap-8 md:gap-10 lg:gap-12",
        medium: " gap-6 md:gap-8 lg:gap-10",
        normal: "gap-4 md:gap-6 lg:gap-8",
        small: "gap-2 md:gap-4 lg:gap-6",
        none: "gap-0"
    }

	$: selectedPaddingY = verticalPaddings[verticalPadding];
	$: selectedContentPosition = contentGridSpan[blok.contentPosition];
	$: selectedBackgroundColor = sectionBackgrounds[blok.bgColor];
	$: selectedJustifyItems = justifyItemsOptions[blok.justifyItems];
	$: selectedalignItems = alignItemsOptions[blok.alignItems];
	$: gap = gaps[blok.gap]

	$: allStyles = `${selectedPaddingY} ${selectedContentPosition} ${selectedBackgroundColor} ${selectedJustifyItems} ${selectedalignItems} ${gap}`;
</script>

{#key blok}
	<section
		aria-labelledby="{blok.id}-heading"
		use:storyblokEditable={blok}
		id={blok.id}
		class="relative grid grid-cols-[1.5rem_1fr_1.5rem]
			 text-center md:grid-cols-[2.5rem_1fr_2.5rem] 
	 sd:grid-cols-[minmax(2.5rem,1fr)_70rem_minmax(2.5rem,1fr)]
	{allStyles}"
	>
		{#if blok.blocks}
			{#each blok.blocks as blok}
				<StoryblokComponent {blok} />
			{/each}
		{:else}
			<slot />
		{/if}
	</section>
{/key}


<style>
	:global(section:has(div.image-container)):first-of-type {
		grid-template-rows: minmax(30rem, 80vh) 1fr;
	}
</style>