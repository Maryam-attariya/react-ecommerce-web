import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'
import { categories } from '../data/products.js'

export default function Navbar() {
  const { count, wishlist } = useStore()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const location = useLocation()
  useEffect(() => { setQ(new URLSearchParams(location.search).get('q') || '') }, [location.search])
  const changeQuery = (e) => {
    const value = e.target.value
    setQ(value)
    if (!value.trim() && location.pathname === '/shop' && new URLSearchParams(location.search).has('q')) nav('/shop')
  }
  const search = (e) => { e.preventDefault(); nav(`/shop?q=${encodeURIComponent(q)}`); setOpen(false) }
  const icon = 'relative rounded-full p-2 hover:bg-stone-100'
  const badge = 'absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white'
  return (
    <>
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="wrap flex h-16 items-center gap-1.5 sm:gap-3">
        <button className={`${icon} shrink-0 md:hidden`} aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        <Link to="/" className="shrink-0 text-lg font-extrabold tracking-tight text-primary sm:text-xl">Shopwave</Link>
        <nav className="ml-6 hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink to="/shop" className="hover:text-primary">Shop</NavLink>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary">Categories <ChevronDown size={14} /></button>
            <div className="invisible absolute left-0 top-full w-44 rounded-xl bg-white p-2 opacity-0 shadow-xl ring-1 ring-stone-200 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {categories.map((c) => <Link key={c} to={`/shop?cat=${c}`} className="block rounded-lg px-3 py-2 hover:bg-primary-light">{c}</Link>)}
            </div>
          </div>
        </nav>
        <form onSubmit={search} className="mx-auto hidden max-w-md flex-1 md:block">
          <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input value={q} onChange={changeQuery} placeholder="Search products" aria-label="Search products" className="input rounded-full py-2 pl-10 pr-12" />
            <button type="submit" aria-label="Search" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-stone-500 hover:bg-primary-light hover:text-primary"><Search size={18} /></button></div>
        </form>
        <div className="ml-auto flex shrink-0 items-center md:ml-0">
          <Link to="/wishlist" className={`${icon} p-1.5 sm:p-2`} aria-label="Wishlist"><Heart size={20} />{wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}</Link>
          <Link to="/cart" className={`${icon} p-1.5 sm:p-2`} aria-label="Cart"><ShoppingBag size={20} />{count > 0 && <span className={badge}>{count}</span>}</Link>
          <Link to="/login" className={`${icon} p-1.5 sm:p-2`} aria-label="Account"><User size={20} /></Link>
        </div>
      </div>
    </header>
      {open && <div className="fixed inset-0 z-50 md:hidden">
        <button type="button" aria-label="Close menu" className="absolute inset-0 h-full w-full bg-black/40" onClick={() => setOpen(false)} />
        <aside className="rise absolute left-0 top-0 z-10 h-full w-72 max-w-[85vw] space-y-4 overflow-y-auto bg-white p-5 shadow-2xl">
          <button className={icon} aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
          <form onSubmit={search} className="flex gap-2"><input value={q} onChange={changeQuery} placeholder="Search products" aria-label="Search products" className="input min-w-0" /><button type="submit" aria-label="Search" className="btn-primary shrink-0 px-3"><Search size={18} /></button></form>
          <Link onClick={() => setOpen(false)} to="/shop" className="block py-2 font-semibold">All products</Link>
          {categories.map((c) => <Link key={c} onClick={() => setOpen(false)} to={`/shop?cat=${c}`} className="block py-2 text-stone-600">{c}</Link>)}
          <Link onClick={() => setOpen(false)} to="/login" className="btn-outline w-full">Login / Register</Link>
        </aside>
      </div>}
    </>
  )
}
