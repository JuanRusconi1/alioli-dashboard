'use client'
import styles from '../../styles/comandasCreate.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
const valorTotal = (productos) => {
  return productos.reduce((acum, product) => acum += product.price * product.quantity, 0)
}
const detail = []

export default function SaleForm (props) {
  const [product, setProduct] = useState(props.data[0].name)
  const [quantity, setQuantity] = useState(1)
  const [productPrice, setPrice] = useState(props.data[0].price)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [payment, setPayment] = useState('Efectivo')
  const [category, setCategory] = useState(props.data[0].categories.name)
  const router = useRouter()
  const paymentTypes = [
    'Efectivo',
    'Transferencia',
    'Tarjeta'
  ]

  const resetInfoProducts = () => {
    setProduct('')
    setQuantity(1)
    setPrice(0)
  }
  const handleChange = (e) => {
    const id = e.target.value
    const productToFind = props.data.find(product => product.id == id)
    setProduct(productToFind.name)
    setPrice(productToFind.price)
    setCategory(productToFind.categories.name)
  }
  const handleDetail = (e) => {
    e.preventDefault()
    detail.push({
      productName: product,
      productCategory: category,
      price: productPrice,
      quantity: quantity
    })
    resetInfoProducts()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('Debes ingresar un nombre')
    }
    if (detail.length === 0) {
      toast.error('La comanda debe tener mínimo un producto')
    }
    if (name.length > 0 && detail.length > 0) {
      const formData = {
        orderitem: detail,
        buyerName: name,
        phoneNumber: number,
        paymentType: payment,
        total: valorTotal(detail)
      }
      toast.loading('Cargando comanda')
      fetch('http://localhost:3500/api/sales/create', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => {
          if (res.ok) {
            toast.success('Comanda cargada correctamente', {
              duration: 3000,
              position: 'bottom-right',
              style: {
                border: '2px solid #28a745'
              }
            })
            setTimeout(() => {
              router.push(`/comandas/detalle/${res.order.id}`)
              detail.splice(0, detail.length)
            }, 2000)
          } else {
            toast.error('Ocurrio un error, Reinicie la pagina')
          }
        })
    }
  }

  return (
    <div className={styles.contendorForm}>
      <form className={styles.saleForm}>
        <div className={styles.divFormClient}>
          <label htmlFor='name'>Nombre del cliente</label>
          <input className={styles.divFormClientInput} type='text' name='name' id='name' onBlur={(e) => setName(e.target.value)} />

          <label htmlFor='paymentType'>Forma de pago</label>
          <select className={styles.select} id='paymentType' name='paymentType' onChange={(e) => setPayment(e.target.value)}>
            {paymentTypes.map((payment, i) => (
              <option
                key={i}
                value={payment}
              >
                {payment}
              </option>
            ))}
          </select>

          <label htmlFor='phoneNumber'>Numero de telefono</label>
          <input className={styles.divFormClientInput} type='number' name='phoneNumber' id='phoneNumber' onBlur={(e) => setNumber(e.target.value)} />
        </div>
        <div className={styles.divFormProducts}>
          <label htmlFor='product'>Producto</label>
          <select className={styles.select} id='product' name='product' onChange={handleChange}>
            {props.data.map(product => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>

          <label htmlFor='price'>Precio</label>
          <input className={styles.divFormProductsInput} id='price' name='price' type='number' value={productPrice} onChange={(e) => setPrice(e.target.value)} />

          <label htmlFor='quantity'>Cantidad</label>
          <input className={styles.divFormProductsInput} id='quantity' type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <div className={styles.divButtons}>
            <button className={styles.button} onClick={handleDetail}>Añadir producto</button>
            <button className={styles.button} onClick={handleSubmit}>Crear comanda</button>
          </div>
        </div>
      </form>
      <div className={styles.orderPreview}>
        <div>
          <ul className={styles.orderPreviewUL}>
            <li className={styles.li}>Nombre: {name}</li>
            <li className={styles.li}>Forma de pago: {payment}</li>
            <li className={styles.li}>Telefono: {number}</li>
          </ul>
        </div>
        <div>
          <ul>
            {detail.length > 0 && detail.map((product, i) => (
              <li key={i}>{product.productName} x{product.quantity}  ${product.price} </li>
            ))}
          </ul>
          {detail.length > 0 && <div className={styles.valorTotal}>Total: ${valorTotal(detail)}</div>}
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
    </div>

  )
}
