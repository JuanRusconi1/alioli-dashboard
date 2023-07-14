import Stock from '@component/app/components/stock'
import styles from '../../../styles/modificarStock.module.css'
export default async function ModificarStockPage () {
  const fetchStock = () => {
    return fetch('http://localhost:3500/api/products/stock', { cache: 'no-store' })
      .then(res => res.json())
  }
  const stock = await fetchStock()
  return (
    <main className={styles.main}>
      <Stock data={stock.data} />
    </main>
  )
}
