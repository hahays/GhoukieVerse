import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-primary-600 text-white hover:bg-primary-700',
                outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                lg: 'h-11 px-8 text-base',
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
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'