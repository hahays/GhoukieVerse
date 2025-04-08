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

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="hover:text-primary-400 transition-colors font-medium py-1 px-2 rounded"
    >
        {children}
    </Link>
)

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="block hover:bg-primary-100/20 transition-colors font-medium py-2 px-4 rounded"
    >
        {children}
    </Link>
)

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {isOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        ) : (
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        )}
    </svg>
)

export const NavBar: React.FC<NavBarProps> = ({ movies, query, setQuery, onLoginClick }) => {
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
        <nav className={`fixed w-full transition-all duration-300 z-50 ${
            visible ? 'top-0' : '-top-20'
        } ${
            scrolled
                ? 'bg-primary-800 text-white shadow-md'
                : 'bg-primary-100/80 text-primary-900 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">

                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-2xl font-bold hover:text-primary-400 transition-colors">
                            GHOUKIEVERSE
                        </Link>

                        <div className="hidden md:flex space-x-6">
                            <NavLink href="/films">Фильмы</NavLink>
                            <NavLink href="/games">Игры</NavLink>
                            <NavLink href="/anime">Аниме</NavLink>
                        </div>
                    </div>


                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block w-64">
                            <Search query={query} setQuery={setQuery} />
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                                Войти
                            </Button>
                            <Button size="sm">
                                Зарегестрироваться
                            </Button>
                        </div>


                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MenuIcon isOpen={isMenuOpen} />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3">
                        <div className="mb-4">
                            <Search query={query} setQuery={setQuery} />
                        </div>
                        <MobileNavLink href="/films">Films</MobileNavLink>
                        <MobileNavLink href="/games">Games</MobileNavLink>
                        <MobileNavLink href="/anime">Anime</MobileNavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}


