import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
    id: string;
    title: string;
    description: string;
    svgPath: string;
    href: string;
    bgColor: string;
    hoverColor: string;
    innerBlockColor: string;
    titleColor?: string; // Опциональный цвет заголовка
    descriptionColor?: string; // Опциональный цвет описания
}

const categories: CategoryItem[] = [
    {
        id: '1',
        title: 'Фильмы',
        description: 'Смотрел фильм и забыл? Добавляй любой фильм себе в коллекцию!',
        svgPath: '/images/pop.svg',
        href: '/films',
        bgColor: 'bg-ghoukie-black',
        hoverColor: 'hover:bg-black',
        innerBlockColor: 'bg-ghoukie-green',
        titleColor: 'text-ghoukie-white',
        descriptionColor: 'text-ghoukie-white/80'
    },
    {
        id: '2',
        title: 'Игры',
        description: 'Пришло время перепройти Алладина, Короля Льва и Соника и не только!',
        svgPath: '/images/gamepad.svg',
        href: '/games',
        bgColor: 'bg-ghoukie-green',
        hoverColor: 'hover:bg-ghoukie-dark-green',
        innerBlockColor: 'bg-ghoukie-black',
        titleColor: 'text-ghoukie-black',
        descriptionColor: 'text-ghoukie-black/80'
    },
    {
        id: '3',
        title: 'Аниме',
        description: 'Наруто, Блич или может Созданный в бездне? Сделай свой выбор!',
        svgPath: '/images/anime.svg',
        href: '/anime',
        bgColor: 'bg-ghoukie-black',
        hoverColor: 'hover:bg-black',
        innerBlockColor: 'bg-ghoukie-green',
        titleColor: 'text-ghoukie-white',
        descriptionColor: 'text-ghoukie-white/80'
    },
];

export const CategoryCards = () => {
    return (
        <div className="grid grid-cols-1 font-victor md:grid-cols-3 gap-8">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={`group relative p-2 ${category.bgColor} ${category.hoverColor} overflow-hidden rounded-xl shadow-lg transition-all duration-300`}
                >
                    <div className="aspect-video relative flex items-center justify-center p-8">
                        <div className={`absolute inset-4 rounded-lg ${category.innerBlockColor} backdrop-blur-sm`}/>

                        <div className="relative w-full h-full">
                            <Link href={category.href}>
                                <Image
                                    src={category.svgPath}
                                    alt={category.title}
                                    fill
                                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                    quality={100}
                                />
                            </Link>
                        </div>
                    </div>

                    <Link href={category.href}>
                        <div className="px-4 pb-2 transition-colors duration-300">
                            <h3 className={`text-4xl font-bold mb-4 ${category.titleColor || 'text-ghoukie-white'}`}>
                                {category.title}
                            </h3>
                            <p className={`text-xl ${category.descriptionColor || 'text-ghoukie-gray'}`}>
                                {category.description}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};