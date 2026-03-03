'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Car, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react'

const allFaqs = [
    {
        category: "Buying Guide",
        icon: <Car className="w-5 h-5" />,
        items: [
            {
                question: "Is buying a used car actually worth it?",
                answer: "Absolutely! Think of it as a smart shortcut to a premium lifestyle. You can drive a high-end luxury car for the price of a basic new one, all while skipping the steep 'first-year' depreciation that hurts new car owners the most."
            },
            {
                question: "How do I know I'm not buying someone else's trouble?",
                answer: "Peace of mind is everything. We deep-dive into the car's past for you—checking every service record and verify legal status on the Parivahan portal. At Gadizone, we only pick cars we'd be proud to drive ourselves."
            },
            {
                question: "What's the 'paperwork' headache truly like?",
                answer: "We keep it simple. All you really need are the basics (RC, Insurance, Service History). We handle the complex RTO transfers (Form 29/30) so you can focus on the excitement of your new drive, not the legal fine print."
            },
            {
                question: "How do you ensure the car hasn't been in a major accident?",
                answer: "Every car in our collection undergoes a structural integrity check. We look for signs of chassis damage, repainting, and panel misalignment to ensure you get a car that is safe and genuine."
            }
        ]
    },
    {
        category: "The Assad Promise",
        icon: <ShieldCheck className="w-5 h-5" />,
        items: [
            {
                question: "Why should I pick Gadizone over a local dealer?",
                answer: "Because we treat every car like it's going to our own family. Every single vehicle undergoes a rigorous multi-point health check. We don't just sell cars; we curate a collection of the finest pre-owned machines in India."
            },
            {
                question: "What happens after I drive away?",
                answer: "Our relationship doesn't end at the showroom door. We offer comprehensive warranty packages and ongoing support. If you ever have a question or a concern, we're just a phone call away. You're part of the Assad family now."
            },
            {
                question: "Do you offer financing options for used cars?",
                answer: "Yes, we have tie-ups with leading banks and NBFCs to provide competitive interest rates and flexible EMIs, making your dream car purchase smooth and affordable."
            },
            {
                question: "Can I trade in my current car when buying one from Gadizone?",
                answer: "Absolutely! We offer the best exchange values in the market. You can bring your current car for a quick valuation and use that as a down payment for your next luxury upgrade."
            }
        ]
    }
]

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            layout
            className="group bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60 overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 sm:py-6 px-5 sm:px-8 flex items-center gap-4 text-left transition-colors duration-200"
            >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#291e6a] text-white shadow-md' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'}`}>
                    <HelpCircle className="w-5 h-5" />
                </div>
                <span className={`flex-grow text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${isOpen ? 'text-[#1c144a]' : 'text-slate-700 group-hover:text-[#291e6a]'}`}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-colors duration-200 ${isOpen ? 'bg-slate-50 border-transparent shadow-sm' : 'bg-transparent text-slate-400'}`}
                >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#291e6a]' : ''}`} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 sm:pb-8 px-5 sm:px-8 pl-14 sm:pl-[5.25rem] pr-6 sm:pr-12 border-t border-slate-50 mt-2">
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function HomeFAQ() {
    return (
        <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
            {/* Humanized Header */}
            <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#e21a22] text-xs sm:text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Your Car Journey, Simplified</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1c144a] mb-6 tracking-tight leading-[1.1]">
                    Everything You Need <br />
                    <span className="text-[#e21a22]">To Know.</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-lg sm:text-xl leading-relaxed font-medium">
                    Buying a car is a big decision. We're here to make it as transparent and human as possible.
                </p>
            </div>

            {/* Combined Single Column FAQ List */}
            <div className="space-y-12">
                {allFaqs.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-6">
                        <div className="flex items-center gap-3 px-2 mb-2">
                            <div className="p-2 bg-[#291e6a]/5 rounded-lg text-[#291e6a]">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-extrabold text-[#1c144a] uppercase tracking-widest">{category.category}</h3>
                        </div>

                        <div className="space-y-4">
                            {category.items.map((item, index) => (
                                <FaqItem key={index} index={index} {...item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            {/* Mobile friendly note */}
            <p className="text-center mt-12 text-gray-400 text-sm font-medium">
                Prefer a direct call? <a href="tel:+919945210466" className="text-[#1c144a] underline">+91 99452 10466</a>
            </p>
        </div>
    )
}

