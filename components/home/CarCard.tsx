'use client'

import React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useFavourites } from '@/lib/favourites-context'
import { OptimizedImage } from '@/components/common/OptimizedImage'

interface Car {
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
  variantName?: string
}

interface CarCardProps {
  car: Car
  index?: number
  onClick?: () => void
}

const fmtFuel = (f: string) => {
  const l = f.toLowerCase()
  if (l === 'cng') return 'CNG'
  if (l === 'electric') return 'Electric'
  if (l === 'diesel') return 'Diesel'
  return 'Petrol'
}

const fmtTrans = (t: string) =>
  t.toLowerCase() === 'automatic' ? 'Auto' : 'Manual'

export default function CarCard({ car, index, onClick }: CarCardProps) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const [mounted, setMounted] = React.useState(false)
  const isFav = mounted ? isFavourite(car.id) : false
  React.useEffect(() => { setMounted(true) }, [])

  const price = car.startingPrice
  const variantText = car.variantName || 'LXI'
  const emi = Math.round((price * 0.85 * 0.09) / 12 + (price * 0.85) / 60).toLocaleString('en-IN')
  const brandSlug = car.brandName?.toLowerCase().replace(/\s+/g, '-') || ''
  const modelSlug = car.name?.toLowerCase().replace(/\s+/g, '-') || car.slug || ''
  const carHref = `/${brandSlug}-cars/${modelSlug}`
  const year = car.launchDate?.match(/\d{4}/)?.[0] || ''
  const fuel = fmtFuel((car.fuelTypes || ['Petrol'])[0])
  const trans = fmtTrans((car.transmissions || ['Manual'])[0])

  return (
    <Link
      href={carHref}
      onClick={onClick}
      className="flex flex-col flex-shrink-0 w-[220px] sm:w-[248px] bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(41,30,106,0.12)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-[148px] sm:h-[160px] bg-gradient-to-b from-slate-50 to-slate-100/60 flex-shrink-0 overflow-hidden">
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavourite(car) }}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${isFav ? 'bg-red-500' : 'bg-white/70 hover:bg-white border border-white/40'
            }`}
        >
          <Heart className={`h-3 w-3 ${isFav ? 'text-white fill-current' : 'text-slate-500'}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center p-3 group-hover:scale-[1.05] transition-transform duration-500 ease-out">
          {car.image ? (
            <OptimizedImage
              src={car.image}
              alt={`${car.brandName} ${car.name}`}
              fill
              sizes="(max-width: 640px) 220px, 248px"
              className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              priority={index !== undefined ? index < 2 : (car.isPopular || car.isNew)}
            />
          ) : (
            <div className="text-slate-300 text-xs font-semibold text-center">{car.brandName}</div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-3.5 pt-3 pb-3.5 gap-1.5">
        {/* Name + Variant */}
        <div>
          <h3
            className="font-extrabold text-slate-900 text-[13px] sm:text-[14px] leading-snug tracking-tight truncate"
            title={`${year} ${car.brandName} ${car.name}`}
          >
            {year && <span className="mr-0.5">{year}</span>}{car.brandName} {car.name}
          </h3>
          <p className="text-slate-400 text-[11px] font-semibold">{variantText}</p>
        </div>

        {/* Price + EMI */}
        <div>
          <p className="text-[#e21a22] font-black text-[17px] sm:text-[18px] leading-tight tracking-tight">
            ₹{(price / 100000).toFixed(2)} lakh
          </p>
          <p className="text-slate-500 text-[10px] font-semibold">
            EMI <span className="text-slate-800 font-bold">₹{emi}/m</span>
          </p>
        </div>

        {/* Inline specs */}
        <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
          <span>70,000 km</span>
          <span className="text-slate-300">•</span>
          <span>{fuel}</span>
          <span className="text-slate-300">•</span>
          <span>{trans}</span>
        </p>

        {/* Button */}
        <button className="w-full h-[36px] shrink-0 mt-1 rounded-xl border border-[#291e6a]/20 text-[#291e6a] font-bold text-[12px] sm:text-[13px] group-hover:bg-[#1c144a] group-hover:border-[#1c144a] group-hover:text-white transition-all duration-300">
          View Details
        </button>
      </div>
    </Link>
  )
}
