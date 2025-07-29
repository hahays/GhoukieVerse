'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
    {
        title: 'GAMES',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        img: '/images/gamepad_roadmap.png',
        imgSide: 'right',
    },
    {
        title: 'ANIME',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        img: '/images/anime_roadmap.png',
        imgSide: 'left',
    },
    {
        title: 'COMICS',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        img: '/images/comics_roadmap.png',
        imgSide: 'right',
    },
    {
        title: 'BOOKS',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
        img: '/images/books_roadmap.png',
        imgSide: 'left',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.35 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function RoadmapPage() {
    return (
        <section className="min-h-screen bg-ghoukie-white font-victor px-4 py-20 md:py-32">
            <div className="container mx-auto max-w-5xl">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-customBold text-center text-ghoukie-black mb-20"
                >
                    ROADMAP
                </motion.h1>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ghoukie-green to-ghoukie-black -translate-x-1/2"></div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-16"
                    >
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="relative flex items-center"
                            >

                                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-ghoukie-green rounded-full z-10"></div>

                                {step.imgSide === 'right' ? (
                                    <>

                                        <div className="w-full md:w-5/12 pr-2 md:pr-6 text-right">
                                            <h2 className="text-2xl md:text-3xl font-bold text-ghoukie-green mb-2">{step.title}</h2>
                                            <p className="text-base text-ghoukie-gray">{step.desc}</p>
                                        </div>

                                        <div className="hidden md:block w-2/12 relative">
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-ghoukie-green"></div>
                                        </div>

                                        <div className="w-full md:w-5/12 pl-2 md:pl-0 flex justify-start">
                                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-ghoukie-black shadow-lg">
                                                <Image src={step.img} alt={step.title} fill className="object-cover" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className="w-full md:w-5/12 pr-2 md:pr-0 flex justify-end">
                                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-ghoukie-black shadow-lg">
                                                <Image src={step.img} alt={step.title} fill className="object-cover" />
                                            </div>
                                        </div>

                                        <div className="hidden md:block w-2/12 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-ghoukie-green"></div>
                                        </div>

                                        <div className="w-full md:w-5/12 pl-2 md:pl-6 text-left">
                                            <h2 className="text-2xl md:text-3xl font-bold text-ghoukie-green mb-2">{step.title}</h2>
                                            <p className="text-base text-ghoukie-gray">{step.desc}</p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}