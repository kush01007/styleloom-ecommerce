import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Trash2, RefreshCcw, PackageSearch } from 'lucide-react'

const List = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`${backendUrl}/api/product/list`)

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        toast.error('Authentication token not found')
        return
      }

      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <section className='w-full'>

      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6'>
        <div>
          <p className='text-[#9b8977] text-[10px] tracking-[0.24em] uppercase mb-2'>
            Catalog
          </p>

          <h1 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.05em] leading-none'>
            All Products
          </h1>
        </div>

        <button
          onClick={fetchList}
          className='w-fit h-10 px-4 border border-[#d8cabc] bg-white text-black text-[13px] flex items-center gap-2 hover:border-black transition'
        >
          <RefreshCcw size={14} strokeWidth={1.6} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className='min-h-[240px] border border-[#e8ded4] bg-[#fbfaf8] flex items-center justify-center'>
          <p className='text-[#666] text-[14px]'>
            Loading products...
          </p>
        </div>
      ) : list.length === 0 ? (
        <div className='min-h-[300px] border border-[#e8ded4] bg-[#fbfaf8] flex items-center justify-center px-5'>
          <div className='text-center'>
            <div className='w-14 h-14 border border-[#d8cabc] bg-white flex items-center justify-center mx-auto mb-4'>
              <PackageSearch size={24} strokeWidth={1.5} className='text-[#8c7a6b]' />
            </div>

            <h2 className='text-black text-[24px] font-medium tracking-[-0.04em]'>
              No products found
            </h2>

            <p className='mt-2 text-[#666] text-[14px]'>
              Add a product to see it listed here.
            </p>
          </div>
        </div>
      ) : (
        <div className='w-full'>

          {/* Desktop table header */}
          <div className='hidden lg:grid grid-cols-[90px_1fr_160px_120px_90px] items-center px-4 py-3 border border-[#e8ded4] bg-[#f3eee8] text-black text-[13px] font-medium'>
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p className='text-center'>Action</p>
          </div>

          <div className='flex flex-col gap-3 lg:gap-0'>

            {list.map((item) => (
              <div
                key={item._id}
                className='border border-[#e8ded4] bg-white lg:border-t-0'
              >

                {/* Desktop row */}
                <div className='hidden lg:grid grid-cols-[90px_1fr_160px_120px_90px] items-center px-4 py-3 text-[14px] text-black'>
                  <img
                    className='w-14 h-16 object-cover bg-[#fbfaf8] border border-[#e8ded4]'
                    src={item.images?.[0]?.url || item.images?.[0] || assets?.upload_area}
                    alt={item.name}
                  />

                  <p className='pr-6 line-clamp-2'>
                    {item.name}
                  </p>

                  <p className='text-[#666]'>
                    {item.category}
                  </p>

                  <p>
                    {currency}{item.price}
                  </p>

                  <button
                    onClick={() => removeProduct(item._id)}
                    className='mx-auto w-9 h-9 border border-[#d8cabc] flex items-center justify-center text-[#8c7a6b] hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition'
                    title='Remove product'
                  >
                    <Trash2 size={16} strokeWidth={1.6} />
                  </button>
                </div>

                {/* Mobile card */}
                <div className='lg:hidden p-3 sm:p-4 flex gap-3 sm:gap-4'>
                  <img
                    className='w-20 h-24 sm:w-24 sm:h-28 object-cover bg-[#fbfaf8] border border-[#e8ded4] flex-shrink-0'
                    src={item.images?.[0]?.url || item.images?.[0] || ''}
                    alt={item.name}
                  />

                  <div className='min-w-0 flex-1'>
                    <p className='text-black text-[15px] sm:text-[16px] font-medium leading-snug line-clamp-2'>
                      {item.name}
                    </p>

                    <div className='mt-2 flex flex-wrap gap-2 text-[12px]'>
                      <span className='h-7 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-[#666] flex items-center'>
                        {item.category}
                      </span>

                      <span className='h-7 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-black flex items-center'>
                        {currency}{item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => removeProduct(item._id)}
                      className='mt-4 h-9 px-4 border border-[#d8cabc] text-[#8c7a6b] text-[13px] flex items-center gap-2 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition'
                    >
                      <Trash2 size={15} strokeWidth={1.6} />
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  )
}

export default List
