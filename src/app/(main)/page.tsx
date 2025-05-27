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

            <section className="px-16">
                <div className="mx-auto">
                    <CategoryCards/>
                </div>
            </section>
        </>
    )
}
