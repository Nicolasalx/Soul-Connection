'use client'

import { FormEvent } from 'react'

function Login() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const response = await fetch('/api/employees/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
            window.location.reload()
        } else {
            console.error(`code ${response.status}: ${response.statusText}`)
        }

    } catch(err) {
        console.error(err)
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

export default Login
