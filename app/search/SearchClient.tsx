'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ArrowLeft, Clock, TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { motion, AnimatePresence } from 'framer-motion'

interface CarModel {
    id: string
    name: string
    brandName: string
    brandSlug: string
    modelSlug: string
    slug: string
    heroImage: string
}

interface SearchResponse {
    results: CarModel[]
    count: number
    took: number
    query: string
    matchType?: string
}

interface SearchClientProps {
    trendingSearches: { term: string, url: string }[]
    initialQuery?: string
}

const RECENT_SEARCHES_KEY = 'gz_recent_searches'

export default function SearchClient({ trendingSearches, initialQuery = '' }: SearchClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [searchResults, setSearchResults] = useState<CarModel[]>([])
    const [loading, setLoading] = useState(false)
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const abortControllerRef = useRef<AbortController | null>(null)

    // Reduced debounce for "instant" feel
    const debouncedSearchQuery = useDebounce(searchQuery, 150)

    // Load recent searches from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) {
                    setRecentSearches(parsed)
                }
            } catch (e) {
                console.error('Failed to parse recent searches', e)
            }
        }
    }, [])

    // Update search query from URL params
    useEffect(() => {
        const query = searchParams.get('q')
        if (query && query !== searchQuery) {
            setSearchQuery(query)
        }
    }, [searchParams])

    // Search functionality
    useEffect(() => {
        const performSearch = async (query: string) => {
            if (abortControllerRef.current) abortControllerRef.current.abort()

            if (query.trim() === '' || query.length < 2) {
                setSearchResults([])
                return
            }

            try {
                setLoading(true)
                abortControllerRef.current = new AbortController()

                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
                const response = await fetch(
                    `${backendUrl}/api/search?q=${encodeURIComponent(query)}&limit=15`,
                    { signal: abortControllerRef.current.signal }
                )

                if (!response.ok) throw new Error('Search failed')

                const data: SearchResponse = await response.json()
                setSearchResults(data.results)
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Error searching:', error)
                    setSearchResults([])
                }
            } finally {
                setLoading(false)
            }
        }

        if (debouncedSearchQuery) {
            performSearch(debouncedSearchQuery)
        } else {
            setSearchResults([])
        }

        return () => abortControllerRef.current?.abort()
    }, [debouncedSearchQuery])

    const handleItemClick = (term: string) => {
        setSearchQuery(term)
        // Also save to recent when clicking from trending
        addToRecent(term)
    }

    const addToRecent = (term: string) => {
        if (!term.trim()) return

        // Get latest from state to avoid stale closure issues
        setRecentSearches(prev => {
            const newRecent = [term, ...prev.filter(s => s !== term)].slice(0, 5)
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent))
            return newRecent
        })
    }

    const highlightText = (text: string, query: string) => {
        if (!query) return text
        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase()
                        ? <span key={i} className="font-bold text-gray-900">{part}</span>
                        : <span key={i} className="text-gray-600">{part}</span>
                )}
            </span>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        },
        exit: { opacity: 0 }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 }
    }

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <div className="bg-white max-w-2xl mx-auto min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.05)] border-x border-slate-100/50 flex flex-col relative">

                {/* Sticky Search Header */}
                <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 pb-2 pt-2 sm:pt-4">
                    <div className="flex items-center px-3 sm:px-6 h-14 md:h-16 gap-3">
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 text-slate-500 hover:text-[#e21a22] hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>

                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                placeholder="Search cars (e.g. Swift, City, SUV)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3 h-12 bg-slate-50/80 hover:bg-slate-100 focus:bg-white text-slate-900 font-medium text-base sm:text-lg rounded-2xl px-5 border border-transparent focus:border-red-100 focus:ring-4 focus:ring-red-50 outline-none placeholder:text-slate-400 transition-all duration-200"
                                autoFocus
                            />
                            <AnimatePresence>
                                {searchQuery && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wider uppercase text-slate-400 hover:text-[#e21a22] px-2 py-1 rounded-md transition-colors"
                                    >
                                        Clear
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-x-hidden relative">
                    <AnimatePresence mode="wait">
                        {/* 1. Initial State: Recent and Trending */}
                        {(!searchQuery || searchQuery.length < 2) && (
                            <motion.div
                                key="initial"
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                variants={containerVariants}
                                className="px-4 sm:px-8 py-6 space-y-10"
                            >
                                {/* Recently viewed - Hidden if empty */}
                                {recentSearches.length > 0 && (
                                    <section>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recently viewed</h3>
                                        <div className="space-y-1">
                                            {recentSearches.map((term, idx) => (
                                                <motion.button
                                                    key={`recent-${term}-${idx}`}
                                                    variants={itemVariants}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleItemClick(term)}
                                                    className="flex items-center gap-4 w-full text-left p-3 -mx-3 rounded-2xl hover:bg-red-50/50 group transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-sm border border-slate-100 flex items-center justify-center transition-all">
                                                        <Clock className="w-4 h-4 text-slate-400 group-hover:text-[#e21a22]" />
                                                    </div>
                                                    <span className="text-base text-slate-700 font-semibold group-hover:text-[#e21a22] transition-colors">{term}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Trending searches */}
                                <section>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trending searches</h3>
                                    <div className="space-y-1">
                                        {trendingSearches.map((item, idx) => (
                                            <Link
                                                key={`trending-${item.term}-${idx}`}
                                                href={item.url}
                                                className="block outline-none"
                                            >
                                                <motion.div
                                                    variants={itemVariants}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-4 w-full text-left p-3 -mx-3 rounded-2xl hover:bg-slate-50 group transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-[#291e6a]/5 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-[#291e6a]/10 flex items-center justify-center transition-all">
                                                        <TrendingUp className="w-4 h-4 text-[#291e6a]" />
                                                    </div>
                                                    <span className="text-base text-slate-700 font-semibold group-hover:text-[#1c144a] transition-colors flex-1">{item.term}</span>
                                                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {/* 2. Loading State */}
                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="divide-y divide-slate-50"
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="px-6 py-5 flex items-center gap-4 animate-pulse">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0"></div>
                                        <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* 3. Search Results */}
                        {!loading && searchQuery.length >= 2 && searchResults.length > 0 && (
                            <motion.div
                                key="results"
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                variants={containerVariants}
                                className="divide-y divide-slate-50 px-2"
                            >
                                {searchResults.map((car) => (
                                    <motion.div key={car.id} variants={itemVariants}>
                                        <Link
                                            href={`/${car.brandSlug}-cars/${car.modelSlug}`}
                                            onClick={() => addToRecent(`${car.brandName} ${car.name}`)}
                                            className="px-4 py-4 flex items-center gap-4 hover:bg-slate-50 rounded-2xl active:bg-slate-100 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-red-100 group-hover:bg-red-50 transition-all">
                                                <Search className="w-[18px] h-[18px] text-slate-400 group-hover:text-[#e21a22] transition-colors" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[17px] font-medium text-slate-800 truncate leading-snug">
                                                    {highlightText(`${car.brandName} ${car.name}`, searchQuery)}
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white group-hover:shadow-sm">
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#e21a22] transform group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* 4. No Results State */}
                        {!loading && searchQuery.length >= 2 && searchResults.length === 0 && (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-24 text-center px-6"
                            >
                                <div className="w-20 h-20 bg-red-50/80 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
                                    <Search className="h-10 w-10 text-[#e21a22] -rotate-12" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">No results for "{searchQuery}"</h3>
                                <p className="text-slate-500 text-base max-w-sm mx-auto font-medium">We couldn't find any cars matching your search. Try checking for typos or use fewer keywords.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
