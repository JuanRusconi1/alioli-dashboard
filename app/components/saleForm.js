'use client'
import styles from '../../styles/comandasCreate.module.css'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
const valorTotal = (productos) => {
  return productos.reduce((acum, product) => acum += product.price * product.quantity, 0)
}

export default function SaleForm ({ data, request, oldData }) {
  const detailRef = useRef(oldData ? oldData.orderitem : [])
  const detail = detailRef.current
  const [render, setRender] = useState(false)
  const [product, setProduct] = useState(data[0].name)
  const [quantity, setQuantity] = useState(1)
  const [productPrice, setPrice] = useState(data[0].price)
  const [name, setName] = useState(oldData ? oldData.buyerName : null)
  const [number, setNumber] = useState(oldData ? oldData.phoneNumber : null)
  const [payment, setPayment] = useState(oldData ? oldData.paymentType : 'Efectivo')
  const [category, setCategory] = useState(data[0].categories.name)
  const [showVariety, setVariety] = useState(false)
  const formRef = useRef(null)

  const router = useRouter()
  const paymentTypes = [
    'Efectivo',
    'Transferencia',
    'Tarjeta'
  ]
  const empanadas = () => {
    const empanadas = data.filter(product => product.categoryId === 6 && product.id !== 42  && !product.name.toLowerCase().includes('champiñones') && !product.name.toLowerCase().includes('media docena'))
    return empanadas
  }
  const handleChange = (e) => {
    const productToFind = data.find(product => product.id === parseInt(e.target.value))
    setProduct(productToFind.name)
    setPrice(productToFind.price)
    setCategory(productToFind.categories.name)

    if (productToFind.id === 42 || productToFind.name.toLowerCase() === 'docena de empanadas') {
      return setVariety(true)
    } else setVariety(false)
    if (productToFind.name.toLowerCase() === 'media docena de empanadas') {
      return setVariety(true)
    } else setVariety(false)
  }

  const handleRemoveDetail = (i) => {
    detail.splice(i, 1)
    setRender(!render)
  }
  const addDocenaToDetail = () => {
    const form = formRef.current
    let quantityEmpanadas = 12
    if (product.toLowerCase() === 'docena de empanadas' || product.toLowerCase() === 'media docena de empanadas') {
      const empasDetail = []
      product.toLowerCase() === 'media docena de empanadas' ? quantityEmpanadas = 6 : quantityEmpanadas = 12
      let sumDocena = 0
      for (let i = 0; i < form.length; i++) {
        if (form[i].name.toLowerCase().includes('empanada') && form[i].value > 0) {
          empasDetail.push({ name: form[i].name, quantity: parseInt(form[i].value) })
          sumDocena += parseInt(form[i].value)
        }
      }
      if (sumDocena === quantity * quantityEmpanadas) {
        detail.push({
          productName: product,
          productCategory: category,
          price: productPrice,
          quantity: quantity,
          docena: empasDetail
        })
        setRender(!render)
        return true
      } else {
        const residuo = (quantity * quantityEmpanadas) - sumDocena
        toast.error(`${residuo > 0 ? `Te faltan ${residuo}` : `Te sobran ${Math.abs(residuo)}`} empanada/s para completar ${quantity > 1 ? 'la docena' : 'las docenas'}`)
      }
      return false
    }
    return false
  }
  const handleDetail = (e) => {
    e.preventDefault()
    if (product.toLowerCase() === 'docena de empanadas' || product.toLowerCase() === 'media docena de empanadas') addDocenaToDetail()
    else {
      if (detail.length) {
        let index = -1
        for (let i = 0; i < detail.length; i++) {
          if (detail[i].productName === product) {
            index = i
          }
        }
        if (index >= 0) {
          detail[index].quantity += quantity
          setRender(!render)
        } else {
          detail.push({
            productName: product,
            productCategory: category,
            price: productPrice,
            quantity: quantity
          })
          setRender(!render)
        }
      } else {
        detail.push({
          productName: product,
          productCategory: category,
          price: productPrice,
          quantity: quantity
        })
        setRender(!render)
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('Debes ingresar un nombre')
    }
    if (detail.length === 0) {
      toast.error('La comanda debe tener mínimo un producto')
    }
    if (name && name.length > 0 && detail.length > 0) {
      const formData = {
        orderitem: detail,
        buyerName: name,
        phoneNumber: number,
        paymentType: payment,
        total: valorTotal(detail)
      }
      fetch(request, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(res => {
          if (res.ok) {
            toast.success('Comanda cargada correctamente')
            setTimeout(() => {
              router.push(`/comandas/detalle/${res.order.id}`)
              detail.splice(0, detail.length)
            }, 1000)
          } else {
            toast.error('Ocurrio un error, Reinicie la pagina')
          }
        })
    }
  }

  return (
    <div className={styles.contendorForm}>
      <form className={styles.saleForm} ref={formRef}>
        <div className={styles.divFormClient}>
          <label htmlFor='name'>Nombre del cliente</label>
          <input className={styles.divFormClientInput} type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />

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
          <input className={styles.divFormClientInput} type='number' name='phoneNumber' id='phoneNumber' value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className={styles.divFormProducts}>
          <label htmlFor='product'>Producto</label>
          <select className={styles.select} id='product' name='product' onChange={handleChange}>
            {data.map(product => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
          {showVariety && <div className={styles.divVariety}>
            <ul>
              {empanadas().map((empa, i) => (
                <li className={styles.liInput} key={i}>
                  <input className={styles.inputEmpanada} id={empa.id} type='number' name={empa.name} />
                  <p>x {empa.name}</p>
                </li>
              ))}
            </ul>
          </div>}

          <label htmlFor='price'>Precio</label>
          <input className={styles.divFormProductsInput} id='price' name='price' type='number' value={productPrice} onChange={(e) => setPrice(e.target.value)} />

          <label htmlFor='quantity'>Cantidad</label>
          <input className={styles.divFormProductsInput} id='quantity' type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
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
        <div className={styles.orderPreviewProductList}>
          <ul className={styles.ul}>
            {detail && detail.map((product, i) => (
              <li key={i} className={styles.liProductOrderPreview}>
                <div key={i}><button className={styles.buttonRemove} onClick={() => handleRemoveDetail(i)}>X</button> {product.productName} x{product.quantity} ${product.price}</div>
                {
                product.docena &&
                  <div>
                    {product.docena.map((empanada, i) => (
                      <p className={styles.pEmpanada} key={i}>{empanada.name} x{empanada.quantity}</p>
                    ))}
                  </div>
                }
              </li>
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
          }
        }}
      />
    </div>

  )
}
