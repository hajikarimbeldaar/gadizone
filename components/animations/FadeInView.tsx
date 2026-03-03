'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInViewProps extends HTMLMotionProps<"div"> {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    distance?: number
}

export default function FadeInView({
    children,
    delay = 0,
    direction = 'up',
    distance = 30,
    className = '',
    ...props
}: FadeInViewProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: { x: 0, y: 0 }
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
