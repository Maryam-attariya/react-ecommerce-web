import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { Skeleton, Rating } from '../components/ui.jsx'
import { categories, colorsList, products, sizesList } from '../data/products.js'

export default function Shop() {
  const [sp, setSp] = useSearchParams()
  const q = (sp.get('q') || '').trim(), cat = sp.get('cat') || ''
  const [maxPrice, setMax] = useState(1200), [minRating, setRate] = useState(0)
  const [color, setColor] = useState(''), [size, setSize] = useState('')
  const [sort, setSort] = useState('popular'), [shown, setShown] = useState(8)
  const [drawer, setDrawer] = useState(false), [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setMax(1200); setRate(0); setColor(''); setSize('')
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [q, cat])

  const list = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    let l = products.filter((p) => {
      const searchable = `${p.name} ${p.category} ${p.description}`.toLowerCase()
      return (!cat || p.category === cat) && p.discountPrice <= maxPrice && p.rating >= minRating
        && terms.every((term) => searchable.includes(term)) && (!color || p.colors.includes(color)) && (!size || p.sizes.includes(size))
    })
    const s = { low: (a, b) => a.discountPrice - b.discountPrice, high: (a, b) => b.discountPrice - a.discountPrice, new: (a, b) => b.id - a.id, popular: (a, b) => b.reviews - a.reviews }
    return l.sort(s[sort])
  }, [q, cat, maxPrice, minRating, color, size, sort])

  const chip = (on) => `rounded-full border px-3 py-1 text-sm transition ${on ? 'border-primary bg-primary text-white' : 'border-stone-300 hover:border-primary'}`
  const setCat = (c) => setSp(c ? { cat: c } : {})
  const Filters = (
    <div className="space-y-6">
      <div><p className="mb-2 font-semibold">Category</p><div className="flex flex-wrap gap-2"><button className={chip(!cat)} onClick={() => setCat('')}>All</button>{categories.map((c) => <button key={c} className={chip(cat === c)} onClick={() => setCat(c)}>{c}</button>)}</div></div>
      <div><p className="mb-2 font-semibold">Max price: ${maxPrice}</p><input type="range" min="20" max="1200" step="10" value={maxPrice} onChange={(e) => setMax(+e.target.value)} className="w-full accent-primary" aria-label="Maximum price" /></div>
      <div><p className="mb-2 font-semibold">Rating</p>{[4, 3, 0].map((r) => <button key={r} onClick={() => setRate(r)} className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-1 ${minRating === r ? 'bg-primary-light' : ''}`}>{r ? <><Rating value={r} /> & up</> : 'Any rating'}</button>)}</div>
      <div><p className="mb-2 font-semibold">Color</p><div className="flex flex-wrap gap-2">{colorsList.map((c) => <button key={c} className={chip(color === c)} onClick={() => setColor(color === c ? '' : c)}>{c}</button>)}</div></div>
      <div><p className="mb-2 font-semibold">Size</p><div className="flex flex-wrap gap-2">{sizesList.map((c) => <button key={c} className={chip(size === c)} onClick={() => setSize(size === c ? '' : c)}>{c}</button>)}</div></div>
    </div>
  )
  return (
    <div className="wrap py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">{q ? `Results for "${q}"` : cat || 'All products'} <span className="text-base font-medium text-stone-500">({list.length})</span></h1>
        <div className="flex gap-2">
          <button className="btn-outline py-2 lg:hidden" onClick={() => setDrawer(true)}><SlidersHorizontal size={16} /> Filters</button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="input w-auto py-2">
            <option value="popular">Most popular</option><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3">
            {loading ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} />) : list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          {!loading && !list.length && <p className="py-20 text-center text-stone-500">No products match your filters. Try widening the price or clearing a filter.</p>}
          {!loading && shown < list.length && <div className="mt-8 text-center"><button className="btn-outline" onClick={() => setShown(shown + 8)}>Load more</button></div>}
        </div>
      </div>
      {drawer && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
        <aside className="rise absolute right-0 top-0 h-full w-80 max-w-full overflow-y-auto bg-white p-5">
          <div className="mb-4 flex items-center justify-between"><p className="text-lg font-bold">Filters</p><button aria-label="Close filters" onClick={() => setDrawer(false)}><X /></button></div>
          {Filters}<button className="btn-primary mt-6 w-full" onClick={() => setDrawer(false)}>Show {list.length} items</button></aside></div>}
    </div>
  )
}
