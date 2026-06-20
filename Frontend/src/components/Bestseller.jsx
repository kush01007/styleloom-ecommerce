import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems'
import { Link } from 'react-router-dom'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller)
    setBestSeller(bestProducts.slice(0, 4))
  }, [products])

  return (
    <section className='w-full bg-[#fbfaf8] px-5 sm:px-8 lg:px-14 xl:px-16 py-16 sm:py-20'>

      {/* Section heading */}
      <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12'>
        <div>
          <p className='text-[#9b8977] text-[11px] font-medium tracking-[0.28em] uppercase mb-3'>
            Customer Favorites
          </p>

          <h2 className='text-black text-[34px] sm:text-[44px] lg:text-[50px] font-medium tracking-[-0.055em] leading-none'>
            Best Sellers
          </h2>
        </div>

        <div className='lg:text-right max-w-[500px]'>
          <p className='text-[#666] text-[15px] leading-[1.7]'>
            Most-loved pieces picked for everyday comfort, clean styling,
            and easy wardrobe pairing.
          </p>

          <Link
            to='/collection'
            className='inline-block mt-4 text-black text-sm border-b border-black pb-[2px] hover:opacity-60 transition'
          >
            Explore best sellers
          </Link>
        </div>
      </div>

      {/* Product grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-10'>
        {bestSeller.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

    </section>
  )
}

export default BestSeller
