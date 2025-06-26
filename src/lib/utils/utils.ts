interface CacheItem {
    data: any;
    timestamp: number;
}


const KINO_API_KEY = process.env.NEXT_PUBLIC_KINO_API_KEY;

if (!KINO_API_KEY) {
    throw new Error('NEXT_PUBLIC_KINO_API_KEY is not defined');
}
const cache = new Map<string, CacheItem>();
const CACHE_TTL = 24 * 60 * 60 * 1000;


export async function fetchWithCache(url: string): Promise<any> {
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    if (typeof window !== 'undefined') {
        const localStorageKey = `kp_cache_${btoa(url)}`;
        const cachedResponse = localStorage.getItem(localStorageKey);

        if (cachedResponse) {
            const {data, timestamp} = JSON.parse(cachedResponse);
            if (Date.now() - timestamp < CACHE_TTL) {
                cache.set(url, {data, timestamp});
                return data;
            }
        }
    }

    const response = await fetch(url, {
        headers: {
            "X-API-KEY": KINO_API_KEY!,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Kinopoisk API error: ${response.status}`);
    }

    const data = await response.json();

    const cacheItem = {data, timestamp: Date.now()};
    cache.set(url, cacheItem);

    if (typeof window !== 'undefined') {
        localStorage.setItem(`kp_cache_${btoa(url)}`, JSON.stringify(cacheItem));
    }

    return data;
}