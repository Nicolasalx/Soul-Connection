'use client'

import { Button, CircularProgress } from '@nextui-org/react'
import { Divider } from 'antd'
import { FormEvent, useState } from 'react'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    setIsLoading(true)
    try {
      const response = await fetch('/api/employees/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setIsLoading(false)

      if (response.ok) {
        window.location.reload()
      } else {
        console.error(`code ${response.status}: ${response.statusText} ${await response.text()}`)
      }
    } catch(err) {
      setIsLoading(false)
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col h-full w-[500px] justify-center p-14">
      <form className='bg-white border border-gray-300 flex flex-col items-center p-14 rounded-lg shadow-lg' onSubmit={handleSubmit}>
        <h1 className='m-6 text-5xl md:text-6xl'>
          Login
          <Divider style={{ borderColor: '#d3d3d3' }} />
        </h1>
        <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="email" name="email" aria-label="email" placeholder="Email" required />
        <input className='bg-gray-200 p-2 shadow-inner rounded m-2' type="password" name="password" aria-label="password" placeholder="Password" required />
        <Button color='primary' className='rounded-full m-6 text-lg font-bold' type="submit">
          {isLoading ? <CircularProgress size='sm' aria-label='Loading...' /> : 'Login'}
        </Button>
      </form>
    </div>
  )
}
