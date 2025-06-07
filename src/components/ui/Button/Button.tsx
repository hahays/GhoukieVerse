import React from 'react'
import {cva, type VariantProps} from "class-variance-authority"

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
                toggle: 'whitespace-nowrap w-full transition-all',
                ghostToggle: 'whitespace-nowrap w-full transition-all',
            },
            size: {
                xs: 'h-7 px-2 text-xs',
                sm: 'h-10 px-4 text-sm',
                md: 'h-11 px-8 text-base',
                lg: 'h-16 px-8 text-2xl',
                ghost: 'text-xl',
                icon: 'h-9 w-9',
                toggle: 'px-4 py-2 text-xl'
            },
            active: {
                true: '',
                false: ''
            }
        },
        compoundVariants: [
            {
                variant: 'toggle',
                active: true,
                className: 'bg-ghoukie-black text-ghoukie-green rounded-[calc(0.5rem-3.5px)]'
            },
            {
                variant: 'toggle',
                active: false,
                className: 'bg-ghoukie-black text-ghoukie-white hover:opacity-90 rounded-[calc(0.5rem-3.5px)]'
            },
            {
                variant: 'toggle',
                className: 'relative rounded-lg p-[1.5px] data-[active=true]:bg-ghoukie-green data-[active=false]:bg-gradient-to-r from-[#000000] to-[#666666]'
            },
            {
                variant: 'ghostToggle',
                active: false,
                className: 'text-ghoukie-white hover:bg-ghoukie-light-green hover:text-white'
            },
            {
                variant: 'ghostToggle',
                active: true,
                className: 'bg-ghoukie-white text-ghoukie-black'
            }
        ],
        defaultVariants: {
            variant: 'default',
            size: 'sm',
            active: false
        }
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
    active?: boolean
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
         active,
         as: Component = 'button',
         ...props
     }, ref) => {
        const isToggle = variant === 'toggle';

        return (
            <div
                className={isToggle ? buttonVariants({ variant, size, active, className: 'shrink-0 flex-1' }) : undefined}
                data-active={active}
            >
                {isToggle && (
                    <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-[2px]">
                        <Component
                            className={buttonVariants({
                                variant,
                                size,
                                active,
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
                    </div>
                )}

                {!isToggle && (
                    <Component
                        className={buttonVariants({
                            variant,
                            size,
                            active,
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
                )}
            </div>
        )
    }
)


Button.displayName = 'Button'