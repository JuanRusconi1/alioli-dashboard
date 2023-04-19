'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../styles/agregarProducto.css'

export default function ProductForm (props) {
  const router = useRouter()
  const { oldData, request } = props
  const [name, setName] = useState(oldData !== undefined ? oldData.name : '')
  const [price, setPrice] = useState(oldData !== undefined ? oldData.price : '')
  const [description, setDescription] = useState(oldData !== undefined ? oldData.description : '')
  const [category, setCategory] = useState(oldData !== undefined ? oldData.categoryId : '1')
  const [image, setImage] = useState(null)

  const resetInputs = () => {
    setName('')
    setPrice('')
    setDescription('')
    setCategory('1')
    setImage(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('categoryId', category)
    formData.append('image', image)

    fetch(request, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(res => {
        if (res.ok) {
          resetInputs()
          router.push('/productos')
        }
      })
  }
  return (
    <div className='div-form'>
      <form className='form-añadir-producto' onSubmit={(handleSubmit)}>
        <div className='div-input'>
          <label htmlFor='name'>Nombre del producto</label>
          <input className='input'
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }} />
        </div>
        <div className='div-input'>
          <label htmlFor='price'>Precio</label>
          <input className='input'
            type='number'
            id='price'
            name='price'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
            }} />
        </div>
        <div className='div-input'>
          <label htmlFor='description'>Descripción</label>
          <textarea className='input'
            rows='5'
            id='description'
            name='description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }} />
        </div>
        <div className='div-select'>
          <label htmlFor='categories'>Categoria</label>
          <select id='categories'
            name='category'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}>
            {props.data.map((category, i) => (
              <option
                key={category.id}
                value={i + 1}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className='div-file'>
          <label htmlFor='image'>Imagen</label>
          <input type='file' id='image' name='image' onChange={(e) => {
            setImage(e.target.files[0])
          }} />
        </div>
        <button type='submit'>{oldData !== undefined ? 'Modificar' : 'Agregar producto'}</button>
      </form>
    </div>
  )
}
