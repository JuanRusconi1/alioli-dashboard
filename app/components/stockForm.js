'use client'
import { useState } from 'react'
import styles from '../../styles/modificarStock.module.css'
import { Toaster, toast } from 'react-hot-toast'

export default function StockForm ({ setFetch }) {
  const [inputName, setName] = useState('')
  const [inputQuantity, setQuantity] = useState('')

  const handleSubmit = () => {
    if (inputName === '') {
      toast.error('Debes ingresar un nombre')
    }
    if (inputQuantity === '') {
      toast.error('Debes ingresar una cantidad')
    }
    if (inputName.length > 0 && inputQuantity.length > 0) {
      const body = {
        name: inputName,
        quantity: inputQuantity
      }

      fetch('http://localhost:3500/api/products/stock/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          toast.success('Fila agregada')
          setTimeout(() => {
            setFetch(true)
          }, 2000)
        }
      })
    }
  }
  return (
    <div className={styles.stockForm}>
      <div className={styles.inputLabelStock}>
        <label htmlFor='name'>Nombre:</label>
        <input className={styles.inputSubmit} type='text' id='name' onChange={(e) => { setName(e.target.value) }} />
      </div>
      <div className={styles.inputLabelStock}>
        <label htmlFor='quantity'>Cantidad:</label>
        <input className={styles.inputSubmit} type='text' id='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
      </div>
      <div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-check'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M5 12l5 5l10 -10'></path>
          </svg>
        </button>
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
