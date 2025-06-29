'use client'

import React, {useEffect, useState} from "react";
import {Logo} from "../../../containers/Logo";
import {Search} from "../../../features/Search";
import {NumResults} from "../../../containers/NumResults";
import {Movie} from "../../../types";
import Link from "next/link";
import {Button} from "../../ui/Button";


interface NavBarProps {
    movies?: Movie[];
    query?: string;
    setQuery?: (query: string) => void;
    onLoginClick: () => void;
}

const NavLink = ({href, children}: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="hover:text-ghoukie-green transition-colors font-medium py-1 px-2 rounded"
    >
        {children}
    </Link>
)

const MobileNavLink = ({href, children}: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="block hover:bg-primary-100/20 transition-colors font-medium py-2 px-4 rounded"
    >
        {children}
    </Link>
)

const MenuIcon = ({isOpen}: { isOpen: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {isOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        ) : (
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        )}
    </svg>
)

export const NavBar: React.FC<NavBarProps> = ({movies, query, setQuery, onLoginClick}) => {
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(true)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollPos = window.pageYOffset
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
            setPrevScrollPos(currentScrollPos)
            setScrolled(currentScrollPos > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])

    return (
        <nav className={`fixed w-full h-24 transition-all duration-300 z-50  ${
            visible ? 'top-0' : '-top-24'
        } ${
            scrolled
                ? 'bg-ghoukie-white '
                : 'bg-ghoukie-white '
        }`}>
            <div className=" mx-auto px-16 py-6 font-victor">
                <div className="flex justify-between items-center">

                    <div className="flex items-center ">
                        <Logo href="/" logoSize="lg" className="hover:opacity-80"/>
                    </div>

                    <div className="hidden md:flex text-2xl text-ghoukie-black space-x-6 flex p">
                        <NavLink href="/">Главная</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/films">Фильмы</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/games">Игры</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/anime">Аниме</NavLink>
                        <NavLink href="/roadmap">Roadmap</NavLink>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block w-64">
                            <Search value={query} className="shadow-figma" onChange={setQuery}/>
                        </div>

                        <Link href="/profile">
                            <Button className="shadow-figma" size="lg">
                                Профиль
                            </Button>
                        </Link>


                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MenuIcon isOpen={isMenuOpen}/>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3">
                        <div className="mb-4">
                            <Search query={query} setQuery={setQuery}/>
                        </div>
                        <MobileNavLink href="/GhoukieVerse/src/app/(main)/films">Фильмы</MobileNavLink>
                        <MobileNavLink href="/GhoukieVerse/src/app/(main)/games">Игры</MobileNavLink>
                        <MobileNavLink href="/GhoukieVerse/src/app/(main)/anime">Aниме</MobileNavLink>
                        <MobileNavLink href="/roadmap">Roadmap</MobileNavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}


