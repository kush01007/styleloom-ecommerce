import React, { useContext, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import { showStatus } from '../utils/statusNotification'
import {
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const productData = useMemo(
    () => products.find((item) => item._id === productId) || null,
    [productId, products]
  )
  const [selectedImage, setSelectedImage] = useState(null)
  const [size, setSize] = useState('')
  const [activeInfo, setActiveInfo] = useState('')

  const image = productData?.images?.find(
    (item) => (item?.url || item) === (selectedImage?.url || selectedImage)
  ) || productData?.images?.[0] || null

  const getImageUrl = (img) => {
    return img?.url || img
  }

  const handleAddToCart = () => {
    if (!size) {
      showStatus('Please select a size', 'error')
      return
    }

    addToCart(productData._id, size)
    showStatus('Added to cart', 'success', 'bottom-right')
  }

  if (!productData) {
    return <div className='min-h-[360px] bg-white'></div>
  }

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-6 sm:py-9'>

        <div className='flex items-center gap-2 text-[12px] sm:text-[13px] text-[#777] mb-5 sm:mb-6'>
          <span>Home</span>
          <ChevronRight size={13} strokeWidth={1.5} />
          <span>Collection</span>
          <ChevronRight size={13} strokeWidth={1.5} />
          <span className='text-black line-clamp-1'>{productData.name}</span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-[0.9fr_0.95fr] gap-5 sm:gap-7 lg:gap-12 items-start'>

          <div className='w-full'>
            <div className='bg-[#f7f4ef] border border-[#e8ded4] overflow-hidden h-[430px] sm:h-[560px] lg:h-[620px]'>
              {image && (
                <img
                  src={getImageUrl(image)}
                  alt={productData.name}
                  className='w-full h-full object-contain object-center'
                />
              )}
            </div>

            <div className='flex gap-2 sm:gap-3 mt-3 overflow-x-auto pb-1'>
              {productData.images?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  className={
                    getImageUrl(image) === getImageUrl(item)
                      ? 'w-[74px] h-[88px] sm:w-[86px] sm:h-[102px] flex-shrink-0 border border-black bg-[#f7f4ef] overflow-hidden'
                      : 'w-[74px] h-[88px] sm:w-[86px] sm:h-[102px] flex-shrink-0 border border-[#e8ded4] bg-[#f7f4ef] overflow-hidden hover:border-black transition'
                  }
                >
                  <img
                    src={getImageUrl(item)}
                    alt={productData.name}
                    className='w-full h-full object-cover object-top'
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='lg:pt-1 max-w-[620px]'>

            <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.26em] uppercase mb-2'>
              StyleLoom Essential
            </p>

            <h1 className='text-black text-[30px] sm:text-[38px] lg:text-[44px] font-medium tracking-[-0.055em] leading-[1.05] capitalize'>
              {productData.name}
            </h1>

            <button
              onClick={() => setActiveInfo('reviews')}
              className='flex items-center gap-3 mt-3 group'
            >
              <div className='flex items-center gap-[2px] text-black'>
                {[0, 1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    viewBox='0 0 20 20'
                    className={`w-4 h-4 ${star < 4 ? 'fill-black' : 'fill-white'}`}
                    aria-hidden='true'
                  >
                    <path
                      d='M10 1.4 12.65 6.77 18.58 7.63 14.29 11.81 15.3 17.71 10 14.92 4.7 17.71 5.71 11.81 1.42 7.63 7.35 6.77 10 1.4Z'
                      stroke='currentColor'
                      strokeWidth='1.35'
                      strokeLinejoin='miter'
                    />
                  </svg>
                ))}
              </div>

              <p className='text-[#666] text-[14px] group-hover:text-black transition'>
                122 reviews
              </p>
            </button>

            <p className='mt-4 text-black text-[30px] sm:text-[34px] font-medium tracking-[-0.04em] leading-none'>
              {currency}{productData.price}
            </p>

            <p className='mt-3 text-[#666] text-[14px] sm:text-[15px] leading-[1.6] max-w-[560px]'>
              {productData.description}
            </p>

            <div className='mt-6 pt-5 border-t border-[#eee6de] sm:mt-7 sm:pt-0 sm:border-t-0'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-black text-[12px] sm:text-[13px] tracking-[0.18em] uppercase'>
                  Select Size
                </p>

                {size && (
                  <button
                    onClick={() => setSize('')}
                    className='text-[#777] text-[13px] hover:text-black transition'
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className='flex flex-wrap gap-2 sm:gap-3'>
                {productData.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={
                      item === size
                        ? 'h-10 sm:h-11 min-w-11 px-4 sm:px-5 border border-black bg-black text-white text-[14px] transition'
                        : 'h-10 sm:h-11 min-w-11 px-4 sm:px-5 border border-[#d8cabc] bg-white text-black text-[14px] hover:border-black transition'
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className='mt-6 w-[250px] h-12 bg-black text-white text-[12px] sm:text-[13px] tracking-[0.14em] uppercase inline-flex items-center justify-center gap-3 hover:bg-[#242424] active:scale-[0.99] transition'
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Add to Cart
            </button>

            <div className='mt-7 border border-[#e8ded4] divide-x divide-[#e8ded4] grid grid-cols-3'>

              <div className='min-w-0 flex flex-col items-center text-center gap-2 px-2 py-4 sm:items-start sm:text-left sm:p-4'>
                <ShieldCheck size={18} strokeWidth={1.5} className='text-[#8c7a6b] flex-shrink-0' />
                <div className='min-w-0'>
                  <p className='text-black text-[11px] sm:text-[14px] leading-snug'>Original Product</p>
                  <p className='text-[#777] text-[10px] sm:text-[13px] mt-1 leading-snug'>Quality checked</p>
                </div>
              </div>

              <div className='min-w-0 flex flex-col items-center text-center gap-2 px-2 py-4 sm:items-start sm:text-left sm:p-4'>
                <Truck size={18} strokeWidth={1.5} className='text-[#8c7a6b] flex-shrink-0' />
                <div className='min-w-0'>
                  <p className='text-black text-[11px] sm:text-[14px] leading-snug'>COD Available</p>
                  <p className='text-[#777] text-[10px] sm:text-[13px] mt-1 leading-snug'>Pay on delivery</p>
                </div>
              </div>

              <div className='min-w-0 flex flex-col items-center text-center gap-2 px-2 py-4 sm:items-start sm:text-left sm:p-4'>
                <RotateCcw size={18} strokeWidth={1.5} className='text-[#8c7a6b] flex-shrink-0' />
                <div className='min-w-0'>
                  <p className='text-black text-[11px] sm:text-[14px] leading-snug'>7-Day Returns</p>
                  <p className='text-[#777] text-[10px] sm:text-[13px] mt-1 leading-snug'>Easy exchange</p>
                </div>
              </div>

            </div>

            <div className='mt-6 border border-[#e8ded4]'>

              <button
                onClick={() => setActiveInfo(activeInfo === 'description' ? '' : 'description')}
                className='w-full px-4 py-4 flex items-center justify-between text-left border-b border-[#e8ded4]'
              >
                <span className='text-black text-[13px] sm:text-[14px] tracking-[0.07em] uppercase'>
                  Product Description
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={activeInfo === 'description' ? 'rotate-180 transition' : 'transition'}
                />
              </button>

              {activeInfo === 'description' && (
                <div className='p-4 bg-[#fbfaf8]'>
                  <p className='text-[#666] text-[14px] leading-[1.8]'>
                    {productData.description}
                  </p>
                </div>
              )}

              <button
                onClick={() => setActiveInfo(activeInfo === 'details' ? '' : 'details')}
                className='w-full px-4 py-4 flex items-center justify-between text-left border-b border-[#e8ded4]'
              >
                <span className='text-black text-[13px] sm:text-[14px] tracking-[0.07em] uppercase'>
                  Fit & Care
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={activeInfo === 'details' ? 'rotate-180 transition' : 'transition'}
                />
              </button>

              {activeInfo === 'details' && (
                <div className='p-4 bg-[#fbfaf8] grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div>
                    <p className='text-black text-[14px] mb-1'>Fit</p>
                    <p className='text-[#777] text-[14px]'>Regular everyday fit</p>
                  </div>

                  <div>
                    <p className='text-black text-[14px] mb-1'>Care</p>
                    <p className='text-[#777] text-[14px]'>Machine wash cold</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setActiveInfo(activeInfo === 'reviews' ? '' : 'reviews')}
                className='w-full px-4 py-4 flex items-center justify-between text-left'
              >
                <span className='text-black text-[13px] sm:text-[14px] tracking-[0.07em] uppercase'>
                  Reviews (122)
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={activeInfo === 'reviews' ? 'rotate-180 transition' : 'transition'}
                />
              </button>

              {activeInfo === 'reviews' && (
                <div className='p-4 bg-[#fbfaf8] border-t border-[#e8ded4]'>
                  <p className='text-[#666] text-[14px] leading-[1.8]'>
                    Customers love this product for its clean look, comfort, and everyday styling.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </main>
  )
}

export default Product
