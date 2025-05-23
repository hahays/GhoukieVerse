import {FooterColumn} from "../types/footer";



   export const footerColumns: FooterColumn[] = [
        {
            title: 'Данные предоставлены',
            links: [
                {label: 'TMDB', href: '/TMDB'},
                {label: 'IGDB', href: '/IGDB'},
                {label: 'Jikan API', href: '/Jikan API'},
            ],
        },
        {
            title: 'Разделы',
            links: [
                {label: 'Главная', href: '/'},
                {label: 'Игры', href: '/games'},
                {label: 'Фильмы', href: '/films'},
                {label: 'Аниме', href: '/anime'},
                {label: 'Контакты', href: '/contacts'},
            ],
        },
        {
            title: 'Профиль',
            links: [
                {label: 'Просмотренно', href: '/watched'},
                {label: 'Любимые', href: '/favorites'},
                {label: 'Играю', href: '/playing'},
                {label: 'Смотрю', href: '/watch'},
                {label: 'Пройдено', href: '/played'},
                {label: 'Брошено', href: '/abandoned'},
            ],
        },
        {
            title: 'О приложении',
            links: [
                {label: 'FAQ', href: '/FAQ'},
                {label: 'Roadmap', href: '/roadmap'},
                {label: 'Политика конфиденциальности', href: '/privacy-policy'},
                {label: 'Условия использования', href: '/terms-of-use'},
                {label: 'Changelog', href: '/changelog'},
            ],
        },
    ]
