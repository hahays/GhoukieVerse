interface CategoryCard {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
    details: string;
}

export const filmsMock: CategoryCard[] = [
    {
        id: 'films-1',
        title: 'ФИЛЬМЫ',
        description: 'Track watched movies',
        href: '/films',
        image: '/images/films-bg.jpg', // положите файл в public/images
        details: 'Browse 10,000+ movies\nRate and review\nCreate watchlist'
    },
    {
        id: 'games-1',
        title: 'ИГРЫ',
        description: 'Track watched movies',
        href: '/films',
        image: '/images/games-bg.jpg', // положите файл в public/images
        details: 'Browse 10,000+ movies\nRate and review\nCreate watchlist'
    },
    {
        id: 'anime-1',
        title: 'АНИМЕ',
        description: 'Track watched movies',
        href: '/films',
        image: '/images/anime-bg.jpg', // положите файл в public/images
        details: 'Browse 10,000+ movies\nRate and review\nCreate watchlist'
    },

]