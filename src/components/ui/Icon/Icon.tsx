import KinopoiskIcon from '../../../assets/kinopoisk.svg';
import IviIcon from '../../../assets/ivi.svg';
import OkkoIcon from '../../../assets/okko.svg';
import AppleTvIcon from '../../../assets/apple-tv.svg';
import GooglePlayIcon from '../../../assets/google-play.svg';
import ImdbRatingIcon from "../../../../public/icons/imdb_rating.svg"
import KinoPoiskRatingIcon from "../../../assets/kinopoisk.svg";
import Image from "next/image";

type PublicIconName = 'addToList' | 'other-icon';

export type IconName =
    | 'kinopoisk' | 'ivi' | 'okko' | 'apple-tv' | 'google-play' | 'kinopoiskRating' | 'imdbRating'
    | PublicIconName;

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}

const componentIcons = {
    kinopoisk: KinopoiskIcon,
    kinopoiskRating: KinoPoiskRatingIcon,
    imdbRating: ImdbRatingIcon,
    ivi: IviIcon,
    okko: OkkoIcon,
    'apple-tv': AppleTvIcon,
    'google-play': GooglePlayIcon,
} as const;

export const Icon = ({ name, size = 24, className = '' }: IconProps) => {
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

    const SvgIcon = componentIcons[name];
    return <SvgIcon className={className} width={size} height={size} />;
};