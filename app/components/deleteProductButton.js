'use client'
const handleClick = () => {
  fetch()
}
export default function DeleteProductButton (props) {
  console.log(props.id)
  return (
    <button className='boton-eliminar' onClick={handleClick}>Eliminar</button>
  )
}
