import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="bg-ghoukie-green font-alef px-16 py-9 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <h3 className="text-2xl text-ghoukie-white mb-6">Данные предоставлены</h3>
                    <ul className="space-y-3 text-xl text-ghoukie-black">
                        <li>
                            <Link href="/TMDB" className="hover:text-primary-600 transition-colors">TMDB</Link>
                        </li>
                        <li>
                            <Link href="/IGDB" className="hover:text-primary-600 transition-colors">IGDB</Link>
                        </li>
                        <li>
                            <Link href="/Jikan API" className="hover:text-primary-600 transition-colors">Jikan
                                API</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl text-ghoukie-white mb-6">Разделы</h3>
                    <ul className="space-y-3 text-xl text-ghoukie-black">
                        <li>
                            <Link href="/" className="hover:text-primary-600 transition-colors">Главная</Link>
                        </li>
                        <li>
                            <Link href="/games" className="hover:text-primary-600 transition-colors">Игры</Link>
                        </li>
                        <li>
                            <Link href="/films" className="hover:text-primary-600 transition-colors">Фильмы</Link>
                        </li>
                        <li>
                            <Link href="/anime" className="hover:text-primary-600 transition-colors">Аниме</Link>
                        </li>
                        <li>
                            <Link href="/contacts" className="hover:text-primary-600 transition-colors">Контакты</Link>
                        </li>

                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl text-ghoukie-white mb-6">Профиль</h3>
                    <ul className="space-y-3 text-xl text-ghoukie-black">
                        <li>
                            <Link href="/watched"
                                  className="hover:text-primary-600 transition-colors">Просмотренно</Link>
                        </li>
                        <li>
                            <Link href="/favorites" className="hover:text-primary-600 transition-colors">Любимые</Link>
                        </li>
                        <li>
                            <Link href="/playing" className="hover:text-primary-600 transition-colors">Играю</Link>
                        </li>
                        <li>
                            <Link href="/watch" className="hover:text-primary-600 transition-colors">Смотрю</Link>
                        </li>
                        <li>
                            <Link href="/played" className="hover:text-primary-600 transition-colors">Пройдено</Link>
                        </li>
                        <li>
                            <Link href="/abandoned" className="hover:text-primary-600 transition-colors">Брошено</Link>
                        </li>

                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl text-ghoukie-white mb-6">О приложении</h3>
                    <ul className="space-y-3 text-xl text-ghoukie-black">
                        <li>
                            <Link href="/FAQ" className="hover:text-primary-600 transition-colors">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/roadmap" className="hover:text-primary-600 transition-colors">Roadmap</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="hover:text-primary-600 transition-colors">Политика
                                конфиденциальности</Link>
                        </li>
                        <li>
                            <Link href="/terms-of-use" className="hover:text-primary-600 transition-colors">Условия
                                использования</Link>
                        </li>
                        <li>
                            <Link href="/changelog"
                                  className="hover:text-primary-600 transition-colors">Changelog</Link>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center text-xl text-shadow-figma">
                <hr className="my-8 w-full  border-ghoukie-black shadow-figma"/>
                <Link href="/" className="text-ghoukie-black hover:text-primary-600 transition-colors font-bold">©
                    GHOUKIEVERSE</Link>
            </div>
        </footer>


    )
}