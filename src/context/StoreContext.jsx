import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '../data/products.js'

const Ctx = createContext()
export const useStore = () => useContext(Ctx)
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = load('sw_cart', [])
    if (!Array.isArray(saved)) return []
    return saved.flatMap((item) => {
      const qty = Number(item?.qty)
      const product = products.find((candidate) => candidate.id === Number(item?.id))
      return product && Number.isFinite(qty) && qty > 0
        ? [{ ...item, id: product.id, qty }]
        : []
    })
  })
  const [wishlist, setWishlist] = useState(() => {
    const saved = load('sw_wish', [])
    return Array.isArray(saved)
      ? saved.map(Number).filter((id) => products.some((product) => product.id === id))
      : []
  })
  const [user, setUser] = useState(() => load('sw_user', null))
  const [toast, setToast] = useState(null)
  useEffect(() => {
    localStorage.setItem('sw_cart', JSON.stringify(cart))
  }, [cart])
  useEffect(() => {
    localStorage.setItem('sw_wish', JSON.stringify(wishlist))
  }, [wishlist])
  useEffect(() => {
    localStorage.setItem('sw_user', JSON.stringify(user))
  }, [user])

  const notify = (m) => { setToast(m); setTimeout(() => setToast(null), 2000) }
  const addToCart = (p, qty = 1, size, color) => {
    const key = `${p.id}-${size}-${color}`
    setCart((c) => c.find((i) => i.key === key)
      ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      : [...c, { key, id: p.id, qty, size, color }])
    notify('Added to cart')
  }
  const setQty = (key, q) => setCart((c) => (q < 1 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty: q } : i))))
  const toggleWish = (id) => {
    const exists = wishlist.includes(id)
    notify(exists ? 'Removed from wishlist' : 'Saved to wishlist')
    setWishlist((current) => (current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id]))
  }
  const items = cart.flatMap((i) => {
    const product = products.find((x) => x.id === Number(i.id))
    return product ? [{ ...i, p: product }] : []
  })
  const subtotal = items.reduce((s, i) => s + i.p.discountPrice * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <Ctx.Provider value={{ items, count, subtotal, addToCart, setQty, clearCart: () => setCart([]), wishlist, toggleWish, user, setUser, notify }}>
      {children}
      <div aria-live="polite" className={`fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg transition ${toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>{toast}</div>
    </Ctx.Provider>
  )
}
