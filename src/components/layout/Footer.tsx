import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="bg-primary-50 border-t border-primary-200">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Лого и копирайт */}
                    <div className="mb-4 md:mb-0">
                        <Link
                            href="/"
                            className="text-primary-800 hover:text-primary-600 transition-colors font-bold"
                        >
                            GHOUKIEVERSE
                        </Link>
                        <p className="text-primary-600 text-sm mt-1">
                            © {new Date().getFullYear()} All media tracker
                        </p>
                    </div>

                    {/* Навигационные ссылки */}
                    <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link
                            href="/about"
                            className="text-primary-700 hover:text-primary-500 text-sm transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-primary-700 hover:text-primary-500 text-sm transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-primary-700 hover:text-primary-500 text-sm transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/contact"
                            className="text-primary-700 hover:text-primary-500 text-sm transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>

                {/* Дополнительная информация */}
                <div className="mt-6 pt-6 border-t border-primary-200 text-center">
                    <p className="text-primary-500 text-xs">
                        Data provided by TMDB, IGDB and Jikan API
                    </p>
                </div>
            </div>
        </footer>
    )
}