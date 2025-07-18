import {NavBar} from "../../components/layout/Header/NavBar";
import {Footer} from "../../components/layout/Footer";
import React from "react";


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <main className=" bg-ghoukie-white">
                {children}
            </main>
            <Footer />
        </>
    )
}