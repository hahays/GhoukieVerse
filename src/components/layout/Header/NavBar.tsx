'use client'

import React, {useEffect, useState} from "react";
import {Logo} from "../../../containers/Logo";
import {Search} from "../../../features/Search";
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
        <nav className={`fixed w-full h-16 md:h-24 transition-all duration-300 z-50 ${
            visible ? 'top-0' : '-top-24'
        } bg-ghoukie-white`}>
            <div className="mx-4 md:mx-8 lg:mx-16 py-3 md:py-6 font-victor">
                <div className="flex justify-between items-center">

                    <div className="flex items-center ">
                        <Logo
                            href="/"
                            logoSize="lg"
                            className="hover:opacity-80 w-[180px] h-[45px] md:w-[200px] md:h-[50px]"
                        />
                    </div>

                    <div className="hidden xl:flex text-lg md:text-lg 2xl:text-2xl text-ghoukie-black space-x-6">
                        <NavLink href="/">Главная</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/films">Фильмы</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/games">Игры</NavLink>
                        <NavLink href="/GhoukieVerse/src/app/(main)/anime">Аниме</NavLink>
                        <NavLink href="/roadmap">Roadmap</NavLink>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden xl:block max-w-xs lg:max-w-sm xl:max-w-md w-full">
                            <Search value={query} className="shadow-figma h-16 text-2xl" onChange={setQuery}/>
                        </div>

                        <Link href="/profile">
                            <Button
                                className="shadow-figma hidden md:inline-flex"
                                size="lg"
                                textSize="2xl"
                            >
                                Профиль
                            </Button>
                            <Button
                                className="shadow-figma md:hidden sm:inline-flex"
                                size="sm"
                                textSize="lg"
                                aria-label="Профиль"
                            >
                                Профиль
                            </Button>
                        </Link>

                        <button
                            className="xl:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MenuIcon isOpen={isMenuOpen}/>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="xl:hidden mt-3 space-y-2 bg-white rounded-lg shadow-xl p-3">
                        <div className="mb-3">
                            <Search query={query} setQuery={setQuery} inputClassName="h-16 text-2xl" className="w-full"/>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <MobileNavLink href="/">Главная</MobileNavLink>
                            <MobileNavLink href="/films">Фильмы</MobileNavLink>
                            <MobileNavLink href="/games">Игры</MobileNavLink>
                            <MobileNavLink href="/anime">Аниме</MobileNavLink>
                            <MobileNavLink href="/roadmap">Roadmap</MobileNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}


