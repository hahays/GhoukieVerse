import KinopoiskIcon from '../../../assets/kinopoisk.svg';
import IviIcon from '../../../assets/ivi.svg';
import OkkoIcon from '../../../assets/okko.svg';
import AppleTvIcon from '../../../assets/apple-tv.svg';
import GooglePlayIcon from '../../../assets/google-play.svg';
import Image from "next/image";

type PublicIconName = 'addToList' | 'other-icon'; // Добавьте нужные

export type IconName =
    | 'kinopoisk' | 'ivi' | 'okko' | 'apple-tv' | 'google-play'
    | PublicIconName; // Объединяем типы

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}

// Иконки из assets
const componentIcons = {
    kinopoisk: KinopoiskIcon,
    ivi: IviIcon,
    okko: OkkoIcon,
    'apple-tv': AppleTvIcon,
    'google-play': GooglePlayIcon,
} as const;

export const Icon = ({ name, size = 24, className = '' }: IconProps) => {
    // Если иконка из public/icons/
    if (name === 'addToList') {
        return (
            <Image
                src={`/icons/${name}.svg`}
                alt={name}
                width={size}
                height={size}
                className={className}
            />
        );
    }

    // Иконки из assets как компоненты
    const SvgIcon = componentIcons[name];
    return <SvgIcon className={className} width={size} height={size} />;
};