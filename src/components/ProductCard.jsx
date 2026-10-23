import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'
import { Badge, Img, Price, Rating } from './ui.jsx'

export default function ProductCard({ p }) {
  const { addToCart, toggleWish, wishlist } = useStore()
  const liked = wishlist.includes(p.id)
  const off = Math.round((1 - p.discountPrice / p.price) * 100)
  return (
    <article className="rise group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/70 transition hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Link to={`/product/${p.id}`}><Img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {off > 0 && <Badge className="bg-accent text-white">-{off}%</Badge>}
          {!p.stock && <Badge className="bg-ink text-white">Sold out</Badge>}
        </div>
        <button aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWish(p.id)} className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:scale-110">
          <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : ''} />
        </button>
        <button disabled={!p.stock} onClick={() => addToCart(p, 1, p.sizes[0], p.colors[0])} className="btn-primary absolute inset-x-2 bottom-2 min-w-0 gap-1 px-2 py-2 text-xs sm:inset-x-3 sm:bottom-3 sm:gap-2 sm:px-5 sm:text-sm md:translate-y-16 md:group-hover:translate-y-0">
          <ShoppingBag size={14} className="shrink-0 sm:h-4 sm:w-4" /> <span className="truncate">Add to cart</span>
        </button>
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs text-stone-500">{p.category}</p>
        <Link to={`/product/${p.id}`} className="line-clamp-1 font-semibold hover:text-primary">{p.name}</Link>
        <Rating value={p.rating} count={p.reviews} />
        <Price p={p} />
      </div>
    </article>
  )
}
