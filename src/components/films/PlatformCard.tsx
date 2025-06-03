import {RatingDiagram} from './RatingDiagram';
import {IconName} from "lucide-react/dynamic";
import {Icon} from "../ui/Icon/Icon";
import {Button} from "../ui/Button";

interface Platform {
    id: number;
    name: string;
    icon: string;
    price: string;
}

const platforms: Platform[] = [
    {
        id: 1,
        name: "Kinopoisk HD",
        icon: "kinopoisk-hd",
        price: "от 299 ₽"
    },
    {
        id: 2,
        name: "IVI",
        icon: "ivi",
        price: "по подписке"
    },
    {
        id: 3,
        name: "Okko",
        icon: "okko",
        price: "аренда 350 ₽"
    },
    {
        id: 4,
        name: "Apple TV",
        icon: "apple-tv",
        price: "от 399 ₽"
    },
    {
        id: 5,
        name: "Google Play",
        icon: "google-play",
        price: "от 349 ₽"
    }
];

export const PlatformCard = () => {
    return (
        <div className="w-[354px] flex-shrink-0 relative h-[calc(100vh-200px)] min-h-[600px]">
            <div className="absolute -left-2 top-2 w-full h-full bg-ghoukie-green rounded-lg z-0 opacity-90"></div>
            <div className="bg-ghoukie-black text-white p-6 rounded-lg shadow-xl relative z-10 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold font-victor mb-6 text-center text-ghoukie-white">
                    ГДЕ ПОСМОТРЕТЬ
                </h2>

                <div className="space-y-4 mb-8">
                    {platforms.map((platform) => (
                        <div key={platform.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                            <Icon name={platform.icon as IconName} size={32}/>
                            <div className="flex-1">
                                <p className="font-medium">{platform.name}</p>
                                <p className="text-sm text-gray-400">{platform.price}</p>
                            </div>
                            <Button variant="primary">
                                Смотреть
                            </Button>
                        </div>
                    ))}
                </div>

                <RatingDiagram rating={4.5}/>
            </div>
        </div>
    );
};