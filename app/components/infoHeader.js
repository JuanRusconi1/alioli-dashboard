import styles from '../../styles/principal.module.css'

export default function InfoHeader (props) {
  const { productsLength, categoriesLength, salesLength } = props
  return (
    <section className={styles.header}>
      <div className={styles.divInfoP}>
        <p>Productos totales:</p>
        <p>{productsLength}</p>
      </div>
      <div className={styles.divInfoC}>
        <p>Categorias totales:</p>
        <p>{categoriesLength}</p>
      </div>
      <div className={styles.divInfoS}>
        <p>Comandas totales:</p>
        <p>{salesLength}</p>
      </div>
    </section>
  )
}
