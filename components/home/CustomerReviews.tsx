'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import FadeInView from '@/components/animations/FadeInView'

const reviews = [
    {
        id: 1,
        name: "Rahul M.",
        role: "IT Professional, Bangalore",
        text: "The transparency is refreshing. They showed me the complete service history and the RC check before I even asked. Got a Creta that feels brand new.",
        rating: 5,
        carPurchased: "Hyundai Creta",
        date: "2 weeks ago"
    },
    {
        id: 2,
        name: "Priya S.",
        role: "Doctor, Delhi",
        text: "I was skeptical about buying a used car, but the Gadizone team made it seamless. The paperwork was handled 100% by them. Highly recommend for peace of mind.",
        rating: 5,
        carPurchased: "Honda City",
        date: "1 month ago"
    },
    {
        id: 3,
        name: "Amit T.",
        role: "Businessman, Mumbai",
        text: "Traded in my old Swift for an Innova Crysta. Got a great exchange value and the EMI processing took less than a day. Absolutely stellar service.",
        rating: 5,
        carPurchased: "Toyota Innova Crysta",
        date: "3 months ago"
    },
    {
        id: 4,
        name: "Sarah K.",
        role: "Designer, Pune",
        text: "The cars actually look exactly like they do in the photos. The test drive was brought directly to my home. That level of convenience is unmatched.",
        rating: 5,
        carPurchased: "Kia Seltos",
        date: "3 months ago"
    },
    {
        id: 5,
        name: "Vikram N.",
        role: "Architect, Hyderabad",
        text: "First time buying a pre-owned luxury car. Gadizone's multi-point inspection gave me the confidence to buy a 3-Series. It drives like a dream.",
        rating: 5,
        carPurchased: "BMW 3 Series",
        date: "4 months ago"
    }
]

export default function CustomerReviews() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
        }
    }

    useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 400 : 300
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ratingHover, setRatingHover] = useState(0)
    const [ratingSelect, setRatingSelect] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [reviewForm, setReviewForm] = useState({ name: '', text: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (ratingSelect === 0 || !reviewForm.name || !reviewForm.text) return

        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
            setTimeout(() => {
                setIsModalOpen(false)
                setIsSuccess(false)
                setRatingSelect(0)
                setReviewForm({ name: '', text: '' })
            }, 2000)
        }, 1200)
    }

    return (
        <div className="py-12 sm:py-20 relative overflow-hidden bg-white">
            <FadeInView distance={40} className="mb-10 sm:mb-16 text-center px-4">
                <h2 className="text-3xl sm:text-5xl font-black text-[#1c144a] mb-4 tracking-tight leading-tight">
                    Don't Just Take <br className="sm:hidden" />
                    <span className="text-[#e21a22]">Our Word For It.</span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg sm:text-xl font-medium">
                    Join thousands of happy customers who found their perfect car with Gadizone.
                </p>
            </FadeInView>

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-4 z-10 hidden sm:block">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`p-3 rounded-full bg-white shadow-xl border border-slate-100 transition-all duration-200 ${canScrollLeft ? 'text-[#1c144a] hover:scale-110 hover:shadow-2xl' : 'text-slate-300 opacity-50 cursor-not-allowed'}`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-4 z-10 hidden sm:block">
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`p-3 rounded-full bg-white shadow-xl border border-slate-100 transition-all duration-200 ${canScrollRight ? 'text-[#1c144a] hover:scale-110 hover:shadow-2xl' : 'text-slate-300 opacity-50 cursor-not-allowed'}`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex gap-4 sm:gap-6 pb-8 pt-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex-none w-[300px] sm:w-[380px] snap-center"
                        >
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60 h-full flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-red-50 transition-colors duration-300" />

                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? 'fill-[#e21a22] text-[#e21a22]' : 'fill-slate-200 text-slate-200'}`} />
                                    ))}
                                </div>

                                <p className="text-slate-700 text-base sm:text-lg mb-6 flex-grow font-medium leading-relaxed relative z-10">
                                    "{review.text}"
                                </p>

                                <div className="border-t border-slate-100 pt-5 mt-auto">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-[#1c144a] text-base sm:text-lg">{review.name}</h4>
                                            <p className="text-sm text-slate-500">{review.role}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-1 justify-end gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Verified Buyer
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">{review.carPurchased}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Write a Review CTA */}
                <FadeInView delay={0.3} className="mt-8 flex justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white border-2 border-slate-200 text-slate-700 hover:border-[#1c144a] hover:text-[#1c144a] font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                        <Star className="w-5 h-5 fill-none" />
                        Write a Review
                    </button>
                </FadeInView>
            </div>

            {/* Review Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 relative"
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="text-xl font-bold text-[#1c144a]">Share Your Experience</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-8 text-center"
                                >
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h4>
                                    <p className="text-slate-600">Your review has been submitted successfully and is pending approval.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Star Rating Selector */}
                                    <div className="flex flex-col items-center justify-center pt-2 pb-4">
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Overall Rating</p>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onMouseEnter={() => setRatingHover(star)}
                                                    onMouseLeave={() => setRatingHover(0)}
                                                    onClick={() => setRatingSelect(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                                >
                                                    <Star
                                                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${(ratingHover || ratingSelect) >= star ? 'fill-[#e21a22] text-[#e21a22]' : 'fill-slate-100 text-slate-200'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
                                            <input
                                                type="text"
                                                value={reviewForm.name}
                                                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                                placeholder="e.g. Rahul M."
                                                required
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e21a22]/20 focus:border-[#e21a22] focus:bg-white outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Review</label>
                                            <textarea
                                                value={reviewForm.text}
                                                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                                                placeholder="Tell us about your experience buying a car with Gadizone..."
                                                required
                                                rows={4}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e21a22]/20 focus:border-[#e21a22] focus:bg-white outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || ratingSelect === 0}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center ${isSubmitting || ratingSelect === 0
                                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                : 'bg-[#1c144a] text-white hover:bg-[#291e6a] shadow-lg shadow-[#1c144a]/20'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Submitting...
                                            </div>
                                        ) : (
                                            'Submit Review'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
