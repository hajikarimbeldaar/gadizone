'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerGridProps extends HTMLMotionProps<"div"> {
    children: ReactNode
    staggerDelay?: number
}

const containerVars = {
    hidden: { opacity: 0 },
    show: (staggerDelay: number = 0.05) => ({
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay
        }
    })
}

const itemVars: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
}

export function StaggerGridItem({ children, className = '', ...props }: { children: ReactNode, className?: string } & HTMLMotionProps<"div">) {
    return (
        <motion.div variants={itemVars} className={className} {...props}>
            {children}
        </motion.div>
    )
}

export default function StaggerGrid({
    children,
    staggerDelay = 0.05,
    className = '',
    ...props
}: StaggerGridProps) {
    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            custom={staggerDelay}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}
