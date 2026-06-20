import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'

const Cart = () => {
  const {
    products,
    cartItems,
    updateQuantity,
    navigate
  } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const tempData = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size]
            })
          }
        }
      }

      setCartData(tempData)
    }
  }, [cartItems, products])

  const getProductImage = (product) => {
    const img = product?.images?.[0]
    return img?.url || img
  }

  const goToCollection = () => {
    navigate('/collection')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToCheckout = () => {
    navigate('/place-order')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-7 sm:py-10'>

        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7'>
          <div>
            <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-2'>
              Shopping Bag
            </p>

            <h1 className='text-black text-[34px] sm:text-[44px] lg:text-[50px] font-medium tracking-[-0.06em] leading-none'>
              Your Cart
            </h1>
          </div>

          <p className='text-[#666] text-[14px]'>
            {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartData.length === 0 ? (
          <div className='min-h-[360px] flex items-center justify-center border border-[#e8ded4] bg-[#fbfaf8]'>
            <div className='text-center px-5'>
              <div className='w-16 h-16 rounded-full border border-[#d8cabc] flex items-center justify-center mx-auto mb-5 bg-white'>
                <ShoppingBag size={26} strokeWidth={1.4} className='text-[#8c7a6b]' />
              </div>

              <h2 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.04em]'>
                Your cart is empty
              </h2>

              <p className='mt-3 text-[#666] text-[15px] leading-[1.7] max-w-[420px] mx-auto'>
                Looks like you haven’t added anything yet. Explore the collection and find your next fit.
              </p>

              <button
                onClick={goToCollection}
                className='mt-7 h-12 px-7 bg-black text-white text-[14px] flex items-center gap-3 mx-auto hover:opacity-90 transition'
              >
                Continue Shopping
                <ArrowRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-7 lg:gap-9 items-start'>

            <div className='flex flex-col gap-4'>

              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id)

                if (!productData) return null

                return (
                  <div
                    key={index}
                    className='border border-[#e8ded4] bg-white p-4 sm:p-5'
                  >

                    <div className='grid grid-cols-[86px_1fr] sm:grid-cols-[104px_1fr_auto] gap-4 sm:gap-5 items-start'>

                      <div className='w-[86px] h-[110px] sm:w-[104px] sm:h-[132px] bg-[#f7f4ef] border border-[#e8ded4] overflow-hidden'>
                        <img
                          src={getProductImage(productData)}
                          alt={productData.name}
                          className='w-full h-full object-cover object-top'
                        />
                      </div>

                      <div className='min-w-0'>
                        <p className='text-black text-[16px] sm:text-[18px] font-normal leading-snug capitalize line-clamp-2'>
                          {productData.name}
                        </p>

                        <div className='mt-3 flex flex-wrap items-center gap-2 sm:gap-3'>
                          <span className='h-8 px-3 border border-[#d8cabc] bg-[#fbfaf8] text-black text-[13px] flex items-center'>
                            Size: {item.size}
                          </span>

                          <span className='text-[#666] text-[14px]'>
                            Qty: {item.quantity}
                          </span>
                        </div>

                        <div className='mt-4 flex items-center gap-4'>
                          <div className='h-10 border border-[#d8cabc] flex items-center'>
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item._id, item.size, item.quantity - 1)
                                }
                              }}
                              className='w-10 h-full flex items-center justify-center hover:bg-[#fbfaf8] transition'
                            >
                              <Minus size={14} strokeWidth={1.7} />
                            </button>

                            <input
                              value={item.quantity}
                              readOnly
                              className='w-10 h-full text-center text-[14px] outline-none border-x border-[#d8cabc] bg-white'
                            />

                            <button
                              onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                              className='w-10 h-full flex items-center justify-center hover:bg-[#fbfaf8] transition'
                            >
                              <Plus size={14} strokeWidth={1.7} />
                            </button>
                          </div>

                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className='w-10 h-10 border border-[#e8ded4] flex items-center justify-center hover:bg-black hover:text-white transition'
                            aria-label='Remove product'
                          >
                            <Trash2 size={17} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      <div className='col-span-2 sm:col-span-1 sm:text-right border-t sm:border-t-0 border-[#e8ded4] pt-4 sm:pt-0'>
                        <p className='text-[#777] text-[13px] mb-1'>Item Total</p>
                        <p className='text-black text-[18px] font-medium'>
                          ₹{productData.price * item.quantity}
                        </p>
                      </div>

                    </div>

                  </div>
                )
              })}

            </div>

            <aside className='border border-[#e8ded4] bg-white lg:sticky lg:top-24'>
              <div className='p-5 sm:p-6 border-b border-[#e8ded4] bg-[#fbfaf8]'>
                <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.24em] uppercase mb-2'>
                  Order Summary
                </p>

                <h2 className='text-black text-[26px] sm:text-[30px] font-medium tracking-[-0.045em]'>
                  Cart Total
                </h2>
              </div>

              <div className='p-5 sm:p-6'>
                <CartTotal />

                <button
                  onClick={goToCheckout}
                  className='mt-7 w-full h-12 bg-black text-white text-[13px] tracking-[0.12em] uppercase flex items-center justify-center gap-3 hover:opacity-90 active:opacity-80 transition'
                >
                  Proceed to Checkout
                  <ArrowRight size={16} strokeWidth={1.6} />
                </button>

                <button
                  onClick={goToCollection}
                  className='mt-4 w-full h-11 border border-[#d8cabc] text-black text-[14px] hover:border-black transition'
                >
                  Continue Shopping
                </button>
              </div>
            </aside>

          </div>
        )}

      </section>

    </main>
  )
}

export default Cart
