import React, { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { showStatus } from '../utils/statusNotification'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'

const PlaceOrder = () => {
  const navigate = useNavigate()

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  useEffect(() => {
    if (!token) {
      navigate('/login', {
        replace: true,
        state: { from: '/place-order' }
      })
    }
  }, [token, navigate])

  const [method, setMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const inputClass =
    'w-full h-11 sm:h-12 border border-[#d8cabc] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#888] focus:border-black transition'

  const initPay = (order, keyId) => {
    if (!window.Razorpay) {
      showStatus('Razorpay checkout failed to load', 'error')
      setIsSubmitting(false)
      return
    }

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'StyleLoom',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          )

          if (data.success) {
            showStatus('Payment successful', 'success')
            navigate('/orders')
            setCartItems({})
          } else {
            showStatus(data.message, 'error')
          }
        } catch (error) {
          showStatus(error.message, 'error')
        } finally {
          setIsSubmitting(false)
        }
      },
      modal: {
        ondismiss: () => setIsSubmitting(false)
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response) => {
      showStatus(response.error?.description || 'Payment failed. Please try again.', 'error')
      setIsSubmitting(false)
    })
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const orderItems = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find((item) => item._id === productId)

            if (product) {
              const itemInfo = structuredClone(product)
              itemInfo.size = size
              itemInfo.quantity = cartItems[productId][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (orderItems.length === 0) {
        showStatus('Your cart is empty', 'error')
        setIsSubmitting(false)
        return
      }

      if (method === 'cod') {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        )

        if (response.data.success) {
          showStatus('Order placed successfully', 'success')
          setCartItems({})
          navigate('/orders')
        } else {
          showStatus(response.data.message, 'error')
        }
        setIsSubmitting(false)
      }

      if (method === 'razorpay') {
        const responseRazorpay = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { token } }
        )

        if (responseRazorpay.data.success) {
          initPay(responseRazorpay.data.order, responseRazorpay.data.keyId)
        } else {
          showStatus(responseRazorpay.data.message, 'error')
          setIsSubmitting(false)
        }
      }
    } catch (error) {
      console.error(error)
      showStatus(error.message, 'error')
      setIsSubmitting(false)
    }
  }

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>

      <form
        onSubmit={onSubmitHandler}
        className='px-4 sm:px-8 lg:px-14 xl:px-16 py-7 sm:py-10'
      >

        <div className='mb-7'>
          <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-2'>
            Secure Checkout
          </p>

          <h1 className='text-black text-[34px] sm:text-[44px] lg:text-[50px] font-medium tracking-[-0.06em] leading-none'>
            Place Order
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 lg:gap-10 items-start'>

          <section className='border border-[#e8ded4] bg-white'>

            <div className='px-4 sm:px-6 py-5 border-b border-[#e8ded4] bg-[#fbfaf8]'>
              <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
                Delivery Information
              </p>

              <h2 className='text-black text-[25px] sm:text-[30px] font-medium tracking-[-0.045em]'>
                Shipping Address
              </h2>
            </div>

            <div className='p-4 sm:p-6'>
              <div className='grid grid-cols-2 gap-3 sm:gap-4'>

                <input
                  required
                  onChange={onChangeHandler}
                  name='firstName'
                  value={formData.firstName}
                  className={inputClass}
                  type='text'
                  placeholder='First name'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='lastName'
                  value={formData.lastName}
                  className={inputClass}
                  type='text'
                  placeholder='Last name'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='email'
                  value={formData.email}
                  className={`${inputClass} col-span-2`}
                  type='email'
                  placeholder='Email address'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='street'
                  value={formData.street}
                  className={`${inputClass} col-span-2`}
                  type='text'
                  placeholder='Street'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='city'
                  value={formData.city}
                  className={inputClass}
                  type='text'
                  placeholder='City'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='state'
                  value={formData.state}
                  className={inputClass}
                  type='text'
                  placeholder='State'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='zipcode'
                  value={formData.zipcode}
                  className={inputClass}
                  type='number'
                  placeholder='Zipcode'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='country'
                  value={formData.country}
                  className={inputClass}
                  type='text'
                  placeholder='Country'
                />

                <input
                  required
                  onChange={onChangeHandler}
                  name='phone'
                  value={formData.phone}
                  className={`${inputClass} col-span-2`}
                  type='number'
                  placeholder='Phone'
                />

              </div>
            </div>

          </section>

          <aside className='flex flex-col gap-5 lg:sticky lg:top-24'>

            <section className='border border-[#e8ded4] bg-white'>
              <div className='px-4 sm:px-6 py-5 border-b border-[#e8ded4] bg-[#fbfaf8]'>
                <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
                  Order Summary
                </p>

                <h2 className='text-black text-[25px] sm:text-[30px] font-medium tracking-[-0.045em]'>
                  Cart Total
                </h2>
              </div>

              <div className='p-4 sm:p-6'>
                <CartTotal />
              </div>
            </section>

            <section className='border border-[#e8ded4] bg-white'>
              <div className='px-4 sm:px-6 py-5 border-b border-[#e8ded4] bg-[#fbfaf8]'>
                <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
                  Payment Method
                </p>

                <h2 className='text-black text-[25px] sm:text-[30px] font-medium tracking-[-0.045em]'>
                  Choose Payment
                </h2>
              </div>

              <div className='p-4 sm:p-6 flex flex-col gap-3'>

                <button
                  type='button'
                  onClick={() => setMethod('razorpay')}
                  className={
                    method === 'razorpay'
                      ? 'w-full h-14 px-4 border border-black bg-[#fbfaf8] flex items-center justify-between transition'
                      : 'w-full h-14 px-4 border border-[#d8cabc] bg-white flex items-center justify-between hover:border-black transition'
                  }
                >
                  <span className='flex items-center gap-3'>
                    <span className='w-4 h-4 rounded-full border border-black flex items-center justify-center'>
                      {method === 'razorpay' && <span className='w-2 h-2 rounded-full bg-black'></span>}
                    </span>

                    <img
                      src={assets.razorpay_logo}
                      alt='Razorpay'
                      className='h-5 object-contain'
                    />
                  </span>

                  <span className='text-[#666] text-[12px]'>
                    Online
                  </span>
                </button>

                {method === 'razorpay' && (
                  <div
                    role='note'
                    className='border border-[#d8cabc] bg-[#fbfaf8] p-3 flex items-start gap-3 text-[12px] leading-[1.6] text-[#666]'
                  >
                    <Info size={16} strokeWidth={1.5} className='flex-shrink-0 mt-0.5 text-[#8c7a6b]' />
                    <p>
                      <span className='block text-black font-medium mb-0.5'>Test payment only</span>
                      Use card <span className='text-black font-medium whitespace-nowrap'>4100 2800 0000 1007</span>, any future expiry date, and any 3-digit CVV. No real money will be charged.
                    </p>
                  </div>
                )}

                <button
                  type='button'
                  onClick={() => setMethod('cod')}
                  className={
                    method === 'cod'
                      ? 'w-full h-14 px-4 border border-black bg-[#fbfaf8] flex items-center justify-between transition'
                      : 'w-full h-14 px-4 border border-[#d8cabc] bg-white flex items-center justify-between hover:border-black transition'
                  }
                >
                  <span className='flex items-center gap-3'>
                    <span className='w-4 h-4 rounded-full border border-black flex items-center justify-center'>
                      {method === 'cod' && <span className='w-2 h-2 rounded-full bg-black'></span>}
                    </span>

                    <span className='h-7 px-3 border border-[#d8cabc] bg-white flex items-center text-black text-[13px] font-medium tracking-[0.08em]'>
                      COD
                    </span>

                    <span className='text-black text-[14px]'>
                      Cash on Delivery
                    </span>
                  </span>

                  <span className='text-[#666] text-[12px]'>
                    Later
                  </span>
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-3 w-full h-12 bg-black text-white text-[13px] tracking-[0.12em] uppercase flex items-center justify-center gap-3 hover:opacity-90 active:opacity-80 disabled:opacity-55 disabled:cursor-not-allowed transition'
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                  <ArrowRight size={16} strokeWidth={1.6} />
                </button>

              </div>
            </section>

          </aside>

        </div>

      </form>

    </main>
  )
}

export default PlaceOrder
