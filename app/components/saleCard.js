import styles from '../../styles/comandas.module.css'
import Link from 'next/link'
import { Toaster, toast } from 'react-hot-toast'

export default function SaleCard (props) {
  const { setFetch } = props
  const handleDelete = () => {
    fetch('http://localhost:3500/api/sales/delete', {
      method: 'POST',
      body: JSON.stringify({
        id: props.id,
        secret: 'admin'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        if (res.ok) {
          toast.success(`Comanda N°${props.id} eliminada correctamente`)
          setTimeout(() => {
            setFetch(true)
          }, 2000)
        } else {
          toast.error('Ocurrio un error, recarga la pagina')
        }
      })
  }
  const handleConfirmDelete = () => {
    toast((t) => (
      <span>
        ¿Quieres eliminar la comanda N°{props.id}?
        <button className={styles.buttonToastConfirm} onClick={() => {
          handleDelete()
          toast.dismiss(t.id)
          }}>
          Si
        </button>
        <button className={styles.buttonToastRefuse} onClick={() => toast.dismiss(t.id)}>
          No
        </button>
      </span>
    ), {
      style: {
        border: '2px solid gainsboro',
        fontWeight: 'bold',
      },
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
          <div className={styles.buttonCardDelete} onClick={handleConfirmDelete}>Eliminar</div>
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
          }
        }}
      />
    </article>
  )
}
