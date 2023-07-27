import styles from '../../styles/comandas.module.css'
import Link from 'next/link'
import { Toaster, toast } from 'react-hot-toast'

export default function SaleCard (props) {
  const { setFetch } = props
  const handleDelete = () => {
    toast.loading('Eliminando comanda')
    fetch(`http://localhost:3500/api/sales/delete/${props.id}`)
      .then(res => {
        if (res.ok) {
          toast.success('Comanda eliminada correctamente')
          setTimeout(() => {
            setFetch(true)
          }, 2000)
        } else {
          toast.error('Ocurrio un error, recarga la pagina')
        }
      })
  }

  return (
    <article className={styles.articleSale}>
      <div className={styles.divUpInfo}>
        <p>Fecha: {props.date}</p>
        <p>Total: ${props.total}</p>
      </div>
      <div className={styles.divDownInfo}>
        <p>N°:{props.id}</p>
        <div className={styles.divButtonCard}>
          <div className={styles.buttonCardDelete} onClick={handleDelete}>Eliminar</div>
          <Link href={`/comandas/detalle/${props.id}`} className={styles.buttonCardDetail}>Detalle</Link>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          success: {
            duration: 3000,
            position: 'bottom-right',
            style: {
              border: '2px solid #28a745',
              fontWeight: 'bold'
            }
          },
          error: {
            position: 'bottom-right',
            duration: 3000,
            style: {
              border: 'solid 2px tomato',
              fontWeight: 'bold'
            }
          },
          loading: {
            position: 'bottom-right',
            duration: 3000,
            style: {
              border: 'solid 2px gainsboro',
              fontWeight: 'bold'
            }
          }
        }}
      />
    </article>
  )
}
