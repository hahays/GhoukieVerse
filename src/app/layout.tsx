import {Geist, Geist_Mono, Vina_Sans, Victor_Mono, Alef} from "next/font/google";
import './globals.css'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const vinaSans = Vina_Sans({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-vina',
});

const alef = Alef({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-vina',
});

const victorMono = Victor_Mono({
    subsets: ['latin'],
    variable: '--font-victor',
});

export const metadata = {
    title: "Ghoukie Verse",
    description: "Трекер приложение",
};


export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${vinaSans.variable} ${victorMono.variable} ${alef.variable}`}>
        <body>{children}</body>
        </html>
    );
}
