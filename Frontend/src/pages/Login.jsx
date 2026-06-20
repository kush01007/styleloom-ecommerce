import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { showStatus } from '../utils/statusNotification'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')

  const { token, setToken, navigate, backendUrl, cartItems, setCartItems } = useContext(ShopContext)
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLogin = currentState === 'Login'

  const completeAuthentication = async (authToken, successMessage) => {
    const syncResponse = await axios.post(
      `${backendUrl}/api/cart/sync`,
      { cartData: cartItems },
      { headers: { token: authToken } }
    )

    if (!syncResponse.data.success) {
      throw new Error(syncResponse.data.message || 'Could not sync your cart')
    }

    setCartItems(syncResponse.data.cartData)
    localStorage.setItem('token', authToken)
    setToken(authToken)
    showStatus(successMessage, 'success')
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password
        })

        if (response.data.success) {
          await completeAuthentication(response.data.token, 'Account created successfully')
        } else {
          showStatus(response.data.message, 'error')
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        })

        if (response.data.success) {
          await completeAuthentication(response.data.token, 'Signed in successfully')
        } else {
          showStatus(response.data.message, 'error')
        }
      }
    } catch (error) {
      console.log(error)
      showStatus(error.message, 'error')
    }
  }

  useEffect(() => {
    if (token) {
      navigate(redirectTo, { replace: true })
    }
  }, [token, navigate, redirectTo])

  const inputClass =
    'w-full h-11 sm:h-12 border border-[#d8cabc] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#888] focus:border-black transition'

  return (
    <main className='w-full min-h-[calc(100vh-90px)] bg-white border-t border-[#e8ded4]'>

      <section className='px-5 sm:px-8 lg:px-14 xl:px-16 py-9 sm:py-14'>

        <div className='max-w-[400px] mx-auto'>

          <div className='text-center mb-6 sm:mb-8'>
            <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3'>
              StyleLoom Account
            </p>

            <h1 className='text-black text-[34px] sm:text-[44px] font-medium tracking-[-0.06em] leading-none'>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h1>

            <p className='mt-4 text-[#666] text-[14px] leading-[1.7]'>
              {isLogin
                ? 'Welcome back. Sign in to continue shopping.'
                : 'Create your account for a faster checkout experience.'}
            </p>
          </div>

          <form
            onSubmit={onSubmitHandler}
            className='border border-[#e8ded4] bg-[#fbfaf8] p-4 sm:p-6'
          >

            <div className='flex flex-col gap-4'>

              {!isLogin && (
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  className={inputClass}
                  placeholder='Full name'
                  required
                />
              )}

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                className={inputClass}
                placeholder='Email address'
                required
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                className={inputClass}
                placeholder='Password'
                required
              />

            </div>

            <div className={`mt-4 flex items-center gap-4 text-[13px] ${isLogin ? 'justify-between' : 'justify-end'}`}>
              {isLogin && (
                <button
                  type='button'
                  className='text-[#666] hover:text-black transition'
                >
                  Forgot password?
                </button>
              )}

              {isLogin ? (
                <button
                  type='button'
                  onClick={() => setCurrentState('Sign Up')}
                  className='text-[#666] hover:text-black transition'
                >
                  <span className='text-black border-b border-black pb-[2px]'>Create account</span>
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => setCurrentState('Login')}
                  className='text-[#666] hover:text-black transition'
                >
                <span className='text-black border-b border-black pb-[2px]'>Already have an account?</span>
                </button>
              )}
            </div>

            <button
              type='submit'
              className='mt-6 sm:mt-7 w-full h-11 sm:h-12 bg-black text-white text-[12px] sm:text-[13px] tracking-[0.12em] uppercase hover:opacity-90 active:opacity-80 transition'
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

          </form>

        </div>

      </section>

    </main>
  )
}

export default Login
