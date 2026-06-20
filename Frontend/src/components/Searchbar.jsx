import React, { useContext } from 'react'
import { Search, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)

  if (!showSearch) return null

  return (
    <div className='mt-6 pt-6 border-t border-[#e8ded4]'>
      <div className='flex items-center gap-3 sm:gap-4'>
          <label className='h-12 flex-1 rounded-full border border-[#aeb4bd] bg-transparent px-5 sm:px-6 flex items-center gap-3 transition focus-within:border-black focus-within:bg-white'>
            <span className='sr-only'>Search products</span>

            <input
              autoFocus
              value={search}
              name='search'
              onChange={(event) => setSearch(event.target.value)}
              className='min-w-0 flex-1 bg-transparent text-[14px] sm:text-[15px] text-black outline-none placeholder:text-[#858b98]'
              type='search'
              placeholder='Search products'
            />

            <Search
              size={21}
              strokeWidth={1.55}
              className='flex-shrink-0 text-black'
              aria-hidden='true'
            />
          </label>

          <button
            type='button'
            onClick={() => setShowSearch(false)}
            className='w-9 h-9 flex-shrink-0 flex items-center justify-center text-black hover:opacity-60 transition'
            aria-label='Close search'
          >
            <X size={22} strokeWidth={1.5} />
          </button>
      </div>
    </div>
  )
}

export default Searchbar
