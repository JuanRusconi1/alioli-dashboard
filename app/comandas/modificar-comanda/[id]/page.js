import SaleForm from '@component/app/components/saleForm'

export default async function ModificarComandaPage ({ params }) {
  const { id } = params
  const productsFetch = () => {
    return fetch('http://localhost:3500/api/products', { cache: 'no-store' })
      .then(res => res.json())
  }
  const products = await productsFetch()
  const fetchSale = () => {
    return fetch(`http://localhost:3500/api/sales/detail/${id}`)
      .then(sale => sale.json())
  }
  const sale = await fetchSale()
  const request = `http://localhost:3500/api/sales/update/${id}`
  return (
    <>
      <SaleForm data={products.data} request={request} oldData={sale.data} />
    </>
  )
}
