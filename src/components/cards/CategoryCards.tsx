import Link from 'next/link'
import Image from 'next/image'
import {filmsMock} from "../../data/mock/films";


export const CategoryCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filmsMock.map((item, index) => (
                <div
                    key={item.id}
                    className={`group relative p-2 hover:shadow-xl ${index !== 1 ?  'bg-ghoukie-black  hover:bg-black': 'absolute inset-0 bg-ghoukie-green hover:bg-ghoukie-dark-green '} overflow-hidden rounded-xl  shadow-lg transition-all duration-300 `}
                >

                    <div className="aspect-video relative">
                        <Link href={item.href}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-500 "
                                quality={80}
                            />

                            <div
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white text-center p-4 text-sm whitespace-pre-line">
                                    {item.details}
                                </p>
                            </div>
                        </Link>
                    </div>


                    <Link href={item.href}>
                        <div className={`p-6 transition-colors duration-300 `}>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                            <p className="text-primary-600">{item.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}