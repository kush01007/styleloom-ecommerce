import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)
  const related = useMemo(() => {
    if (!Array.isArray(products)) return []

    return products
      .filter((item) => item.category === category)
      .filter((item) => item.subCategory === subCategory)
      .slice(0, 4)
  }, [products, category, subCategory])

  if (related.length === 0) {
    return null
  }

  return (
    <section className='w-full bg-white px-5 sm:px-8 lg:px-14 xl:px-16 py-16 sm:py-20 border-t border-[#e8ded4]'>

      {/* Section heading */}
      <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12'>
        <div>
          <p className='text-[#9b8977] text-[11px] font-medium tracking-[0.28em] uppercase mb-3'>
            You May Also Like
          </p>

          <h2 className='text-black text-[34px] sm:text-[44px] lg:text-[50px] font-medium tracking-[-0.055em] leading-none'>
            Related Products
          </h2>
        </div>
        <Link
          to='/collection'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='w-fit h-10 sm:h-11 px-4 sm:px-5 border border-[#d8cabc] text-black text-[13px] sm:text-[14px] flex items-center gap-3 hover:border-black transition'
        >
          View Collection
          <ArrowRight size={15} strokeWidth={1.6} />
        </Link>

        
      </div>

      {/* Product grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-10'>
        {related.map((item, index) => (
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

export default RelatedProducts
