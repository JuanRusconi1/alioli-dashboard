import '../styles/login.css'
import { Caveat } from '@next/font/google'

const caveat = Caveat({
  weigth: ['700'],
  preload: false
})

export default function Home () {
  return (
    <>
      <main>
        <section className='section-titleMain'>
          <div className='div-titleMain'>
            <p className={caveat.className}>
              Ali Oli
            </p>
            <span className='p-subtitleMain'>
              Dashboard
            </span>
          </div>
        </section>
        <section className='section-loginForm'>
          <div className='div-form'>
            <p className='p-titleLogin'>
              Iniciar sesión
            </p>
            <form className='form-login'>
              <div className='input-group'>
                <input required type='text' name='text' autocomplete='off' className='input' />
                <label className='user-label'>Nombre</label>
              </div>
              <div className='input-group'>
                <input required type='password' name='text' autocomplete='off' className='input' />
                <label className='user-label'>Contraseña</label>
              </div>
              <button>
                Ingresar
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
