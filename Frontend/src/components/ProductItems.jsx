import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  // Taking first image from product images array
  const imgUrl = Array.isArray(image) ? image[0] : image
  const finalImage = imgUrl?.url || imgUrl

  return (
    <Link
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      to={`/product/${id}`}
      className='group block'
    >
      {/* Product image */}
      <div className='relative aspect-[3/4] bg-[#f6f2ed] overflow-hidden'>
        <img
          src={finalImage}
          alt={name}
          className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]'
        />

        {/* Hover text */}
        <div className='absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition duration-300'>
          <span className='bg-white/90 backdrop-blur-sm text-black text-xs px-3 py-2'>
            View Product
          </span>
        </div>
      </div>

      {/* Product details */}
      <div className='pt-4'>
        <p className='text-black text-[15px] font-normal leading-snug line-clamp-1'>
          {name}
        </p>

        <p className='mt-1 text-[#555] text-[14px] font-normal'>
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItems
