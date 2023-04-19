import ProductForm from '@component/app/components/ProductForm'
import NavBar from '@component/app/components/navBar'

export default async function ProductoId ({ params }) {
  const { id } = params

  const fetchCategories = () => {
    return fetch('http://localhost:3500/api/products/categories')
      .then(res => res.json())
  }

  const productToUpdate = () => {
    return fetch(`http://localhost:3500/api/products/${id}`, { cache: 'no-store' })
      .then(res => res.json())
  }
  const categories = await fetchCategories()
  const { data } = await productToUpdate()
  const fetchRequest = `http://localhost:3500/api/products/update/${id}`
  return (
    <>
      <NavBar />
      <main>
        <ProductForm {...categories} oldData={data} request={fetchRequest} />
      </main>
    </>
  )
}
