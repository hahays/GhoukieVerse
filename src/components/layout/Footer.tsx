import Link from 'next/link';
import React from 'react';
import {FooterProps} from "../../types/footer";
import {footerColumns} from "../../data/footer-links";



export const Footer: React.FC<FooterProps> = ({
                                                  bgColor = 'bg-ghoukie-green',
                                                  textColor = 'text-ghoukie-black',
                                                  hoverColor = 'hover:text-primary-600',
                                                  columns = footerColumns,
                                                  copyrightText = '© GHOUKIEVERSE',
                                                  copyrightHref = '/',
                                                  dividerColor = 'border-ghoukie-black',
                                                  className = '',
                                              }) => {
    const safeColumns = columns || [];

    return (
        <footer className={`${bgColor} font-alef px-16 py-9 mt-16 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {safeColumns.map((column, index) => (
                    <div key={`column-${index}`}>
                        <h3 className={`text-2xl text-ghoukie-white mb-6`}>
                            {column.title}
                        </h3>
                        <ul className="space-y-3 text-xl">
                            {column.links.map((link, linkIndex) => (
                                <li key={`link-${index}-${linkIndex}`}>
                                    <Link
                                        href={link.href}
                                        className={`${textColor} ${hoverColor} transition-colors flex items-center gap-2`}
                                    >
                                        {link.icon && <span>{link.icon}</span>}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-xl text-shadow-figma">
                <hr className={`my-8 w-full ${dividerColor} shadow-figma`} />
                <Link
                    href={copyrightHref}
                    className={`${textColor} ${hoverColor} transition-colors font-bold`}
                >
                    {copyrightText}
                </Link>
            </div>
        </footer>
    );
};