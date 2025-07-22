import React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-ghoukie-green text-ghoukie-white hover:bg-ghoukie-light-green hover:text-ghoukie-black',
                outline: 'border-2 border-ghoukie-black text-ghoukie-black hover:bg-ghoukie-light-green hover:text-ghoukie-black hover:border-ghoukie-light-green',
                ghost: 'hover:bg-primary-50 px-0 text-ghoukie-black',
                danger: 'bg-red-600 text-white hover:bg-red-700',
                secondary: 'bg-ghoukie-black text-ghoukie-white hover:bg-ghoukie-light-green hover:text-ghoukie-black',
                toggle: 'px-4 py-1 rounded-md',
                ghostToggle: 'px-6 py-3',
                tabs: ''
            },
            size: {
                xs: 'h-7 px-2 ',
                sm: 'h-10 px-4 ',
                md: 'h-11 px-8 ',
                lg: 'h-16 px-8 ',
                ghost: '',
                icon: 'h-9 w-9',
                toggle: '',
                ghostToggle: '',
                tabs: '',
            },
            textSize: {
                sm: 'text-sm',
                base: 'text-base',
                lg: 'text-lg',
                xl: 'text-xl',
                '2xl': 'text-2xl'
            },
            active: {
                true: '',
                false: '',
            },
        },


        compoundVariants: [
            {
                variant: 'toggle',
                active: true,
                className: '',
            },
            {
                variant: 'toggle',
                active: false,
                className: '',
            },

            {
                variant: 'toggle',
                className: 'transition-all whitespace-nowrap',
            },

            {
                variant: 'ghostToggle',
                active: false,
                className: 'text-ghoukie-white hover:bg-ghoukie-light-green hover:text-white',
            },
            {
                variant: 'ghostToggle',
                active: true,
                className: 'bg-ghoukie-white text-ghoukie-black',
            },
            {
                variant: 'tabs',
                className: 'transition-all whitespace-nowrap rounded-lg px-4 py-2',
            },
            {
                variant: 'tabs',
                active: true,
                className: 'bg-ghoukie-green text-ghoukie-black',
            },
            {
                variant: 'tabs',
                active: false,
                className: 'bg-ghoukie-white text-ghoukie-black',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'sm',
            active: false,
            textSize: undefined
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    loading?: boolean
    loader?: React.ReactNode
    fullWidth?: boolean
    as?: React.ElementType
    active?: boolean
    textSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            icon,
            iconPosition = 'left',
            children,
            loading,
            loader,
            fullWidth,
            active,
            as: Component = 'button',
            textSize,
            ...props
        },
        ref
    ) => {
        return (
            <Component
                className={buttonVariants({
                    variant,
                    size,
                    active,
                    textSize,
                    className: `${className || ''} ${fullWidth ? 'w-full' : ''}`,
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
