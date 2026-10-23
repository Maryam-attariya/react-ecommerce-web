import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'

export default function Auth({ mode }) {
  const reg = mode === 'register'
  const { setUser, notify } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '' }), [err, setErr] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (reg && f.name.trim().length < 2) er.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email'
    if (f.password.length < 6) er.password = 'Use at least 6 characters'
    setErr(er)
    if (!Object.keys(er).length) { setUser({ name: f.name || f.email.split('@')[0], email: f.email }); notify(reg ? 'Account created' : 'Welcome back'); nav('/') }
  }
  const field = (k, l, type = 'text') => (
    <label className="block text-sm font-medium">{l}
      <input type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} className={`input mt-1 ${err[k] ? 'border-red-500' : ''}`} />
      {err[k] && <span className="text-xs text-red-600">{err[k]}</span>}</label>)
  return (
    <div className="wrap flex justify-center py-10 sm:py-16"><form onSubmit={submit} noValidate className="w-full max-w-md space-y-4 rounded-2xl bg-white p-5 ring-1 ring-stone-200 sm:p-8">
      <h1 className="text-2xl font-extrabold">{reg ? 'Create your account' : 'Log in'}</h1>
      {reg && field('name', 'Full name')}{field('email', 'Email', 'email')}{field('password', 'Password', 'password')}
      <button className="btn-primary w-full">{reg ? 'Create account' : 'Log in'}</button>
      <p className="text-center text-sm text-stone-500">{reg ? 'Already have an account?' : 'New here?'} <Link className="font-semibold text-primary" to={reg ? '/login' : '/register'}>{reg ? 'Log in' : 'Create an account'}</Link></p>
    </form></div>)
}
