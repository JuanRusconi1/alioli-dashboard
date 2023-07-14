'use client'
import styles from '../../styles/modificarStock.module.css'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

export default function StockRow (props) {
  const [edit, setEdit] = useState(false)
  const { setFetch } = props
  return (
    <>
      {edit ? <StockUpdateForm {...props} changeForm={setEdit} setFetch={setFetch} /> : <StockRowContent {...props} changeForm={setEdit} setFetch={setFetch} />}
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
    </>
  )
}

const StockRowContent = ({ id, name, quantity, changeForm, setFetch }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3500/api/products/stock/delete/${id}`)
      .then(res => {
        if (res.ok) {
          toast.success('Fila eliminada')
          setFetch(true)
        }
      })
  }
  return (
    <div className={styles.stockRow}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{name}</div>
        <div className={styles.title}>{quantity}</div>
      </div>
      <div className={styles.stockButtons}>
        <button className={styles.deleteButton} onClick={handleDelete}>
        <svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-trash' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M4 7l16 0'></path>
          <path d='M10 11l0 6'></path>
          <path d='M14 11l0 6'></path>
          <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12'></path>
          <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3'></path>
        </svg>
        </button>
        <button className={styles.updateButton} onClick={() => { changeForm(true) }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-edit'
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
            <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1'></path>
            <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z'></path>
            <path d='M16 5l3 3'></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

const StockUpdateForm = ({ id, name, quantity, changeForm, setFetch }) => {
  const [inputName, setName] = useState(name)
  const [inputQuantity, setQuantity] = useState(quantity)

  const handleUpdate = () => {
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
      fetch(`http://localhost:3500/api/products/stock/update/${id}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          toast.success('Fila modificada')
          changeForm(false)
          setFetch(true)
        }
      })
    }
  }
  return (
    <div className={styles.stockRow}>
      <div className={styles.titleRow}>
        <input className={styles.inputStock} type='text' name='name' value={inputName} onChange={(e) => { setName(e.target.value) }} />
        <input className={styles.inputStock} type='text' name='quantity' value={inputQuantity} onChange={(e) => { setQuantity(e.target.value) }} />
      </div>
      <div className={styles.stockButtons}>
        <button className={styles.deleteButton} onClick={() => { changeForm(false) }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-x'
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
            <path d='M18 6l-12 12'></path>
            <path d='M6 6l12 12'></path>
          </svg>
        </button>
        <button className={styles.submitButton} onClick={handleUpdate}>
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
    </div>
  )
}
