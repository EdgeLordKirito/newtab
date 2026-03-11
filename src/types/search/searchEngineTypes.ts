export type SearchEngine = 'google' | 'duckduckgo' | 'brave';

export type SearchEngineFn = (query: string) => string;

export type SearchEngineData = {
	displayName: string;
	buildUrl: (query: string) => string;
};

export type SearchEngineMap = Record<SearchEngine, SearchEngineData>;
