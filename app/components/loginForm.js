'use client'
import styles from '../../styles/login.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

export default function LoginForm () {
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  async function handleSubmit (e) {
    e.preventDefault()
    if (name === '') {
      toast.error('Debes ingresar un nombre')
    }
    if (password === '') {
      toast.error('Debes ingresar una contraseña')
    }
    if (name.length > 0 && password.length > 0) {
      const user = { name: name, password: password }
      const data = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      if (data.ok) {
        router.push('/principal')
      } else {
        toast.error('El usuario o contraseña son incorrectos, intentelo de nuevo')
      }
    }
  }

  return (
    <form className={styles.formLogin}>
      <div className={styles.inputGroup}>
        <input
          type='text'
          name='text'
          autocomplete='off'
          className={styles.input}
          required
          onBlur={(e) => setName(e.target.value)}
        />
        <label className={styles.userLabel}>Nombre</label>
      </div>
      <div className={styles.inputGroup}>
        <input
          type='password'
          name='text'
          autocomplete='off'
          className={styles.input}
          required
          onBlur={(e) => setPassword(e.target.value)}
        />
        <label className={styles.userLabel}>Contraseña</label>
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Ingresar
      </button>
      <Toaster
        position='bottom-right'
        toastOptions={{
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
    </form>
  )
}
