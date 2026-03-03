interface PageSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'blue'
  title?: string
  subtitle?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl'
}

import FadeInView from '@/components/animations/FadeInView'

// ...
export default function PageSection({
  children,
  className = '',
  background = 'white',
  title,
  subtitle,
  maxWidth = '7xl'
}: PageSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-[#f4f6f9]',
    blue: 'bg-blue-50'
  }

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl'
  }

  return (
    <FadeInView distance={40} className={`${bgClasses[background]} py-6 sm:py-8 ${className}`}>
      <section>
        <div className={`${maxWidthClasses[maxWidth]} mx-auto px-3 sm:px-4 lg:px-6 xl:px-8`}>
          {(title || subtitle) && (
            <div className="mb-6 sm:mb-8 text-center">
              {title && (
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#291e6a] mb-4 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    </FadeInView>
  )
}