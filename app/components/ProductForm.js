'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/productosForm.module.css'
import { Toaster, toast } from 'react-hot-toast'
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
    if (name.length === 0) {
      toast.error('El producto debe tener un nombre')
    }
    if (price.length === 0) {
      toast.error('El producto debe tener un precio')
    }

    if (name.length > 0 && price.length > 0) {
      toast.loading('Cargando producto')
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
            toast.success('Producto cargado correctamente')
            setTimeout(() => {
              resetInputs()
              router.push('/productos')
            }, 2000)
          } else {
            toast.error('Ocurrio un error, Reinicie la pagina')
          }
        })
    }
  }
  return (
    <div className={styles.divForm}>
      <form className={styles.formAñadirProducto} onSubmit={handleSubmit}>
        <div className={styles.divInput}>
          <label htmlFor='name'>Nombre del producto</label>
          <input
            className={styles.input}
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
        </div>
        <div className={styles.divInput}>
          <label htmlFor='price'>Precio</label>
          <input
            className={styles.input}
            type='number'
            id='price'
            name='price'
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}
          />
        </div>
        <div className={styles.divInput}>
          <label htmlFor='description'>Descripción</label>
          <textarea
            className={styles.input}
            rows='5'
            id='description'
            name='description'
            value={description}
            onChange={(e) => { setDescription(e.target.value) }}
          />
        </div>
        <div className={styles.divSelect}>
          <label htmlFor='categories'>Categoria</label>
          <select
            id='categories'
            name='category'
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
          >
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

        <div className={styles.divFile}>
          <label htmlFor='image'>Imagen</label>
          <input
            type='file'
            id='image'
            name='image'
            onChange={(e) => { setImage(e.target.files[0]) }}
          />
        </div>
        <button className={styles.button} type='submit'>{oldData !== undefined ? 'Modificar' : 'Agregar producto'}</button>
      </form>
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
    </div>
  )
}
