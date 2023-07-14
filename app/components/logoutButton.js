'use client'
import '../../styles/navBar.css'
import { useRouter } from 'next/navigation'

export default function LogoutButton () {
  const router = useRouter()
  async function handleLogout () {
    const logout = await fetch('/api/auth/logout').then((res) => res.json())
    if (logout.ok) {
      router.push('/')
    }
  }
  return (
    <button className='logout-button' onClick={handleLogout}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        class='icon icon-tabler icon-tabler-logout-2'
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
        <path d='M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2'></path>
        <path d='M15 12h-12l3 -3'></path>
        <path d='M6 15l-3 -3'></path>
      </svg>
      Salir
    </button>
  )
}
