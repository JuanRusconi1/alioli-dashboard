import styles from '../../styles/comandasDetail.module.css'
import SaleDetailButtons from './saleDetailButtons'

export default async function SaleDetail ({ id }) {
  const orderFetch = () => {
    return fetch(`http://localhost:3500/api/sales/detail/${id}`, { cache: 'no-store' })
      .then(res => res.json())
  }
  const { data } = await orderFetch()
  return (
    <main className={styles.main}>
      <div className={styles.divCard}>
        <div className={styles.divCardDetail}>
          <div className={styles.divInfoClient}>
            <p className={styles.clientTitle}>Datos del cliente</p>
            <div className={styles.clientContent}>
              <p className={styles.clientContentP}>N° de comanda: {data.id}</p>
              <p className={styles.clientContentP}>Nombre: {data.buyerName}</p>
              <p className={styles.clientContentP}>Numero de telefono: {data.phoneNumber}</p>
              <p className={styles.clientContentP}>Forma de pago: {data.paymentType}</p>
              <p className={styles.clientContentP}>Fecha: {data.date}</p>
            </div>
          </div>
          <div className={styles.divInfoSale}>
            <p className={styles.saleTitle}>Productos</p>
            <table className={styles.tableSale}>
              <thead>
                <tr>
                  <th className={styles.tableSaleTH}>Nombre</th>
                  <th className={styles.tableSaleTH}>Cantidad</th>
                  <th className={styles.tableSaleTH}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {data.orderitem.map((item, i) => (
                  <tr key={i}>
                    {/* <td className={styles.rowItemSaleTD}>{item.productName}</td> */}
                    {item.docena && item.docena.length 
                    ? <td className={styles.rowItemSaleDocena}>{item.productName} 
                        <div className={styles.divButtonList}>
                          <button className={styles.buttonDetailDocena}>
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-details" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M13 5h8"></path>
                            <path d="M13 9h5"></path>
                            <path d="M13 15h8"></path>
                            <path d="M13 19h5"></path>
                            <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                            <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                          </svg>
                          </button>
                          <div className={styles.divDocenaDetail}>
                            <ul className={styles.docenaList}>
                              {item.docena.map((empanada) => (
                                <li>{empanada.name} x{empanada.quantity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                    </td> 
                    : <td className={styles.rowItemSaleTD}>{item.productName}</td>}
                    <td className={styles.rowItemSaleTD}>{item.quantity}</td>
                    <td className={styles.rowItemSaleTD}>${item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className={styles.total}>Total: </td>
                  <td className={styles.totalValue}>${data.total}</td>
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
