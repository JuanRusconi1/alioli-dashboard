import SaleForm from '@component/app/components/saleForm'

export default async function agregarComandaPage () {
  const productsFetch = () => {
    return fetch('http://localhost:3500/api/products', { cache: 'no-store' })
      .then(res => res.json())
  }
  const products = await productsFetch()
  return (
    <>
      <SaleForm {...products} />
    </>
  )
}
