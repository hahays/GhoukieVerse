export const FILTER_OPTIONS = {
    rating: [
        { value: '', label: 'Рейтинг' },
        { value: '9-10', label: '9+ (Отлично)' },
        { value: '8-10', label: '8+ (Очень хорошо)' },
        { value: '7-10', label: '7+ (Хорошо)' },
        { value: '6-10', label: '6+ (Неплохо)' },
        { value: '5-10', label: '5+ (Так себе)' },
    ],
    type: [
        { value: '', label: 'Все' },
        { value: 'movie', label: 'Фильмы' },
        { value: 'tv-series', label: 'Сериалы' },
        { value: 'cartoon', label: 'Мультфильмы' },
    ],
    awards: [
        { value: '', label: 'Все награды' },
        { value: 'Оскар', label: 'Оскар' },
        { value: 'Золотой глобус', label: 'Золотой глобус' },
    ],
    popularity: [
        { value: '', label: 'Популярность' },
        { value: 'high', label: 'Высокая' },
        { value: 'medium', label: 'Средняя' },
        { value: 'low', label: 'Низкая' },
    ],
    ages: [
        { value: '', label: 'Все' },
        { value: '18', label: '18+' },
        { value: '16', label: '16+' },
        { value: '12', label: '12+' },
    ],
} as const;