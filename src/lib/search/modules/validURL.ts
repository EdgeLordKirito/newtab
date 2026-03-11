export function isValidURL(query: string): string | undefined {
  try {
    new URL(query);
    return query;
  } catch {
    return undefined;
  }
};