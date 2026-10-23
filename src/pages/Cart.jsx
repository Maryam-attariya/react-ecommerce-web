import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Img } from '../components/ui.jsx'
import { useStore } from '../context/StoreContext.jsx'

export const useTotals = () => {
  const { subtotal } = useStore()
  const shipping = subtotal === 0 || subtotal > 100 ? 0 : 8
  return { shipping, tax: +(subtotal * 0.08).toFixed(2) }
}

export function Summary({ discount = 0, children }) {
  const { subtotal } = useStore()
  const { shipping, tax } = useTotals()
  const row = (a, b) => <div className="flex justify-between"><span className="text-stone-500">{a}</span><span>{b}</span></div>
  return (
    <aside className="h-fit space-y-3 rounded-2xl bg-white p-4 ring-1 ring-stone-200 sm:p-6">
      <h2 className="text-lg font-bold">Order summary</h2>
      {row('Subtotal', `$${subtotal.toFixed(2)}`)}{discount > 0 && row('Coupon (10%)', `-$${discount.toFixed(2)}`)}
      {row('Shipping', shipping ? `$${shipping}` : 'Free')}{row('Tax (8%)', `$${tax}`)}
      <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-extrabold"><span>Total</span><span>${(subtotal - discount + shipping + tax).toFixed(2)}</span></div>
      {children}
    </aside>
  )
}

export default function Cart() {
  const { items, setQty, subtotal, notify } = useStore()
  const [code, setCode] = useState(''), [off, setOff] = useState(0)
  if (!items.length) return (
    <div className="wrap py-24 text-center"><h1 className="text-2xl font-extrabold">Your cart is empty</h1><p className="mt-2 text-stone-500">Add something you like and it will show up here.</p><Link to="/shop" className="btn-primary mt-6">Continue shopping</Link></div>)
  const apply = () => code.toUpperCase() === 'SAVE10' ? (setOff(subtotal * 0.1), notify('Coupon applied')) : notify('Invalid code. Try SAVE10')
  return (
    <div className="wrap py-8">
      <h1 className="mb-6 text-2xl font-extrabold">Shopping cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">{items.map((i) => (
          <li key={i.key} className="flex min-w-0 gap-3 rounded-2xl bg-white p-3 ring-1 ring-stone-200 sm:gap-4 sm:p-4">
            <Img src={i.p.images[0]} alt={i.p.name} className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between gap-2"><div><Link to={`/product/${i.p.id}`} className="font-semibold hover:text-primary">{i.p.name}</Link><p className="text-sm text-stone-500">{i.size} / {i.color}</p></div><button aria-label="Remove item" onClick={() => setQty(i.key, 0)} className="text-stone-400 hover:text-red-500"><Trash2 size={18} /></button></div>
              <div className="flex items-center justify-between"><div className="flex items-center rounded-lg border border-stone-300"><button aria-label="Decrease" className="p-2" onClick={() => setQty(i.key, i.qty - 1)}><Minus size={14} /></button><span className="w-7 text-center text-sm">{i.qty}</span><button aria-label="Increase" className="p-2" onClick={() => setQty(i.key, i.qty + 1)}><Plus size={14} /></button></div><p className="font-bold">${(i.p.discountPrice * i.qty).toFixed(2)}</p></div>
            </div></li>))}</ul>
        <Summary discount={off}>
          <div className="flex gap-2"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" className="input py-2" /><button onClick={apply} className="btn-outline py-2">Apply</button></div>
          <Link to="/checkout" className="btn-primary w-full">Proceed to checkout</Link>
        </Summary>
      </div>
    </div>
  )
}
