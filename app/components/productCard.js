'use client'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import withoutImage from '../../public/image/sinImagen.png'

export default function ProductCard (props) {
  const [style, setStyle] = useState('article-producto')
  const handleClick = (e) => {
    const id = e.target.value
    fetch(`http://localhost:3500/api/products/delete/${id}`)
      .then(res => res.json)
    setStyle('hidden')
  }
  return (
    <article className={style}>
      <div className='div-imagen-producto'>
        <Image
          className='imagen-producto'
          src={props.image === null ? withoutImage : props.pathImage}
          alt={props.name}
          width={250}
          height={200}
        />
      </div>
      <div className='div-p'>
        <p className='p-nombre-producto'>{props.name}</p>
        <p className='p-precio-producto'>${props.price}</p>
      </div>
      <div className='div-botones-producto'>
        <div className='boton-eliminar' value={props.id} onClick={handleClick}>Eliminar</div>
        <Link className='boton-modificar' href={`/productos/modificar-producto/${props.id}`}>
          Modificar
        </Link>
      </div>
    </article>
  )
}
