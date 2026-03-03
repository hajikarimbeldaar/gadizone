'use client'

import { useState } from 'react'
import { Search, Mic, CarFront, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeInView from '@/components/animations/FadeInView'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchClick = () => {
    router.push('/search')
  }

  const handleVoiceClick = () => {
    router.push('/search')
  }

  return (
    <section className="bg-white py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Title */}
        <FadeInView delay={0.1} distance={40} className="text-center mb-8 sm:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight"
          >
            Find Your Dream <br className="hidden sm:block" /> Used Car Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto font-medium"
          >
            Search from our extensive inventory of premium, inspected second-hand cars.
          </motion.p>
        </FadeInView>

        {/* Search Card */}
        <FadeInView delay={0.4} distance={40} className="max-w-2xl mx-auto">
          <motion.div
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-4 sm:p-6 lg:p-8 relative z-20"
          >
            {/* Search Input */}
            <div className="relative mb-4 sm:mb-5">
              <input
                type="text"
                value={searchQuery}
                onClick={handleSearchClick}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand, model, or body type..."
                className="w-full px-4 py-3 sm:px-5 sm:py-4 text-slate-900 placeholder-slate-400 text-sm sm:text-base bg-slate-50 hover:bg-slate-100 focus:bg-white transition-colors duration-200 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#291e6a]/20 pr-12 sm:pr-16 shadow-inner z-10 relative cursor-pointer"
                aria-label="Search for cars"
                readOnly
              />
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 z-20">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceClick}
                  className="p-2 sm:p-2.5 text-slate-500 hover:text-[#291e6a] rounded-lg transition-colors duration-200"
                  aria-label="Voice search"
                >
                  <Mic className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearchClick}
              className="w-full bg-[#1c144a] text-white font-bold py-3 sm:py-4 px-5 rounded-xl flex items-center justify-center space-x-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4 sm:mb-5"
            >
              <Search className="h-5 w-5" />
              <span>Search Cars</span>
            </motion.button>

            {/* Sell Your Car CTA - Integrated into Card */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Link
                href="/sell-your-car"
                className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white/50 py-3 sm:py-4 rounded-xl border-2 border-[#291e6a]/10 hover:border-[#291e6a]/30 hover:bg-white transition-all duration-300 group shadow-sm"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#291e6a]/10 flex items-center justify-center group-hover:bg-[#291e6a] transition-colors duration-300">
                  <CarFront className="w-4 h-4 sm:w-5 sm:h-5 text-[#291e6a] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#1c144a] tracking-tight">
                  Want to Sell Your Car?
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#291e6a] group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </FadeInView>
      </div>
    </section>
  )
}
