import SaleDetail from '@component/app/components/SaleDetail'

export default function DetalleComandaId ({ params }) {
  const { id } = params
  return (
    <>
      <SaleDetail id={id} />
    </>
  )
}
