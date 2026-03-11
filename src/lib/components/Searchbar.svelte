<script lang="ts" context="module">
	export type SearchbarSettings = {
		placeholder: string;
		autoComplete: FullAutoFill | null | undefined;
		autoFocus: boolean;
	};

	const DEFAULT_SEARCHBAR_SETTINGS: SearchbarSettings = {
		placeholder: 'Search:',
		autoComplete: 'off',
		autoFocus: true
	};
</script>

<script lang="ts">
	import { pipelineStore } from '$stores/pipeline';
	import type { FullAutoFill } from 'svelte/elements';
	import { get } from 'svelte/store';

	export let settings: SearchbarSettings = DEFAULT_SEARCHBAR_SETTINGS;
	let query = '';
	const pipeline = get(pipelineStore);

	function handleSubmit() {
		const trimmed = query.trim();

		if (!trimmed) {
			return;
		}

		pipeline.run(trimmed);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<!-- svelte-ignore a11y-autofocus -->
<div id="searchbar">
	<input
		id="searchbar-input"
		type="text"
		bind:value={query}
		on:keydown={handleKeyDown}
		placeholder={settings.placeholder}
		autocomplete={settings.autoComplete}
		autofocus={settings.autoFocus}
	/>
</div>

<style>
	#searchbar {
		margin-top: 0rem;
		margin-bottom: 2.3rem;
		grid-column: 1/-1;

		text-align: center;
	}

	#searchbar-input {
		justify-content: start;
		text-align: center;
		margin-top: rem;
		height: 100%;
		width: 100%;

		font-size: 1rem;
		border-color: transparent;
		border-radius: var(--border-radius);
		border-width: 0.2rem;
		border-style: solid;
		background: var(--color-background-2);
		color: var(--color-foreground-1);
		transition: var(--transition-speed) ease;
	}

	#searchbar-input:hover {
		border-color: var(--color-foreground-1);
		border-radius: var(--border-radius);
		background: var(--color-background-2);
	}

	#searchbar-input:focus {
		border-color: var(--color-accent-1);
		border-width: 0.22rem;
		border-radius: var(--border-radius);
		outline: none;
		background-color: var(--color-background-3);
	}

	#searchbar-input::placeholder {
		font-size: 1rem;
		border-color: var(--color-accent-1);
		color: var(--color-foreground-1);
	}
</style>
