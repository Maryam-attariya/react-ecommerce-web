import { Star } from 'lucide-react'
export const Rating = ({ value, count }) => (
  <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className={i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />)}
    {count != null && <span className="ml-1 text-xs text-stone-500">({count})</span>}
  </div>
)
export const Badge = ({ children, className = '' }) => <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${className}`}>{children}</span>
export const Price = ({ p, big }) => (
  <div className="flex items-baseline gap-2">
    <span className={`font-extrabold ${big ? 'text-3xl' : 'text-lg'}`}>${p.discountPrice}</span>
    {p.discountPrice < p.price && <span className="text-sm text-stone-400 line-through">${p.price}</span>}
  </div>
)
export const Img = ({ src, alt, ...r }) => (
  <img src={src} alt={alt} loading="lazy" {...r}
    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(alt)}/700/700` }} />
)
export const Skeleton = () => <div className="animate-pulse overflow-hidden rounded-2xl bg-white"><div className="aspect-square bg-stone-200" /><div className="space-y-2 p-4"><div className="h-4 w-3/4 rounded bg-stone-200" /><div className="h-4 w-1/3 rounded bg-stone-200" /></div></div>
