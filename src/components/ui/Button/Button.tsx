import React from 'react'
import {cva, type VariantProps} from "class-variance-authority"

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-ghoukie-green text-ghoukie-white hover:bg-primary-1100',
                outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
                ghost: 'hover:bg-primary-50 text-primary-600',
                danger: 'bg-red-600 text-white hover:bg-red-700',
            },
            size: {
                xs: 'h-7 px-2 text-xs',
                sm: 'h-9 px-4 text-sm',
                lg: 'h-11 px-8 text-base',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm',
        },
    }
)

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    loading?: boolean
    loader?: React.ReactNode
    fullWidth?: boolean
    as?: React.ElementType
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
         className,
         variant,
         size,
         icon,
         iconPosition = 'left',
         children,
         loading,
         loader,
         fullWidth,
         as: Component = 'button',
         ...props
     }, ref) => {
        return (
            <Component
                className={buttonVariants({
                    variant,
                    size,
                    className: `${className} ${fullWidth ? 'w-full' : ''}`
                })}
                disabled={loading || props.disabled}
                ref={ref}
                {...props}
            >
                {loading ? (
                    loader || <span className="animate-spin">🌀</span>
                ) : (
                    <>
                        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
                        {children}
                        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
                    </>
                )}
            </Component>
        )
    }
)

Button.displayName = 'Button'