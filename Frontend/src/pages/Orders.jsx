import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import {
  RefreshCcw,
  ShoppingBag,
  ArrowRight
} from 'lucide-react'

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  const getImageUrl = (item) => {
    const img = item?.images?.[0]
    return img?.url || img
  }

  const getStatusClass = (status) => {
    const statusText = status?.toLowerCase() || ''

    if (statusText.includes('delivered')) {
      return 'bg-green-50 text-green-700 border-green-200'
    }

    if (statusText.includes('cancel')) {
      return 'bg-red-50 text-red-700 border-red-200'
    }

    if (statusText.includes('out')) {
      return 'bg-blue-50 text-blue-700 border-blue-200'
    }

    return 'bg-[#fbfaf8] text-[#8c7a6b] border-[#d8cabc]'
  }

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false)
        return
      }

      setLoading(true)

      const response = await axios.post(
        `${backendUrl}/api/order/userOrders`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrderItems = []

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id
            })
          })
        })

        setOrderData(allOrderItems.reverse())
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const goToCollection = () => {
    navigate('/collection')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-8 sm:py-11'>

        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-2'>
              Account
            </p>

            <h1 className='text-black text-[34px] sm:text-[44px] lg:text-[52px] font-medium tracking-[-0.06em] leading-none'>
              My Orders
            </h1>
          </div>

          <button
            onClick={loadOrderData}
            className='h-11 px-5 border border-[#d8cabc] text-black text-[14px] flex items-center gap-2 w-fit hover:border-black transition'
          >
            <RefreshCcw size={15} strokeWidth={1.6} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className='min-h-[320px] flex items-center justify-center border border-[#e8ded4] bg-[#fbfaf8]'>
            <p className='text-[#666] text-[15px]'>
              Loading your orders...
            </p>
          </div>
        ) : orderData.length === 0 ? (
          <div className='min-h-[380px] flex items-center justify-center border border-[#e8ded4] bg-[#fbfaf8]'>
            <div className='text-center px-5'>
              <div className='w-16 h-16 rounded-full border border-[#d8cabc] flex items-center justify-center mx-auto mb-5 bg-white'>
                <ShoppingBag size={28} strokeWidth={1.4} className='text-[#8c7a6b]' />
              </div>

              <h2 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.04em]'>
                No orders yet
              </h2>

              <p className='mt-3 text-[#666] text-[15px] leading-[1.7] max-w-[420px] mx-auto'>
                You haven’t placed any orders yet. Explore the collection and start shopping.
              </p>

              <button
                onClick={goToCollection}
                className='mt-7 h-12 px-7 bg-black text-white text-[14px] flex items-center gap-3 mx-auto hover:opacity-90 transition'
              >
                Shop Collection
                <ArrowRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>

            {orderData.map((item, index) => (
              <div
                key={index}
                className='border border-[#e8ded4] bg-white p-4 sm:p-5'
              >

                <div className='grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-5 lg:gap-8 items-center'>

                  <div className='flex items-start gap-4 sm:gap-5'>
                    <div className='w-[86px] h-[110px] sm:w-[104px] sm:h-[132px] bg-[#f7f4ef] border border-[#e8ded4] overflow-hidden flex-shrink-0'>
                      <img
                        src={getImageUrl(item)}
                        alt={item.name}
                        className='w-full h-full object-cover object-top'
                      />
                    </div>

                    <div className='min-w-0'>
                      <p className='text-black text-[16px] sm:text-[18px] font-normal leading-snug capitalize line-clamp-2'>
                        {item.name}
                      </p>

                      <p className='mt-2 text-[#777] text-[12px] sm:text-[13px] break-all'>
                        Order ID: {item.orderId}
                      </p>

                      <div className='mt-3 flex flex-wrap items-center gap-2 sm:gap-3'>
                        <span className='text-black text-[14px]'>
                          {currency}{item.price}
                        </span>

                        <span className='h-8 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-black text-[13px] flex items-center'>
                          Qty: {item.quantity}
                        </span>

                        <span className='h-8 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-black text-[13px] flex items-center'>
                          Size: {item.size}
                        </span>
                      </div>

                      <div className='mt-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[13px] text-[#666]'>
                        <p>
                          Date: <span className='text-black'>{new Date(item.date).toDateString()}</span>
                        </p>

                        <p>
                          Payment: <span className='text-black'>{item.paymentMethod}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex lg:justify-end'>
                    <span className={`h-9 px-4 border text-[13px] flex items-center gap-2 w-fit ${getStatusClass(item.status)}`}>
                      <span className='w-2 h-2 rounded-full bg-current'></span>
                      {item.status}
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  )
}

export default Orders
