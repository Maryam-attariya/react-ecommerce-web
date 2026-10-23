const img = (id, extra = '') => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&h=700&q=70${extra}`
const raw = [
  ['Classic White Tee', 'Fashion', 29, 19, '1521572163474-6864f9cf17ab'],
  ['Denim Jacket', 'Fashion', 89, 64, '1551028719-00167b16eac5'],
  ['Summer Dress', 'Fashion', 69, 49, '1496747611176-843222e1e57c'],
  ['Slim Fit Jeans', 'Fashion', 59, 0, '1542272604-787c3835535d'],
  ['Cotton Shirt', 'Fashion', 49, 0, '1583743814966-8936f5b7be1a'],
  ['Wireless Headphones', 'Electronics', 199, 149, '1505740420928-5e560c06d30e'],
  ['Smart Watch', 'Electronics', 249, 199, '1546868871-7041f2a55e12'],
  ['Pro Camera', 'Electronics', 899, 0, '1526170375885-4d8ecf77b99f'],
  ['Smartphone X', 'Electronics', 699, 629, '1511707171634-5f897ff02aa9'],
  ['Ultra Laptop', 'Electronics', 1199, 0, '1593642632823-8f785ba67e45'],
  ['Studio Headset', 'Electronics', 159, 0, '1484704849700-f032a568e944'],
  ['Runner Sneakers', 'Footwear', 129, 99, '1542291026-7eec264c27ff'],
  ['Street Sneakers', 'Footwear', 109, 0, '1491553895911-0055eca6402d'],
  ['Court Classics', 'Footwear', 95, 79, '1600185365483-26d7a4cc7519'],
  ['Sport Shoes', 'Footwear', 119, 89, '1560343090-f0409e92791a'],
  ['Leather Backpack', 'Accessories', 119, 89, '1553062407-98eeb64c6a62'],
  ['Aviator Sunglasses', 'Accessories', 79, 0, '1572635196237-14b3f281503f'],
  ['Luxury Watch', 'Accessories', 349, 279, '1523275335684-37898b6baf30'],
  ['Accent Chair', 'Home', 229, 179, '1586023492125-27b2c045efd7'],
  ['Modern Sofa', 'Home', 799, 649, '1555041469-a586c61ea9bc'],
]
export const categories = ['Fashion', 'Electronics', 'Footwear', 'Accessories', 'Home']
export const colorsList = ['Black', 'White', 'Navy', 'Olive']
export const sizesList = ['S', 'M', 'L', 'XL']
export const products = raw.map(([name, category, price, disc, id], i) => ({
  id: i + 1, name, category, price, discountPrice: disc || price,
  images: [img(id), img(id, '&crop=top'), img(id, '&crop=bottom')],
  rating: +(3.8 + (i % 12) / 10).toFixed(1), reviews: 20 + i * 13,
  stock: i % 7 === 0 ? 0 : 6 + i, isNew: i >= 10, sizes: sizesList, colors: colorsList,
  description: `${name} is built for daily use with durable materials, a clean finish and a fit that works for most people. Backed by a 30-day return policy.`,
}))
