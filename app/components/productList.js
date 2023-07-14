'use client'
import styles from '../../styles/productos.module.css'
import { useEffect, useState } from 'react'
import ProductCard from './productCard'
import Link from 'next/link'

const usePagination = (array, numberPage, quantity) => {
  const first = (numberPage * quantity) - quantity
  const second = (numberPage * quantity)
  const results = array.slice(numberPage === 1 ? 0 : first, second)

  return results
}

export default function ProductList (props) {
  const [fetchData, setFetch] = useState(false)
  const [products, setProducts] = useState(props.data)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (fetchData) {
      fetch('http://localhost:3500/api/products', { cache: 'no-store' })
        .then(res => res.json())
        .then(response => {
          setProducts(response.data)
          setFetch(false)
        })
    }
  }, [fetchData])

  const updateProducts = (products, keyword) => {
    const newProducts = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))
    if (newProducts.length !== 0) {
      setProducts(newProducts)
      setError('')
    } else {
      setError(`No se encontraron Productos ("${keyword}")`)
      setProducts([])
    }
  }

  const totalPages = () => {
    const maxPage = Math.ceil(products.length / 10)
    const pages = []
    for (let i = 1; i <= maxPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
    if (e.target.value === '') {
      setProducts(props.data)
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProducts(props.data, keyword)
  }

  const productsInPage = usePagination(products, page, 10)

  return (
    <main className={styles.mainProductos}>
      <section>
        <ul className={styles.listaBotones}>
          <li>
            <div class={styles.inputGroup}>
              <form>
                <input
                  type='text'
                  className={styles.input}
                  placeholder='Lomo Completo...'
                  autocomplete='off'
                  onChange={handleChange}
                />
                <input
                  className={styles.buttonSubmit}
                  value='Buscar'
                  type='button'
                  onClick={handleSubmit}
                />
              </form>
            </div>

          </li>
          <li className={styles.liBotones}>
            <Link href='/productos/agregar-productos'>Agregar productos</Link>
          </li>
          <li className={styles.liBotones}>
            <Link href='/productos/modificar-stock'>Modificar Stock</Link>
          </li>
        </ul>
      </section>
      <section className={styles.sectionListaProductos}>

        {products.length > 0 && productsInPage.map((product, i) => (
          <ProductCard key={i} {...product} setFetch={setFetch} />))}

        {error && <p className={styles.errorMessage}>{error}</p>}

      </section>
      <div className={styles.numberList}>
        <ul className={styles.ulNumberList}>
          {totalPages().map((numberPage, i) => (
            <li
              className={numberPage === page ? styles.liNumberPageActivo : styles.liNumberPage}
              value={page}
              onClick={() => setPage(numberPage)}
              key={i}
            >
              {numberPage}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
