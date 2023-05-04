'use client'
import '../../styles/comandas.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const detail = []

const valorTotal = (productos) => {
  return productos.reduce((acum, product) => acum += product.price * product.quantity, 0)
}

export default function SaleForm (props) {
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [productPrice, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [payment, setPayment] = useState('Efectivo')
  const [category, setCategory] = useState('')
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

    const formData = {
      orderitem: detail,
      buyerName: name,
      phoneNumber: number,
      paymentType: payment,
      total: valorTotal(detail)
    }

    fetch('http://localhost:3500/api/sales/create', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        if (res.ok) {
          router.push(`/comandas/detalle/${res.order.id}`)
        }
      })
  }

  return (
    <div className='contendor-form'>
      <form className='sale-form'>
        <div className='div-form-client'>
          <label className='label-name' htmlFor='name'>Nombre del cliente</label>
          <input className='input-name' type='text' name='name' id='name' onBlur={(e) => setName(e.target.value)} />

          <label className='label-payment' htmlFor='paymentType'>Forma de pago</label>
          <select id='paymentType' name='paymentType' onChange={(e) => setPayment(e.target.value)}>
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
          <input type='number' name='phoneNumber' id='phoneNumber' onBlur={(e) => setNumber(e.target.value)} />
        </div>
        <div className='div-form-products'>
          <label htmlFor='product'>Producto</label>
          <select id='product' name='product' onChange={handleChange}>
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
          <input id='price' name='price' type='number' value={productPrice} onChange={(e) => setPrice(e.target.value)} />

          <label htmlFor='quantity'>Cantidad</label>
          <input id='quantity' type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <div className='div-buttons'>
            <button onClick={handleDetail}>Añadir producto</button>
            <button onClick={handleSubmit}>Crear comanda</button>
          </div>
        </div>
      </form>
      <div className='order-preview'>
        <div className='div-list-data'>
          <ul className='list-data-client'>
            <li>Nombre: {name}</li>
            <li>Forma de pago: {payment}</li>
            <li>Telefono: {number}</li>
          </ul>
        </div>
        <div className='div-list-products'>
          <ul>
            {detail.length > 0 && detail.map((product, i) => (
              <li key={i}>{product.productName} x{product.quantity}  ${product.price} </li>
            ))}
          </ul>
          {detail.length > 0 && <div className='valor-total'>Total: ${valorTotal(detail)}</div>}
        </div>
      </div>
    </div>
  )
}
