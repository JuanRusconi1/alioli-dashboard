'use client'
import styles from '../../styles/principal.module.css'
import DashboardRightSide from '../components/dashboardRightSide'
import DashboardLefttSide from '../components/dashboardLeftSide'
import { useEffect, useState } from 'react'

export default function DashboardMain ({ sales, categories }) {
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(null)
  const [filteredSales, setFilteredSales] = useState([])
  useEffect(() => {
    if (filter === '') {
      setError(null)
      return setFilteredSales([])
    }
    if (filter) {
      const salesFiltered = sales.filter((sale) => sale.date.includes(filter))
      if (salesFiltered.length === 0) {
        setError(`No existen comandas (${filter})`)
        setFilteredSales([])
        return
      }
      setError(null)
      return setFilteredSales(salesFiltered)
    }
  }, [filter])
  return (
    <section className={styles.sectionPrincipal}>
      <DashboardLefttSide error={error} sales={sales} filter={filter} filteredSales={filteredSales} />
      <DashboardRightSide
        error={error}
        sales={sales}
        categories={categories}
        changeFilter={setFilter}
        filter={filter}
        filteredSales={filteredSales}
      />
    </section>
  )
}
