'use client'
import styles from '../../styles/productos.module.css'
import Image from 'next/image'
import Link from 'next/link'
import withoutImage from '../../public/image/sinImagen.png'
import { Toaster, toast } from 'react-hot-toast'

export default function ProductCard (props) {
  const { setFetch } = props
  const { id } = props
  const handleDelete = () => {
    fetch('http://localhost:3500/api/products/delete', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        secret: 'admin'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        if (res.ok) {
          toast.success(`"${props.name}" eliminado correctamente`)
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
        ¿Quieres eliminar "{props.name}"?
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
    <article className={styles.articleProducto}>
      <div className={styles.divImagenProducto}>
        <Image
          className={styles.imagenProducto}
          src={props.image === null ? withoutImage : props.pathImage}
          alt={props.name}
          width={220}
          height={150}
        />
      </div>
      <div className={styles.divP}>
        <p className={styles.nombreProducto}>{props.name}</p>
        <p className={styles.precioProducto}>${props.price}</p>
      </div>
      <div className={styles.divBotonesProducto}>
        <div className={styles.botonEliminar} onClick={handleConfirmDelete}>Eliminar</div>
        <Link className={styles.botonModificar} href={`/productos/modificar-producto/${props.id}`}>
          Modificar
        </Link>
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
