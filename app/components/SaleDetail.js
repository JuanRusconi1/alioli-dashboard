import '../../styles/detalleComanda.css'
import SaleDetailButtons from './saleDetailButtons'

export default async function SaleDetail ({ id }) {
  const orderFetch = () => {
    return fetch(`http://localhost:3500/api/sales/detail/${id}`)
      .then(res => res.json())
  }
  const { data } = await orderFetch()
  return (
    <main>
      <div className='div-card'>
        <div className='div-card-detail'>
          <div className='div-info-client'>
            <p className='client-title'>Datos del cliente</p>
            <div className='client-content'>
              <p>Nombre: {data.buyerName}</p>
              <p>Numero de telefono: {data.phoneNumber}</p>
              <p>Forma de pago: {data.paymentType}</p>
              <p>Fecha: {data.date}</p>
            </div>
          </div>
          <div className='div-info-sale'>
            <p className='sale-title'>Productos</p>
            <table className='table-sale'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {data.orderitem.map((item, i) => (
                  <tr className='row-item-sale' key={i}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className='total'>Total: </td>
                  <td className='total-value'>{data.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <SaleDetailButtons id={id} />
      </div>
    </main>
  )
}
