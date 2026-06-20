import React, { useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductItems from '../components/ProductItems'
import Searchbar from '../components/Searchbar'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

const categories = ['Men', 'Women', 'Kids']
const types = ['Topwear', 'Bottomwear', 'Winterwear']

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const [showFilter, setShowFilter] = useState(false)
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const categoryQuery = searchParams.get('category') || ''
  const category = useMemo(
    () => categoryQuery.split(',').filter((item) => categories.includes(item)),
    [categoryQuery]
  )

  const toggleCategory = (value) => {
    const nextCategories = category.includes(value)
      ? category.filter((item) => item !== value)
      : [...category, value]
    const nextParams = new URLSearchParams(searchParams)

    if (nextCategories.length > 0) {
      nextParams.set('category', nextCategories.join(','))
    } else {
      nextParams.delete('category')
    }

    setSearchParams(nextParams)
  }

  const toggleSubCategory = (value) => {
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value))
      return
    }

    setSubCategory((prev) => [...prev, value])
  }

  const clearFilters = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    setSearchParams(nextParams)
    setSubCategory([])
    setSortType('relevant')
  }

  const filterProducts = useMemo(() => {
    let productsCopy = Array.isArray(products) ? [...products] : []

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      )
    }

    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price)
    }

    if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price)
    }

    return productsCopy
  }, [products, category, subCategory, search, showSearch, sortType])

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>
      <section className='bg-[#fbfaf8] border-b border-[#e8ded4] px-4 sm:px-8 lg:px-14 xl:px-16 py-6 sm:py-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>
          <div>
            <p className='text-[#9b8977] text-[9px] sm:text-[10px] tracking-[0.24em] uppercase mb-2'>
              StyleLoom Collection
            </p>

            <h1 className='text-black text-[30px] sm:text-[40px] lg:text-[46px] font-medium tracking-[-0.055em] leading-none'>
              All Products
            </h1>

            <p className='mt-3 text-[#666] text-[13px] sm:text-[14px] leading-[1.6] max-w-[480px]'>
              Clean everyday essentials across men, women, and kids.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-2 w-full lg:w-auto'>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className='h-10 sm:h-11 px-3 sm:px-4 border border-[#d8cabc] bg-white text-black text-[13px] sm:text-[14px] flex items-center justify-between gap-2 hover:border-black transition'
            >
              <span className='flex items-center gap-2'>
                <SlidersHorizontal size={15} strokeWidth={1.5} />
                Filters
              </span>

              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={showFilter ? 'rotate-180 transition' : 'transition'}
              />
            </button>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className='h-10 sm:h-11 px-3 sm:px-4 border border-[#d8cabc] bg-white text-black text-[13px] sm:text-[14px] outline-none cursor-pointer hover:border-black transition'
            >
              <option value='relevant'>Relevance</option>
              <option value='low-high'>Low to High</option>
              <option value='high-low'>High to Low</option>
            </select>
          </div>
        </div>

        <Searchbar />

        {showFilter && (
          <div className='mt-4 bg-white border border-[#e8ded4] p-4 sm:p-5'>
            <div className='flex flex-col gap-4'>
              <div>
                <p className='text-black text-[10px] tracking-[0.18em] uppercase mb-3'>
                  Category
                </p>

                <div className='flex flex-wrap gap-2'>
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleCategory(item)}
                      className={
                        category.includes(item)
                          ? 'h-8 px-4 border text-[12px] bg-black text-white border-black transition'
                          : 'h-8 px-4 border text-[12px] bg-[#fbfaf8] text-black border-[#d8cabc] hover:border-black transition'
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className='h-px w-full bg-[#e8ded4]' />

              <div>
                <p className='text-black text-[10px] tracking-[0.18em] uppercase mb-3'>
                  Product Type
                </p>

                <div className='flex flex-wrap gap-2'>
                  {types.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleSubCategory(item)}
                      className={
                        subCategory.includes(item)
                          ? 'h-8 px-4 border text-[12px] bg-black text-white border-black transition'
                          : 'h-8 px-4 border text-[12px] bg-[#fbfaf8] text-black border-[#d8cabc] hover:border-black transition'
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {(category.length > 0 || subCategory.length > 0) && (
                <button
                  onClick={clearFilters}
                  className='text-black text-[12px] border-b border-black pb-[2px] w-fit hover:opacity-60 transition'
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-8 sm:py-11'>
        <div className='flex items-center justify-between mb-6'>
          <p className='text-[#666] text-[13px]'>
            Showing {filterProducts.length} products
          </p>
        </div>

        {filterProducts.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-7 gap-y-8 sm:gap-y-10 max-w-[1380px] mx-auto'>
            {filterProducts.map((item, index) => (
              <ProductItems
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.images}
              />
            ))}
          </div>
        ) : (
          <div className='min-h-[210px] flex items-center justify-center border border-[#e8ded4] bg-[#fbfaf8]'>
            <p className='text-[#666] text-[14px]'>
              No products found.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Collection
