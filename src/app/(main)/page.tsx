"use client";

import {CategoryCards} from "../../components/cards/CategoryCards";
import {PageHeader} from "../../components/layout/PageHeader";


export default function Home() {
    return (
        <>
            <PageHeader
                title="GHOUKIEVERSE"
                description="Отслеживай свои любимые фильмы, игры и аниме."
            />
            <section className="lg:px-16 lg:mb-20 px-4 mb-8 bg-ghoukie-white">
                <div className="mx-auto">
                    <CategoryCards/>
                </div>
            </section>
        </>
    )
}
