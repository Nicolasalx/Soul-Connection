'use client'

import { Divider } from 'antd'
import { FormEvent } from 'react'

export default function Login() {
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
    <div className='flex flex-col md:mr-[25%] justify-center p-14'>
        <form className='bg-white rounded flex flex-col items-center p-14 shadow-lg' onSubmit={handleSubmit}>
            <h1 className='m-6 text-5xl md:text-6xl'>
                Login
                <Divider style={{ borderColor: '#d3d3d3' }} />
            </h1>
            <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="email" name="email" aria-label="email" placeholder="Email" required />
            <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="password" name="password" aria-label="password" placeholder="Password" required />
            <button className='btn btn-primary text-white m-6' type="submit">Login</button>
        </form>
    </div>
  )
}
