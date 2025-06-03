import KinopoiskIcon from '../../../assets/kinopoisk.svg';
import IviIcon from '../../../assets/ivi.svg';
import OkkoIcon from '../../../assets/okko.svg';
import AppleTvIcon from '../../../assets/apple-tv.svg';
import GooglePlayIcon from '../../../assets/google-play.svg';

export type IconName = 'kinopoisk' | 'ivi' | 'okko' | 'apple-tv' | 'google-play';

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}

const icons = {
    kinopoisk: KinopoiskIcon,
    ivi: IviIcon,
    okko: OkkoIcon,
    'apple-tv': AppleTvIcon,
    'google-play': GooglePlayIcon,
} as const;

export const Icon = ({ name, size = 24, className = '' }: IconProps) => {
    const SvgIcon = icons[name];
    return <SvgIcon className={className} width={size} height={size} />;
};