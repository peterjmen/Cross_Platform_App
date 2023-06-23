/**
 * Create a URL for the API
 * @param {string} path 
 * @param {Record<string, string>} query
 */
export function useApiUrl(path, query) {
    const url = new URL(path, 'http://localhost:3001/v0');
    Object.entries(query) //
        .forEach(([key, value]) => url.searchParams.append(key, value));
    return url;
}
