import ProductList from '../components/productList'

async function productsFetch () {
  const products = await fetch('http://localhost:3500/api/products', { cache: 'no-store' })
  const response = await products.json()
  return response
}

export default async function Productos () {
  const products = await productsFetch()
  return (
    <>
      <ProductList {...products} />
    </>
  )
}
