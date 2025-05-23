import Link from 'next/link'
import {Button} from "../components/ui/Button";


export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-ghoukie-black text-white">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">Страница не найдена</p>
            <Link href="/">
                <Button variant="danger">На главную</Button>
            </Link>
        </div>
    )
}