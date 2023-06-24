/**
 * Create a URL for the API
 * @param {string} path 
 * @param {Record<string, string>} query
 */
export function useApiUrl(path, query) {
    if (!path.startsWith('/')) path = '/' + path;
    const url = new URL('v0' + path, 'http://localhost:3001');
    if (query) Object.entries(query) //
        .forEach(([key, value]) => url.searchParams.append(key, value));
    return url;
}
