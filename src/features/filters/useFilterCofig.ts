export const useFilterConfig = (mediaType: 'film' | 'game' | 'anime' | 'comic' | 'book') => {
    switch (mediaType) {
        case 'film':
            return {
                genres: ['боевик', 'драма', 'комедия'],
                platforms: ['Netflix', 'Disney+', 'IVI'],
            };
        case 'game':
            return {
                genres: ['RPG', 'Action', 'Strategy'],
                platforms: ['Steam', 'PlayStation', 'Xbox'],
            };
        case 'anime':
            return {
                genres: ['Shounen', 'Seinen', 'Slice of Life'],
                platforms: ['Crunchyroll', 'AniLibria'],
            };
        default:
            return { genres: [], platforms: [] };
    }
};