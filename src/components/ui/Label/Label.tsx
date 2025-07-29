import React from 'react'

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'primary' | 'destructive' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    closable?: boolean
    onClose?: () => void
}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(
    ({
         className = '',
         variant = 'default',
         size = 'md',
         closable,
         onClose,
         children,
         ...props
     }, ref) => {
        const variantStyles = {
            default: 'bg-gray-100 text-gray-800',
            primary: 'bg-ghoukie-green text-white',
            destructive: 'bg-red-500 text-white',
            outline: 'bg-transparent border border-gray-300 text-gray-800'
        }

        const sizeStyles = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-3 py-1 text-sm',
            lg: 'px-4 py-2 text-base'
        }

        const combinedClasses = [
            'inline-flex items-center rounded-full font-medium',
            variantStyles[variant],
            sizeStyles[size],
            className
        ].join(' ')

        return (
            <div
                ref={ref}
                className={combinedClasses}
                {...props}
            >
                {children}
                {closable && (
                    <button
                        onClick={onClose}
                        className="ml-2 rounded-full hover:bg-black/10 p-0.5"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                )}
            </div>
        )
    }
)

Label.displayName = 'Label'