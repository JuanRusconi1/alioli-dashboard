'use client'
import styles from '../../styles/comandas.module.css'
import Link from 'next/link'
import SaleCard from './saleCard'
import { useState, useEffect } from 'react'

export default function SaleList () {
  const [fetchData, setFetch] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [date, setDate] = useState('')
  const [maxPage, setMaxPage] = useState()
  const [pagButton, setPagButton] = useState(styles.numberList)
  // const sales = await getFetchSales()

  useEffect(() => {
    fetch(`http://localhost:3500/api/sales/page/${page}`)
      .then(res => res.json())
      .then(sales => {
        if (sales.ok) {
          setData(sales.data)
          setMaxPage(sales.totalPages)
        } else {
          setData({ errorMessage: `No hay Comandas en esta pagina (pagina: ${page})` })
        }
      })
  }, [page, fetchData])
  useEffect(() => {
    if (date.length > 0) {
      const body = {
        keyword: date
      }
      fetch('http://localhost:3500/api/sales/search', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => {
          res.ok
            ? setData(res.data)
            : setData({ errorMessage: `No se encontraron comandas disponibles (${date})` })
          setPagButton(styles.hidden)
        })
    } else {
      setPage(1)
      setPagButton(styles.numberList)
      fetch('http://localhost:3500/api/sales/page/1')
        .then(res => res.json())
        .then(sales => {
          if (sales.ok) {
            setData(sales.data)
            setMaxPage(sales.totalPages)
          }
        })
    }
  }, [date])
  return (
    <main className={styles.main}>
      <section className={styles.sectionBotones}>
        <div class={styles.inputGroup}>
          <form onSubmit={(e) => {
            e.preventDefault()
            setDate(e.target.keyword.value)
          }}
          >
            <input
              className={styles.input}
              type='date'
              autocomplete='off'
              name='keyword'
            />
            <input
              className={styles.buttonSubmit}
              value='Buscar'
              type='submit'
            />
          </form>
        </div>
        <div>
          <Link href='/comandas/agregar-comanda' className={styles.buttonAdd}>
            Agregar comanda
          </Link>
        </div>
      </section>
      <section className={styles.sectionSaleList}>
        {data.length > 0 && data.map((sale, i) => (
          <SaleCard key={i} {...sale} setFetch={setFetch} />
        ))}
        {data.errorMessage && <p className={styles.errorMessage}>{data.errorMessage}</p>}
      </section>
      <div className={pagButton}>
        <button className={styles.buttonList} onClick={() => { page <= 1 ? setPage(1) : setPage(page - 1) }}>
          <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-arrow-badge-left-filled' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z' stroke-width='0' fill='currentColor'></path>
          </svg>
        </button>
        <input className={styles.inputNumberList} type='number' value={page} onChange={(e) => { setPage(e.target.value) }} />
        <button className={styles.buttonList} onClick={() => { page >= maxPage ? setPage(maxPage) : setPage(page + 1) }}>
          <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-arrow-badge-right-filled' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z' stroke-width='0' fill='currentColor'></path>
          </svg>
        </button>
      </div>
    </main>
  )
}
