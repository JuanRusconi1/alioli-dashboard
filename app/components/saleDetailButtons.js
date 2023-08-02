'use client'
import { useRouter } from 'next/navigation'
import styles from '../../styles/comandasDetail.module.css'
export default function SaleDetailButtons ({ id }) {
  const router = useRouter()
  const handleReturn = () => {
    router.push('/comandas')
  }

  const handleDelete = () => {
    fetch(`http://localhost:3500/api/sales/delete/${id}`)
      .then(res => {
        if (res.ok) {
          router.push('/comandas')
        }
      })
  }
  const handleUpdate = () => {
    router.push(`/comandas/modificar-comanda/${id}`)
  }
  return (
    <div className={styles.divButtons}>
      <button className={styles.buttonCardUpdate} onClick={handleUpdate}>
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
        <path d="M16 5l3 3"></path>
      </svg>
        Modificar
      </button>
      <button className={styles.buttonCardDelete} onClick={handleDelete}>
        <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-x' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M18 6l-12 12'></path>
          <path d='M6 6l12 12'></path>
        </svg>
        Eliminar
      </button>
      <button className={styles.buttonCardPrint}>
        <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-printer' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2'></path>
          <path d='M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4'></path>
          <path d='M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z'></path>
        </svg>
        Imprimir
      </button>
      <button className={styles.buttonCardHome} onClick={handleReturn}>
        <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-door-enter' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M13 12v.01'></path>
          <path d='M3 21h18'></path>
          <path d='M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5'></path>
          <path d='M21 7h-7m3 -3l-3 3l3 3'></path>
        </svg>
        Volver al Inicio
      </button>
    </div>
  )
}
