import styles from '../styles/login.module.css'
import { Caveat } from '@next/font/google'

import LoginForm from './components/loginForm'
const caveat = Caveat({
  weigth: ['700'],
  preload: false
})

export default function Login () {
  return (
    <main className={styles.main}>
      <section>
        <div className={styles.divTitleMain}>
          <p className={caveat.className}>
            Ali Oli
          </p>
          <span className={styles.pSubtitleMain}>
            Dashboard
          </span>
        </div>
      </section>
      <section>
        <div className={styles.divForm}>
          <p className={styles.pTitleLogin}>
            Iniciar sesión
          </p>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
