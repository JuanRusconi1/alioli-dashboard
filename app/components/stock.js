'use client'
import { useEffect, useState } from 'react'
import styles from '../../styles/modificarStock.module.css'
import StockForm from './stockForm'
import StockRow from './stockRow'

export default function Stock ({ data }) {
  const [resetFetch, setFetch] = useState(false)
  const [items, setItems] = useState(data)
  useEffect(() => {
    if (resetFetch) {
      fetch('http://localhost:3500/api/products/stock', { cache: 'no-store' })
        .then(res => res.json())
        .then(response => {
          setItems(response.data)
          setFetch(false)
        })
    }
  }, [resetFetch])
  return (
    <div className={styles.listStock}>
      <div className={styles.titleList}>
        <div className={styles.title}>Nombre</div>
        <div className={styles.title}>Cantidad en stock</div>
      </div>
      {items.length > 0 && items.map(stockItem => (
        <StockRow key={stockItem.id} {...stockItem} setFetch={setFetch} />
      ))}
      <div className={styles.divStockForm}>
        <p className={styles.titleForm}>Añadir fila</p>
        <StockForm setFetch={setFetch} />
      </div>
    </div>
  )
}
