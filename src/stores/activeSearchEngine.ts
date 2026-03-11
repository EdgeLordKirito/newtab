import { writable } from 'svelte/store';
import type { SearchEngine } from '../types/search/searchEngineTypes';

const STORAGE_KEY = 'activeSearchEngine';

const storedValue = localStorage.getItem(STORAGE_KEY) as SearchEngine | null;
const initial: SearchEngine = storedValue ?? 'duckduckgo';

export const activeSearchEngine = writable<SearchEngine>(initial);

activeSearchEngine.subscribe((value) => {
  localStorage.setItem(STORAGE_KEY, value);
});

export function setActiveSearchEngine(engine: SearchEngine) {
  activeSearchEngine.set(engine);
}