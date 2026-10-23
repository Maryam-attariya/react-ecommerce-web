import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { Badge, Img, Price, Rating } from '../components/ui.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { products } from '../data/products.js'
import NotFound from './NotFound.jsx'

export default function Product() {
  const { id } = useParams()
  const p = products.find((x) => x.id === +id)
  const { addToCart, toggleWish, wishlist } = useStore()
  const [img, setImg] = useState(0), [size, setSize] = useState('M'), [color, setColor] = useState('Black')
  const [qty, setQty] = useState(1), [tab, setTab] = useState('Description'), [pos, setPos] = useState('50% 50%')
  if (!p) return <NotFound />
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const chip = (on) => `min-w-12 rounded-xl border px-3 py-2 text-sm font-medium ${on ? 'border-primary bg-primary text-white' : 'border-stone-300 hover:border-primary'}`
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`) }
  const body = {
    Description: p.description,
    Reviews: `Rated ${p.rating}/5 from ${p.reviews} verified buyers. Most customers praise the quality and fit.`,
    Shipping: 'Free standard shipping over $100. Delivery in 3-5 business days. Easy 30-day returns.',
  }
  return (
    <div className="wrap py-8">
      <p className="mb-6 break-words text-sm text-stone-500"><Link to="/" className="hover:text-primary">Home</Link> / <Link to={`/shop?cat=${p.category}`} className="hover:text-primary">{p.category}</Link> / {p.name}</p>
      <div className="grid min-w-0 gap-6 sm:gap-10 md:grid-cols-2">
        <div>
          <div onMouseMove={move} className="group aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-stone-100">
            <Img src={p.images[img]} alt={p.name} style={{ transformOrigin: pos }} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-150" /></div>
          <div className="mt-3 grid grid-cols-3 gap-3">{p.images.map((s, i) => <button key={i} aria-label={`View image ${i + 1}`} onClick={() => setImg(i)} className={`overflow-hidden rounded-xl ring-2 ${i === img ? 'ring-primary' : 'ring-transparent'}`}><Img src={s} alt={`${p.name} ${i + 1}`} className="aspect-square w-full object-cover" /></button>)}</div>
        </div>
        <div className="space-y-5">
          <div className="flex gap-2">{p.discountPrice < p.price && <Badge className="bg-accent text-white">Sale</Badge>}<Badge className={p.stock ? 'bg-primary-light text-primary' : 'bg-red-100 text-red-700'}>{p.stock ? `In stock (${p.stock})` : 'Out of stock'}</Badge></div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{p.name}</h1><Rating value={p.rating} count={p.reviews} /><Price p={p} big />
          <div><p className="mb-2 font-semibold">Size</p><div className="flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={chip(size === s)}>{s}</button>)}</div></div>
          <div><p className="mb-2 font-semibold">Color</p><div className="flex flex-wrap gap-2">{p.colors.map((c) => <button key={c} onClick={() => setColor(c)} className={chip(color === c)}>{c}</button>)}</div></div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:flex sm:gap-3">
            <div className="flex items-center rounded-xl border border-stone-300"><button aria-label="Decrease quantity" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><span className="w-8 text-center font-semibold">{qty}</span><button aria-label="Increase quantity" className="p-3" onClick={() => setQty(Math.min(p.stock || 1, qty + 1))}><Plus size={16} /></button></div>
            <button disabled={!p.stock} onClick={() => addToCart(p, qty, size, color)} className="btn-primary min-w-0 px-3 sm:flex-1 sm:px-5"><ShoppingBag size={18} className="shrink-0" /><span className="truncate">Add to cart</span></button>
            <button aria-label="Toggle wishlist" onClick={() => toggleWish(p.id)} className="btn-outline px-3 sm:px-4"><Heart size={18} className={wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : ''} /></button>
          </div>
          <div><div role="tablist" className="flex gap-6 border-b border-stone-200">{Object.keys(body).map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-2 font-semibold ${tab === t ? 'border-primary text-primary' : 'border-transparent text-stone-500'}`}>{t}</button>)}</div>
            <p className="pt-4 text-stone-600">{body[tab]}</p></div>
        </div>
      </div>
      <h2 className="mb-6 mt-16 text-2xl font-extrabold">You may also like</h2>
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
    </div>
  )
}
