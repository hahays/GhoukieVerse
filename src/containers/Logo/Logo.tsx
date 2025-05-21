import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
    className?: string;
    href?: string;
    logoSize?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
                                              className = '',
                                              href = '/',
                                              logoSize = 'md',
                                          }) => {
    const sizeClasses = {
        sm: { width: 32, height: 32 },  // 32x32px
        md: { width: 48, height: 48 },  // 48x48px
        lg: { width: 254, height: 64 }, // 120x60px (примерно как Search/Button)
    };

    const size = sizeClasses[logoSize];

    return (
        <Link href={href} className={`inline-flex items-center ${className}`}>
            <Image
                src="/images/LOGO_ONE.svg"
                alt="GhoukieVerse"
                width={size.width}
                height={size.height}
                className="object-contain"
                priority
            />
        </Link>
    );
};