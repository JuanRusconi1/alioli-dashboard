import InfoHeader from '../components/infoHeader'
import styles from '../../styles/principal.module.css'
import DashboardMain from '../components/dashboardMain'

export default async function PrincipalPage () {
  const productsToFetch = () => {
    const products = fetch('http://localhost:3500/api/products', { cache: 'no-store' })
      .then(res => res.json())
    return products
  }
  const categoriesToFetch = () => {
    const categories = fetch('http://localhost:3500/api/products/categories', { cache: 'no-store' })
      .then(res => res.json())
    return categories
  }
  const salesToFetch = () => {
    const sales = fetch('http://localhost:3500/api/sales', { cache: 'no-store' })
      .then(res => res.json())
    return sales
  }
  const categories = await categoriesToFetch()
  const products = await productsToFetch()
  const sales = await salesToFetch()
  return (
    <main className={styles.main}>
      <InfoHeader
        productsLength={products.count}
        categoriesLength={categories.count}
        salesLength={sales.count}
      />
      <DashboardMain sales={sales.data} categories={categories.data} />
    </main>
  )
}
