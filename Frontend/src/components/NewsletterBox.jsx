import React from 'react'
import { ArrowRight } from 'lucide-react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <section className='w-full bg-white px-4 sm:px-8 lg:px-14 xl:px-16 py-8 sm:py-14 lg:py-20'>

      <div className='bg-[#f5f3ef] border border-[#e8ded4] px-4 sm:px-8 lg:px-14 py-8 sm:py-11 lg:py-14'>

        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 sm:gap-9 lg:gap-10'>

          {/* Text */}
          <div>
            <p className='text-[#9b8977] text-[11px] font-normal tracking-[0.28em] uppercase mb-3'>
              StyleLoom Insider
            </p>

            <h2 className='text-black text-[30px] sm:text-[42px] lg:text-[52px] font-medium tracking-[-0.055em] leading-[1.08] sm:leading-[1.05]'>
              Get 20% off your
              <br className='hidden sm:block' />
              first order.
            </h2>

            <p className='mt-4 text-[#666] text-[15px] leading-[1.7] max-w-[500px]'>
              Join our newsletter for new arrivals, styling updates, and exclusive offers.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className='w-full lg:w-[470px] bg-white border border-[#e0d7ce] flex items-center h-[52px] sm:h-[58px] overflow-hidden'
          >
            <input
              className='min-w-0 flex-1 h-full px-4 sm:px-5 text-black text-[13px] sm:text-[14px] outline-none bg-transparent'
              type='email'
              placeholder='Enter your email'
              required
            />

            <button
              className='h-full flex-shrink-0 px-4 sm:px-7 bg-black text-white text-[12px] sm:text-[13px] font-normal flex items-center gap-2 hover:opacity-90 transition'
              type='submit'
            >
              Subscribe
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </form>

        </div>
      </div>

    </section>
  )
}

export default NewsletterBox
