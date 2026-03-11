import { searchWithSearchEngine } from '$lib/search/modules/searchEngine';
import type { Prefix, PrefixHandlerMap } from '$types/search/prefixTypes';

const prefixHandlers: Readonly<PrefixHandlerMap> = {
	duck: (q) => searchWithSearchEngine('duckduckgo', q),
	brave: (q) => searchWithSearchEngine('brave', q),
	g: (q) => searchWithSearchEngine('google', q),
	r: (q) => `https://www.reddit.com/search/?q=${encodeURIComponent(q)}`,
	y: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
	gi: (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`,
	bi: (q) => `https://search.brave.com/images?q=${encodeURIComponent(q)}`,
	gh: (q) => `https://www.github.com/search/?q=${encodeURIComponent(q)}`,
	wol: (q) => `https://www.wolframalpha.com/input?i=${encodeURIComponent(q)}`,
	npkg: (q) => `https://search.nixos.org/packages?channel=unstable&query=${encodeURIComponent(q)}`,
	nop: (q) => `https://search.nixos.org/options?channel=unstable&query=${encodeURIComponent(q)}`
};

/**
 * Try to build a URL from a query with a prefix.
 * Returns the URL if matched, or undefined if no match.
 *
 * @param query - The user input query string
 */
export function searchWithPrefix(query: string): string | undefined {
	const trimmed = query.trim();

	// Sort prefixes longest first to avoid conflicts (e.g., 'gi' before 'g')
	const sortedPrefixes = Object.keys(prefixHandlers).sort(
		(a, b) => b.length - a.length
	) as Prefix[];

	for (const prefix of sortedPrefixes) {
		if (trimmed.startsWith(prefix + ':')) {
			const searchQuery = trimmed.substring(prefix.length + 1).trim();
			return prefixHandlers[prefix](searchQuery);
		}
	}

	return undefined; // no match
}
