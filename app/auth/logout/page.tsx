'use client'

import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to log out')
      }
      const data = await response.json()
      console.log(data)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  )
}
