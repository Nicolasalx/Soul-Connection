'use client'

import If from '@/components/If'
import { Button, CircularProgress } from '@nextui-org/react'
import { Divider } from 'antd'
import { FormEvent, useState } from 'react'

export default function Login() {
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisteredLoading, setIsRegisteredLoading] = useState(false)
  const [isEmployee, setIsEmployee] = useState(true) // employee by default
  const [loginError, setLoginError] = useState<string | null>(null)
  const [registerError, setRegisterError] = useState<string | null>(null)

  async function handleSubmitEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError(null)
    setIsLoginLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await fetch('/api/employees/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsLoginLoading(false)
        window.location.reload()
      } else {
        setLoginError('Wrong email or password.')
        console.error(`code ${response.status}: ${response.statusText} ${await response.text()}`)
      }
    } catch(err) {
      setLoginError('Internal error, try again later.')
      console.error(err)
    } finally {
      setIsLoginLoading(false)
    }
  }

  async function handleSubmitCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError(null)
    setIsLoginLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsLoginLoading(false)
        window.location.reload()
      } else {
        setLoginError('Wrong email or password.')
        console.error(`code ${response.status}: ${response.statusText} ${await response.text()}`)
      }
    } catch(err) {
      setLoginError('Internal error, try again later.')
      console.error(err)
    } finally {
      setIsLoginLoading(false)
    }
  }

  async function handleRegisterCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setRegisterError(null)
    setIsRegisteredLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const confirm_password = formData.get('confirm-password')

    if (password !== confirm_password) {
      setRegisterError("Passwords don't match.")
      return
    }
    try {
      const response = await fetch('/api/customers/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsRegisteredLoading(false)
        window.location.reload()
      } else {
        if (response.status === 409) {
          setRegisterError('This email already registered a password.')
        } else {
          setRegisterError('Email unknown, contact our employees to create one and set a password here.')
        }
        console.error(`code ${response.status}: ${response.statusText} ${await response.text()}`)
      }
    } catch(err) {
      setRegisterError('Internal error, try again later.')
      console.error(err)
    } finally {
      setIsRegisteredLoading(false)
    }
  }

  return (
    <>
    <div className="flex flex-col md:flex-row gap-4 h-full w-[500px] justify-center p-14">
      <form className='bg-white border border-color flex flex-col items-center p-14 rounded-[2px]' onSubmit={isEmployee ? handleSubmitEmployee : handleSubmitCustomer}>
        <h1 className='text-gray-600 text-foreground text-center m-6 text-5xl md:text-6xl'>
          {isEmployee ? "Employee Login" : "Customer Login"}
          <Divider className='border-color' />
        </h1>
        {loginError && <div className='text-red-500'>{loginError}</div>}
        <input className='bg-primary-50 placeholder-secondary-foreground/50 p-2 shadow-inner rounded m-2' type="email" name="email" aria-label="email" placeholder="Email" required />
        <input className='bg-primary-50 placeholder-secondary-foreground/50 p-2 shadow-inner rounded m-2' type="password" name="password" aria-label="password" placeholder="Password" required />
        <Button color='primary' className='rounded-full m-6 text-lg font-bold' type="submit" disabled={isLoginLoading}>
          {isLoginLoading ? <CircularProgress size='sm' aria-label='Loading...' /> : 'Login'}
        </Button>
      </form>
      <If condition={!isEmployee}>
        <form className='bg-white border border-color flex flex-col items-center p-14 rounded-[2px]' onSubmit={handleRegisterCustomer}>
          <h1 className='text-gray-600 text-foreground text-center m-6 text-5xl md:text-6xl'>
            Register Password
            <Divider className='border-color' />
          </h1>
          {registerError && <div className='text-red-500'>{registerError}</div>}
          <input className='bg-primary-50 placeholder-secondary-foreground/50 p-2 shadow-inner rounded m-2' type="email" name="email" aria-label="email" placeholder="Email" required />
          <input className='bg-primary-50 placeholder-secondary-foreground/50 p-2 shadow-inner rounded m-2' type="password" name="password" aria-label="password" placeholder="Password" required />
          <input className='bg-primary-50 placeholder-secondary-foreground/50 p-2 shadow-inner rounded m-2' type="password" name="confirm-password" aria-label="confirm password" placeholder="Confirm Password" required />
          <Button color='primary' className='rounded-full m-6 text-lg font-bold' type="submit" disabled={isRegisteredLoading}>
            {isRegisteredLoading ? <CircularProgress size='sm' aria-label='Loading...' /> : 'Register'}
          </Button>
        </form>
      </If>
    </div>
    <div className="fixed bottom-4 right-4 md:right-auto mt-4 text-center">
      <p className="text-lg text-blue-500 underline cursor-pointer" onClick={() => setIsEmployee(!isEmployee)}>
        {isEmployee ? "I'm a customer" : "I'm an employee"}
      </p>
    </div>
    </>
  )
}
