import ProductForm from '../../components/ProductForm'

export default async function AgregarProductosPage () {
  const fetchCategories = () => {
    return fetch('http://localhost:3500/api/products/categories', { cache: 'no-store' })
      .then(res => res.json())
  }
  const categories = await fetchCategories()
  const fetchRequest = 'http://localhost:3500/api/products/create'
  return (
    <>
      <main>
        <ProductForm {...categories} request={fetchRequest} />
      </main>
    </>

  )
}
