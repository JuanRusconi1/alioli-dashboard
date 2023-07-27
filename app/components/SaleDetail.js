import styles from '../../styles/comandasDetail.module.css'
import SaleDetailButtons from './saleDetailButtons'

export default async function SaleDetail ({ id }) {
  const orderFetch = () => {
    return fetch(`http://localhost:3500/api/sales/detail/${id}`)
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
                    <td className={styles.rowItemSaleTD}>{item.productName}</td>
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
