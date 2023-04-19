'use client'
import { useState } from 'react'
import ProductCard from './productCard'
import Link from 'next/link'
import usePagination from '../hooks/usePagination'
// const usePagination = (array, numberPage, quantity) => {
//   const first = (numberPage * quantity) - quantity
//   const second = (numberPage * quantity)
//   const results = array.slice(numberPage === 1 ? 0 : first, second)

//   return results
// }

const updateProducts = (products, keyword) => {
  return products.filter(product => product.name.toLowerCase().includes(keyword))
}

export default function ProductList (props) {
  const [products, setProducts] = useState(props.data)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

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
    }
  }

  const handleSubmit = () => {
    setProducts(updateProducts(props.data, keyword))
  }

  const productsInPage = usePagination(products, page, 10)

  return (
    <>
      <section className='section-botones-productos'>
        <ul className='lista-botones'>
          <li className='li-buscador'>
            <div class='input-group'>
              <form>
                <input
                  type='text'
                  className='input'
                  placeholder='Lomo Completo...'
                  autocomplete='off'
                  onChange={handleChange}
                />
                <input
                  className='button--submit'
                  value='Buscar'
                  type='button'
                  onClick={handleSubmit}
                />
              </form>
            </div>

          </li>
          <li className='li-botones'>
            <Link href='/productos/agregar-productos'>Agregar productos</Link>
          </li>
          <li className='li-botones'>
            <Link href='/productos/stock'>Modificar Stock</Link>
          </li>
        </ul>
      </section>
      <section className='section-lista-produsctos'>
        {productsInPage.map((product, i) => (
          <ProductCard key={i} {...product} />))}
      </section>
      <div className='number-list'>
        <ul className='ul-number-list'>
          {totalPages().map((numberPage, i) => (
            <li className={numberPage === page ? 'li-number-page activo' : 'li-number-page'}
              value={page}
              onClick={() => setPage(numberPage)}
              key={i}>
              {numberPage}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
