import { useState, useEffect } from 'react'

export const useScrollDirection = (): 'up' | 'down' => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

    useEffect(() => {
        let lastScrollY = window.pageYOffset

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset
            const direction = scrollY > lastScrollY ? 'down' : 'up'
            if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 5) {
                setScrollDirection(direction)
            }
            lastScrollY = scrollY > 0 ? scrollY : 0
        }

        window.addEventListener('scroll', updateScrollDirection)
        return () => window.removeEventListener('scroll', updateScrollDirection)
    }, [scrollDirection])

    return scrollDirection
}