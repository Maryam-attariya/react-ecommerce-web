import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { Img, Rating } from '../components/ui.jsx'
import { categories, products } from '../data/products.js'

const slides = [
  { t: 'Fresh looks for the new season', s: 'Up to 30% off fashion and footwear', id: '1529139574466-a303027c1d8b', to: '/shop?cat=Fashion' },
  { t: 'Sound that moves with you', s: 'Headphones, watches and more tech', id: '1505740420928-5e560c06d30e', to: '/shop?cat=Electronics' },
  { t: 'Make your home feel finished', s: 'Chairs, sofas and decor under one roof', id: '1555041469-a586c61ea9bc', to: '/shop?cat=Home' },
]
const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=70`

function useCountdown() {
  const end = useRef(Date.now() + 3 * 864e5)
  const [t, setT] = useState(end.current - Date.now())
  useEffect(() => { const i = setInterval(() => setT(end.current - Date.now()), 1000); return () => clearInterval(i) }, [])
  const d = Math.max(0, t)
  return [['Days', Math.floor(d / 864e5)], ['Hours', Math.floor(d / 36e5) % 24], ['Mins', Math.floor(d / 6e4) % 60], ['Secs', Math.floor(d / 1e3) % 60]]
}

export default function Home() {
  const [i, setI] = useState(0)
  const [email, setEmail] = useState('')
  const timer = useCountdown()
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000); return () => clearInterval(t) }, [])
  const s = slides[i]
  const catImg = (c) => products.find((p) => p.category === c).images[0]
  return (
    <>
      <section className="relative h-[62vh] min-h-[360px] overflow-hidden bg-ink sm:h-[70vh] sm:min-h-[420px]">
        <Img key={i} src={u(s.id)} alt={s.t} className="rise absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="wrap relative flex h-full flex-col justify-center text-white">
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{s.t}</h1>
          <p className="mt-4 max-w-md text-base text-stone-200 sm:text-lg">{s.s}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to={s.to} className="btn bg-accent text-white hover:brightness-110">Shop now</Link><Link to="/shop" className="btn border border-white/60 hover:bg-white/10">Browse all</Link></div>
          <div className="absolute bottom-6 flex gap-2">{slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />)}</div>
        </div>
      </section>

      <section className="wrap grid gap-4 py-8 sm:grid-cols-3">
        {[[Truck, 'Free shipping', 'On orders over $100'], [RotateCcw, '30-day returns', 'No questions asked'], [ShieldCheck, 'Secure checkout', 'Your data stays private']].map(([I, a, b]) => (
          <div key={a} className="flex items-center gap-3"><span className="rounded-full bg-primary-light p-3 text-primary"><I size={22} /></span><div><p className="font-semibold">{a}</p><p className="text-sm text-stone-500">{b}</p></div></div>))}
      </section>

      <section className="wrap py-8">
        <h2 className="mb-6 text-2xl font-extrabold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c} to={`/shop?cat=${c}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Img src={catImg(c)} alt={c} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><span className="absolute bottom-4 left-4 text-lg font-bold text-white">{c}</span>
            </Link>))}
        </div>
      </section>

      {[['New arrivals', products.filter((p) => p.isNew).slice(0, 4)], ['Best sellers', [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)]].map(([title, list]) => (
        <section key={title} className="wrap py-8">
          <div className="mb-6 flex items-end justify-between"><h2 className="text-2xl font-extrabold">{title}</h2><Link to="/shop" className="text-sm font-semibold text-primary hover:underline">View all</Link></div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </section>))}

      <section className="wrap py-8"><div className="rounded-3xl bg-primary p-8 text-center text-white sm:p-12">
        <h2 className="text-3xl font-extrabold">Weekend sale ends soon</h2><p className="mt-2 text-primary-light">Extra savings on selected items</p>
        <div className="mt-6 flex justify-center gap-3">{timer.map(([l, v]) => <div key={l} className="w-16 rounded-xl bg-white/10 py-3 sm:w-20"><p className="text-2xl font-extrabold sm:text-3xl">{String(v).padStart(2, '0')}</p><p className="text-xs">{l}</p></div>)}</div>
        <Link to="/shop" className="btn mt-8 bg-accent text-white">Grab the deals</Link></div></section>

      <section className="wrap py-8">
        <h2 className="mb-6 text-2xl font-extrabold">What customers say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[['Ayesha K.', 'Delivery was quick and the jacket fits perfectly.'], ['Hamza R.', 'Great prices and the headphones sound amazing.'], ['Sara M.', 'Easy returns made me confident to order again.']].map(([n, t]) => (
            <figure key={n} className="rounded-2xl bg-white p-6 ring-1 ring-stone-200"><Rating value={5} /><blockquote className="mt-3 text-stone-600">{t}</blockquote><figcaption className="mt-4 font-semibold">{n}</figcaption></figure>))}
        </div>
      </section>

      <section className="wrap py-8"><div className="flex flex-wrap items-center justify-center gap-8 text-xl font-extrabold text-stone-300">{['NORDEX', 'Lumio', 'Kestrel', 'Atlas&Co', 'Veloce'].map((b) => <span key={b}>{b}</span>)}</div></section>

      <section className="wrap py-8"><div className="rounded-3xl bg-white p-8 text-center ring-1 ring-stone-200 sm:p-12">
        <h2 className="text-2xl font-extrabold">Get 10% off your first order</h2><p className="mt-2 text-stone-500">Join our newsletter for new arrivals and offers.</p>
        <form onSubmit={(e) => { e.preventDefault(); setEmail('') }} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" className="input" /><button className="btn-primary">Subscribe</button></form></div></section>
    </>
  )
}
