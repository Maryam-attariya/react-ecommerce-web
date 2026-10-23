import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Summary } from './Cart.jsx'
import { useStore } from '../context/StoreContext.jsx'

const fields = [['name', 'Full name'], ['email', 'Email'], ['phone', 'Phone'], ['address', 'Address'], ['city', 'City'], ['zip', 'Postal code']]

export default function Checkout() {
  const { items, clearCart } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState({}), [err, setErr] = useState({}), [pay, setPay] = useState('cod')
  if (!items.length) return <Navigate to="/cart" />
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    fields.forEach(([k, l]) => { if (!f[k]?.trim()) er[k] = `${l} is required` })
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email'
    if (pay === 'card') { if (!/^\d{16}$/.test((f.card || '').replace(/\s/g, ''))) er.card = 'Enter a 16-digit card number'; if (!f.exp) er.exp = 'Required'; if (!/^\d{3,4}$/.test(f.cvv || '')) er.cvv = 'Invalid CVV' }
    setErr(er)
    if (!Object.keys(er).length) { clearCart(); nav('/success') }
  }
  const input = (k, l, extra = {}) => (
    <label key={k} className="block text-sm font-medium">{l}
      <input value={f[k] || ''} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} className={`input mt-1 ${err[k] ? 'border-red-500' : ''}`} {...extra} />
      {err[k] && <span className="text-xs text-red-600">{err[k]}</span>}</label>)
  return (
    <form onSubmit={submit} noValidate className="wrap grid gap-8 py-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold">Checkout</h1>
        <section className="grid gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200 sm:grid-cols-2 sm:p-6"><h2 className="font-bold sm:col-span-2">Shipping details</h2>{fields.map(([k, l]) => input(k, l, { type: k === 'email' ? 'email' : 'text' }))}</section>
        <section className="space-y-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200 sm:p-6"><h2 className="font-bold">Payment method</h2>
          {[['cod', 'Cash on delivery'], ['card', 'Credit / debit card']].map(([v, l]) => <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${pay === v ? 'border-primary bg-primary-light' : 'border-stone-300'}`}><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v)} className="accent-primary" />{l}</label>)}
          {pay === 'card' && <div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2">{input('card', 'Card number', { inputMode: 'numeric', placeholder: '1234 5678 9012 3456' })}</div>{input('exp', 'Expiry', { placeholder: 'MM/YY' })}{input('cvv', 'CVV', { inputMode: 'numeric' })}</div>}
        </section>
      </div>
      <Summary><button className="btn-primary w-full">Place order</button></Summary>
    </form>
  )
}

export function Success() {
  return (
    <div className="wrap py-24 text-center"><CheckCircle2 size={64} className="mx-auto text-primary" />
      <h1 className="mt-4 text-3xl font-extrabold">Order placed</h1><p className="mt-2 text-stone-500">Thank you. A confirmation will be sent to your email shortly.</p>
      <Link to="/shop" className="btn-primary mt-6">Keep shopping</Link></div>)
}
