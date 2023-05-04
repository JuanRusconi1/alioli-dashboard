'use client'
import { useRouter } from 'next/navigation'
export default function DeleteButton (props) {
  const router = useRouter()
  const handleClick = (e) => {
    const id = e.target.value
    console.log(id)
    fetch(`http://localhost:3500/api/products/delete/${id}`)
      .then(res => res.json)
    router.push('/productos')
  }
  return (
    <button className='boton-eliminar' value={props.id} onClick={handleClick}>Eliminar</button>
  )
}
