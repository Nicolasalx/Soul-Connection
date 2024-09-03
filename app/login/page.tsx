'use client'

import { redirect } from 'next/navigation'
import { FormEvent } from 'react'

export default function Login() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const response = await fetch('https://soul-connection.fr/api/employees/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            redirect('/dashboard')
        } else {
            alert(response.text)
        }
    } catch(err) {
        alert(err)
    }
  }

  return (
    <div className='flex justify-center m-12 mt-48'>
        <form className='bg-white rounded flex flex-col items-center p-4 shadow-lg' onSubmit={handleSubmit}>
            <h1 className='m-6'>Login</h1>
            <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="email" name="email" aria-label="email" placeholder="Email" required />
            <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="password" name="password" aria-label="password" placeholder="Password" required />
            <button className='btn btn-primary m-6' type="submit">Login</button>
        </form>
    </div>
  )
}
