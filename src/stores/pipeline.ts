import { readable } from 'svelte/store';
import { Pipeline } from '$lib/search/pipeline';
import { searchWithActiveSearchEngine } from '$lib/search/modules/searchEngine';
import { searchWithPrefix } from '$lib/search/modules/prefixSearch';
import { isValidURL } from '$lib/search/modules/validURL';

const pipeline = Object.freeze(
	new Pipeline.Builder()
		.appendStep(searchWithPrefix)
		.appendStep(isValidURL)
		.setEndStep(searchWithActiveSearchEngine)
		.build()
);

// Initialize the store with a new Pipeline instance
export const pipelineStore = readable(pipeline);
