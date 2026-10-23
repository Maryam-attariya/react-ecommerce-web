import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react'
import { categories } from '../data/products.js'

export default function Footer() {
  const h = 'mb-3 font-semibold text-white'
  return (
    <footer className="mt-20 bg-ink text-stone-300">
      <div className="wrap grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><p className="mb-3 text-xl font-extrabold text-white">Shopwave</p><p className="text-sm">Quality everyday essentials, delivered fast.</p>
          <div className="mt-4 flex gap-3">{[Facebook, Instagram, Twitter].map((I, i) => <a key={i} href="#" aria-label="Social link" className="rounded-full bg-white/10 p-2 hover:bg-primary"><I size={18} /></a>)}</div></div>
        <div><p className={h}>Shop</p><ul className="space-y-2 text-sm">{categories.map((c) => <li key={c}><Link to={`/shop?cat=${c}`} className="hover:text-white">{c}</Link></li>)}</ul></div>
        <div><p className={h}>Help</p><ul className="space-y-2 text-sm"><li>Shipping and returns</li><li>Track your order</li><li>Contact us</li><li>FAQ</li></ul></div>
        <div><p className={h}>We accept</p><div className="flex gap-2 text-xs">{['Visa', 'Mastercard', 'COD'].map((c) => <span key={c} className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1"><CreditCard size={14} />{c}</span>)}</div></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© 2026 Shopwave. All rights reserved.</p>
    </footer>
  )
}
