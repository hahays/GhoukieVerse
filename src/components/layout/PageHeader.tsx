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
        <section className={`pt-36 text-center pb-16 ${className}`}>
            <div className="container mx-auto">
                <h1 className="text-9xl pb-4 font-customBold text-shadow-figma tracking-absolute-18 text-ghoukie-black">
                    {title}
                </h1>
                <p className="text-2xl pb-8 text-ghoukie-gray text-shadow-figma font-victor max-w-2xl mx-auto ">
                    {description}
                </p>

                {showButtons && (
                    <div className="flex justify-center space-x-4">
                      <Button size="lg" variant="secondary">  Твой каталог </Button>
                        <Button size="lg" variant="outline"> Начать </Button>
                    </div>
                )}
            </div>
        </section>
    )
}