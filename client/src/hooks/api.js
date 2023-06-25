import { useMemo } from 'react';

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

/**
 * Get the name from local storage
 */
export function useUserName() {
    const name = useMemo(() => localStorage.getItem('name'), []);
    return name;
}

/**
 * Get the id from local storage
 */
export function useUserId() {
    const id = useMemo(() => localStorage.getItem('id'), []);
    return id;
}

/**
 * Get the token from local storage
 */
export function useToken() {
    const token = useMemo(() => localStorage.getItem('token'), []);
    return token;
}
