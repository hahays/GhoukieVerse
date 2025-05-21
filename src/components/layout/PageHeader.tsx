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
        <section className={`pt-36 text-center ${className}`}>
            <div className="container mx-auto">
                <h1 className="text-9xl font-customBold text-shadow-figma tracking-absolute-18 font-vina text-ghoukie-black ">{title}</h1>
                <p className="text-2xl text-ghoukie-gray font-victor max-w-2xl mx-auto mb-10">
                    {description}
                </p>

                {showButtons && (
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                            Explore Content
                        </button>
                        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Join Community
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}