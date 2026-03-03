'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useFavourites } from '@/lib/favourites-context'
import { OptimizedImage } from '@/components/common/OptimizedImage'

export interface Car {
    id: string
    name: string
    brand: string
    brandName: string
    image: string
    startingPrice: number
    lowestPriceFuelType?: string
    fuelTypes: string[]
    transmissions: string[]
    seating: number
    launchDate: string
    slug: string
    isNew: boolean
    isPopular: boolean
    rating?: number
    reviews?: number
    variants?: number
    variantName?: string
}

const fmtFuel = (f: string) => {
    const l = f.toLowerCase()
    if (l === 'cng') return 'CNG'
    if (l === 'electric') return 'Electric'
    if (l === 'diesel') return 'Diesel'
    return 'Petrol'
}

const fmtTrans = (t: string) => {
    const l = t.toLowerCase()
    if (l === 'automatic') return 'Automatic'
    return 'Manual'
}

export function BrandCarCard({ car, index = 0 }: { car: Car; index?: number }) {
    const { isFavourite, toggleFavourite } = useFavourites()
    const [mounted, setMounted] = useState(false)
    const isFav = mounted ? isFavourite(car.id) : false
    useEffect(() => { setMounted(true) }, [])

    const price = car.startingPrice
    const variantText = car.variantName || 'LXI'
    const emi = Math.round((price * 0.85 * 0.09) / 12 + (price * 0.85) / 60).toLocaleString('en-IN')
    const brandSlug = car.brandName?.toLowerCase().replace(/\s+/g, '-') || ''
    const modelSlug = car.name?.toLowerCase().replace(/\s+/g, '-') || ''
    const href = `/${brandSlug}-cars/${modelSlug}`
    const year = car.launchDate?.match(/\d{4}/)?.[0] || ''
    const fuel = fmtFuel((car.fuelTypes || ['Petrol'])[0])
    const trans = fmtTrans((car.transmissions || ['Manual'])[0])

    const whatsappUrl = `https://wa.me/919945210466?text=${encodeURIComponent(`I'd like to book a free test drive for: ${year} ${car.brandName} ${car.name}`)}`

    return (
        <Link
            href={href}
            className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(41,30,106,0.13)] hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full cursor-pointer"
        >
            {/* ── IMAGE ── */}
            <div className="relative h-[200px] sm:h-[230px] bg-gradient-to-br from-slate-50 to-slate-100/80 overflow-hidden flex-shrink-0">
                {/* Heart */}
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavourite(car) }}
                    aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${isFav ? 'bg-red-500' : 'bg-white/80 hover:bg-white border border-slate-200'
                        }`}
                >
                    <Heart className={`h-4 w-4 ${isFav ? 'text-white fill-current' : 'text-slate-400'}`} />
                </button>

                {/* Car image */}
                <div className="absolute inset-0 flex items-center justify-center p-4 group-hover:scale-[1.04] transition-transform duration-500 ease-out">
                    {car.image ? (
                        <OptimizedImage
                            src={car.image}
                            alt={`${car.brandName} ${car.name}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 700px"
                            className="object-contain drop-shadow-xl"
                            priority={index < 3}
                        />
                    ) : (
                        <div className="text-slate-400 text-sm font-semibold text-center">{car.brandName} {car.name}</div>
                    )}
                </div>
            </div>

            {/* ── DETAILS ── */}
            <div className="flex flex-col flex-1 px-4 sm:px-5 pt-4 pb-4 gap-3">

                {/* Name + Variant */}
                <div>
                    <h3 className="font-extrabold text-slate-900 text-[15px] sm:text-base leading-snug tracking-tight">
                        {year} {car.brandName} {car.name}
                    </h3>
                    <p className="text-[#291e6a] text-[12px] font-semibold mt-0.5 opacity-70">{variantText}</p>
                </div>

                {/* Price + EMI */}
                <div>
                    <p className="text-[#e21a22] font-black text-xl sm:text-2xl tracking-tight leading-none">
                        ₹ {(price / 100000).toFixed(2)} Lakh
                    </p>
                    <p className="text-slate-500 text-[11px] sm:text-xs font-semibold mt-1">
                        EMI <span className="text-slate-800 font-bold">₹{emi}/m</span>
                    </p>
                </div>

                {/* Inline dot-separated specs */}
                <p className="text-[12px] font-semibold text-slate-600 flex items-center gap-1.5 flex-wrap">
                    <span>70,000 km</span>
                    <span className="text-slate-300">•</span>
                    <span>{fuel}</span>
                    <span className="text-slate-300">•</span>
                    <span>{trans}</span>
                </p>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="h-[38px] sm:h-[42px] rounded-xl flex items-center justify-center text-[#291e6a] text-sm font-bold border border-[#291e6a]/20 hover:bg-[#291e6a]/5 transition-all duration-300"
                    >
                        Test Drive
                    </a>
                    <div
                        onClick={e => e.stopPropagation()}
                        className="h-[38px] sm:h-[42px] rounded-xl flex items-center justify-center text-white text-sm font-bold bg-[#291e6a] hover:bg-[#1c144a] transition-all duration-300"
                    >
                        View Details
                    </div>
                </div>
            </div>
        </Link>
    )
}
