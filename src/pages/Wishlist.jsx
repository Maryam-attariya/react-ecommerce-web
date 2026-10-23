import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { products } from '../data/products.js'

export default function Wishlist() {
  const { wishlist } = useStore()
  const list = products.filter((p) => wishlist.includes(p.id))
  return (
    <div className="wrap py-8">
      <h1 className="mb-6 text-2xl font-extrabold">Wishlist</h1>
      {list.length ? <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        : <div className="py-20 text-center"><p className="text-stone-500">Tap the heart on any product to save it here.</p><Link to="/shop" className="btn-primary mt-6">Browse products</Link></div>}
    </div>)
}
