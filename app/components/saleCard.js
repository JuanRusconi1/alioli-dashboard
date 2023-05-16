'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function SaleCard (props) {
  const [style, setStyle] = useState('article-sale')

  const handleDelete = () => {
    fetch(`http://localhost:3500/api/sales/delete/${props.id}`)
      .then(res => {
        if (res.ok) {
          setStyle('hidden')
        }
      })
  }

  return (
    <article className={style}>
      <div className='div-up-info'>
        <p className='p-date'>Fecha: {props.date}</p>
        <p className='p-value'>Total: ${props.total}</p>
      </div>
      <div className='div-down-info'>
        <p className='p-buyer-name'>Nombre: {props.buyerName}</p>
        <div className='div-button-card'>
          <div className='button-card delete' onClick={handleDelete}>Eliminar</div>
          <Link href={`/comandas/detalle/${props.id}`} className='button-card detail'>Detalle</Link>
        </div>
      </div>
    </article>
  )
}
