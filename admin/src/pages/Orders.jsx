import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { RefreshCcw, PackageCheck, ClipboardList } from 'lucide-react'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success('Order status updated')
        await fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const getStatusClass = (status) => {
    const statusText = status?.toLowerCase() || ''

    if (statusText.includes('delivered')) {
      return 'bg-green-50 text-green-700 border-green-200'
    }

    if (statusText.includes('out')) {
      return 'bg-blue-50 text-blue-700 border-blue-200'
    }

    if (statusText.includes('ship')) {
      return 'bg-purple-50 text-purple-700 border-purple-200'
    }

    if (statusText.includes('packing')) {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }

    return 'bg-[#fbfaf8] text-[#8c7a6b] border-[#d8cabc]'
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <section className='w-full'>

      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6'>
        <div>
          <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
            Fulfilment
          </p>

          <h1 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.05em] leading-none'>
            Orders
          </h1>
        </div>

        <button
          onClick={fetchAllOrders}
          className='w-fit h-10 px-4 border border-[#d8cabc] bg-white text-black text-[13px] flex items-center gap-2 hover:border-black transition'
        >
          <RefreshCcw size={14} strokeWidth={1.6} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className='min-h-[260px] border border-[#e8ded4] bg-[#fbfaf8] flex items-center justify-center'>
          <p className='text-[#666] text-[14px]'>
            Loading orders...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className='min-h-[320px] border border-[#e8ded4] bg-[#fbfaf8] flex items-center justify-center px-5'>
          <div className='text-center'>
            <div className='w-14 h-14 border border-[#d8cabc] bg-white flex items-center justify-center mx-auto mb-4'>
              <ClipboardList size={24} strokeWidth={1.5} className='text-[#8c7a6b]' />
            </div>

            <h2 className='text-black text-[24px] font-medium tracking-[-0.04em]'>
              No orders yet
            </h2>

            <p className='mt-2 text-[#666] text-[14px]'>
              Customer orders will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>

          {orders.map((order) => (
            <div
              key={order._id}
              className='border border-[#e8ded4] bg-white p-4 sm:p-5 lg:p-6'
            >

              <div className='grid grid-cols-1 lg:grid-cols-[54px_1.5fr_1fr_120px_190px] gap-5 lg:gap-6 items-start'>

                <div className='hidden lg:flex w-12 h-12 border border-[#e8ded4] bg-[#fbfaf8] items-center justify-center'>
                  <img
                    className='w-7 h-7 object-contain'
                    src={assets.parcel_icon}
                    alt='Parcel'
                  />
                </div>

                <div className='min-w-0'>
                  <div className='flex items-start gap-3 lg:hidden mb-4'>
                    <div className='w-12 h-12 border border-[#e8ded4] bg-[#fbfaf8] flex items-center justify-center flex-shrink-0'>
                      <img
                        className='w-7 h-7 object-contain'
                        src={assets.parcel_icon}
                        alt='Parcel'
                      />
                    </div>

                    <div className='min-w-0'>
                      <p className='text-black text-[15px] font-medium'>
                        Order #{order._id?.slice(-6)}
                      </p>
                      <p className='text-[#777] text-[12px] break-all'>
                        {order._id}
                      </p>
                    </div>
                  </div>

                  <p className='text-black text-[14px] font-medium mb-3'>
                    Items
                  </p>

                  <div className='space-y-1'>
                    {order.items.map((item, idx) => (
                      <p
                        className='text-[#555] text-[13px] leading-[1.6]'
                        key={idx}
                      >
                        {item.name} × {item.quantity}
                        <span className='text-[#888]'> · Size: {item.size}</span>
                      </p>
                    ))}
                  </div>

                  <div className='mt-4 pt-4 border-t border-[#e8ded4]'>
                    <p className='text-black text-[14px] font-medium'>
                      {order.address.firstName + ' ' + order.address.lastName}
                    </p>

                    <p className='mt-2 text-[#666] text-[13px] leading-[1.7]'>
                      {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                    </p>

                    <p className='mt-1 text-[#666] text-[13px]'>
                      {order.address.phone}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3 lg:gap-2 text-[13px]'>
                  <div>
                    <p className='text-[#999]'>Items</p>
                    <p className='text-black mt-1'>{order.items.length}</p>
                  </div>

                  <div>
                    <p className='text-[#999]'>Method</p>
                    <p className='text-black mt-1'>{order.paymentMethod}</p>
                  </div>

                  <div>
                    <p className='text-[#999]'>Payment</p>
                    <p className='text-black mt-1'>{order.payment ? 'Paid' : 'Pending'}</p>
                  </div>

                  <div>
                    <p className='text-[#999]'>Date</p>
                    <p className='text-black mt-1'>{new Date(order.date).toLocaleDateString()}</p>
                  </div>

                  <p className='hidden lg:block text-[#777] text-[12px] break-all mt-2'>
                    ID: {order._id}
                  </p>
                </div>

                <div>
                  <p className='text-[#999] text-[12px] mb-1 lg:hidden'>
                    Amount
                  </p>

                  <p className='text-black text-[18px] lg:text-[16px] font-medium'>
                    {currency}{order.amount}
                  </p>
                </div>

                <div className='w-full'>
                  <span className={`mb-3 h-8 px-3 border text-[12px] inline-flex items-center gap-2 ${getStatusClass(order.status)}`}>
                    <span className='w-2 h-2 rounded-full bg-current'></span>
                    {order.status}
                  </span>

                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className='w-full h-11 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-black text-[13px] font-medium outline-none focus:border-black transition'
                  >
                    <option value='Order Placed'>Order Placed</option>
                    <option value='Packing'>Packing</option>
                    <option value='Shipped'>Ready to Ship</option>
                    <option value='Out for delivery'>Out for delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>

                  <div className='mt-3 flex items-center gap-2 text-[#777] text-[12px]'>
                    <PackageCheck size={14} strokeWidth={1.5} />
                    Update fulfilment status
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  )
}

export default Orders
