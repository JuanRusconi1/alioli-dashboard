import '../../styles/productos.css'
import ProductList from '../components/productList'

export default async function Productos () {
  const productsFetch = () => {
    const results = fetch('http://localhost:3500/api/products', { cache: 'no-store' })
      .then(res => res.json())
    return results
  }
  const products = await productsFetch()
  return (
    <>
      <main className='main-productos'>
        <ProductList {...products} />
      </main>
    </>
  )
}
