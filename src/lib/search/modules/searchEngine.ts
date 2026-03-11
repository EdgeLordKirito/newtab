import type {
	SearchEngine,
	SearchEngineMap,
	SearchEngineData
} from '../../../types/search/searchEngineTypes';
import { activeSearchEngine } from '../../../stores/activeSearchEngine';
import { get } from 'svelte/store';

const searchEngines: Readonly<SearchEngineMap> = {
	google: {
		displayName: 'Google',
		buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`
	},
	duckduckgo: {
		displayName: 'DuckDuckGo',
		buildUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`
	},

	brave: {
		displayName: 'Brave',
		buildUrl: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}`
	}
} as const;

/**
 * Navigate to a search URL using a specified search engine.
 *
 * @param engineKey - The search engine to use (must be one of the valid SearchEngine keys).
 * @param query - The query string to search for.
 *
 * @example
 * searchWithSearchEngine('google', 'Svelte stores');
 */
export function searchWithSearchEngine(engineKey: SearchEngine, query: string): string {
	return buildSearchUrl(engineKey, query);
}

/**
 * Navigate to a search URL using the currently active search engine.
 * The active search engine is read from the `activeSearchEngine` Svelte store.
 *
 * @param query - The query string to search for.
 *
 * @example
 * searchWithActiveSearchEngine('Svelte stores');
 */
export function searchWithActiveSearchEngine(query: string): string {
	const engineKey = get(activeSearchEngine);
	return buildSearchUrl(engineKey, query);
}

/**
 * Retrieve the data object for a given search engine.
 *
 * @param engineKey - The search engine identifier.
 * @returns The corresponding SearchEngineData object.
 */
export function getSearchEngineData(engineKey: SearchEngine): SearchEngineData {
	return searchEngines[engineKey];
}

/**
 * builds a search URL from a search engine key and query.
 * @param engineKey - The search engine to use.
 * @param query - The search query.
 * @returns The full URL for the search.
 */
function buildSearchUrl(engineKey: SearchEngine, query: string): string {
	return searchEngines[engineKey].buildUrl(query);
}
