import {Button} from "../ui/Button";

interface PageHeaderProps {
    title: string
    description: string
    showButtons?: boolean
    className?: string
}

export const PageHeader = ({
                               title,
                               description,
                               showButtons = true,
                               className = ''
                           }: PageHeaderProps) => {
    return (
        <section className={`pt-20 md:pt-36 text-center mb-8 md:pb-0 lg:pb-16 ${className}`}>
            <div className="container mx-auto px-4">
                <h1 className={`2xl:text-9xl lg:text-8xl text-5xl pb-4 font-customBold text-shadow-figma tracking-absolute-18 text-ghoukie-black ${
                    title === "GHOUKIEVERSE" ? "hidden md:block" : ""
                }`}>
                    {title}
                </h1>
                <p className="sm:text-2xl text-lg pb-6 md:pb-8 text-ghoukie-gray text-shadow-figma font-victor max-w-2xl mx-auto">
                    {description}
                </p>

                {showButtons && (
                    <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 md:space-x-4">
                        <Button size="lg" variant="secondary" className="w-full md:w-auto">
                            Твой каталог
                        </Button>
                        <Button size="lg" variant="outline" className="w-full md:w-auto">
                            Начать
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}