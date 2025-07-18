'use client'

import {useState} from 'react'
import Link from 'next/link'
import {footerColumns} from "../../data/footer-links";
import {FooterProps} from "../../types/footer";

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
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({})

    const toggleSection = (index: number) => {
        setOpenSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <footer className={`${bgColor} font-alef px-6 lg:px-16 py-6 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(columns || []).map((column, index) => (
                    <div key={`column-${index}`}>
                        <button
                            className="md:hidden flex items-center justify-between w-full"
                            onClick={() => toggleSection(index)}
                        >
                            <h3 className={`text-2xl text-ghoukie-white`}>
                                {column.title}
                            </h3>
                            <span className="text-ghoukie-white text-2xl">
                {openSections[index] ? '−' : '+'}
              </span>
                        </button>

                        <h3 className={`hidden md:block text-xl lg:text-2xl text-ghoukie-white mb-6`}>
                            {column.title}
                        </h3>

                        <ul className={`${
                            openSections[index] ? 'block' : 'hidden'
                        } md:block space-y-3 text-sm lg:text-xl`}>
                            {column.links.map((link, linkIndex) => (
                                <li key={`link-${index}-${linkIndex}`}>
                                    <Link
                                        href={link.href}
                                        className={`${textColor} ${hoverColor} transition-colors flex items-center gap-2 py-1`}
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

            <div className="mt-8 text-center lg:text-xl  text-shadow-figma">
                <hr className={`my-6 md:my-8 w-full ${dividerColor} shadow-figma`}/>
                <Link
                    href={copyrightHref}
                    className={`${textColor} ${hoverColor} transition-colors font-bold`}
                >
                    {copyrightText}
                </Link>
            </div>
        </footer>
    )
}