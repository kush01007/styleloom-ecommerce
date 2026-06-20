
import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowRight, Leaf, Cloud, ShieldCheck } from 'lucide-react'

const Hero = () => {
  return (
    <section className='w-full bg-[#f5f3ef] overflow-hidden'>
      <div className='flex min-h-[500px] lg:min-h-[580px]'>

        {/* Small vertical season text on desktop */}
        <div className='hidden lg:flex flex-col items-center justify-center w-9 flex-shrink-0 py-10'>
          <div className='w-px flex-1 bg-[#ccc8c0]' />
          <span className='-rotate-90 whitespace-nowrap text-[9px] tracking-[0.35em] text-[#9b8977] font-semibold uppercase my-3'>
            New Season
          </span>
          <div className='w-px flex-1 bg-[#ccc8c0]' />
        </div>

        {/* Hero text side */}
        <div className='flex flex-col justify-center w-full lg:w-[46%] px-6 sm:px-10 lg:px-12 xl:px-14 pt-10 pb-8 lg:py-12'>

          <p className='text-[#9b8977] text-[11px] font-bold tracking-[0.32em] mb-4 uppercase'>
            New Season Essentials
          </p>

          <h1 className='text-black font-extrabold tracking-[-0.03em] leading-[1.05] text-[38px] sm:text-[48px] lg:text-[50px] xl:text-[62px]'>
            Everyday Fits,
            <br />
            Cleanly Curated.
          </h1>

          <p className='mt-5 text-[#555] text-[15px] leading-[1.65] max-w-[380px]'>
            Discover modern clothing essentials designed for comfort, confidence, and daily style.
          </p>

          {/* Main action buttons */}
          <div className='mt-7 flex flex-col items-start gap-4'>
            <Link
              to='/collection'
              className='bg-black text-white h-[52px] px-8 rounded-md text-[15px] font-semibold flex items-center gap-4 w-auto hover:opacity-90 transition'
            >
              Shop Collection
              <ArrowRight size={17} strokeWidth={2} />
            </Link>

            <Link
              to='/collection'
              className='text-black text-[14px] border-b border-black pb-[2px] hover:opacity-60 transition'
            >
              Explore New Arrivals
            </Link>
          </div>

          {/* Mobile image comes below the text */}
          <div className='lg:hidden relative mt-8 rounded-2xl overflow-hidden'>
            <img
              src={assets.hero_img}
              alt="StyleLoom SS'26 collection"
              className='w-full object-cover object-top'
              style={{ height: '420px' }}
            />

            {/* Collection badge for mobile image */}
            <div className='absolute top-4 right-4 w-[100px] h-[82px] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center'>
              <p className='text-black text-[16px] font-bold tracking-wide'>SS'26</p>
              <span className='w-6 h-px bg-[#8C7A6B] my-[6px]'></span>
              <p className='text-black text-[9px] font-bold tracking-[0.22em] uppercase'>Collection</p>
            </div>
          </div>

          {/* Small trust points */}
          <div className='mt-8 pt-5 border-t border-[#ccc8c0] flex items-center justify-center w-full'>
            <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[#666] text-[12px] sm:text-[13px] pr-4 sm:pr-5'>
              <Leaf size={15} strokeWidth={1.5} />
              <span>Minimal Styles</span>
            </div>

            <div className='w-px h-6 bg-[#ccc8c0]' />

            <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[#666] text-[12px] sm:text-[13px] px-4 sm:px-5'>
              <Cloud size={15} strokeWidth={1.5} />
              <span>Everyday Comfort</span>
            </div>

            <div className='w-px h-6 bg-[#ccc8c0]' />

            <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[#666] text-[12px] sm:text-[13px] pl-4 sm:pl-5'>
              <ShieldCheck size={15} strokeWidth={1.5} />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Desktop hero image */}
        <div className='hidden lg:block relative flex-1'>
          <img
            src={assets.hero_img}
            alt="StyleLoom SS'26 collection"
            className='absolute inset-0 w-full h-full object-cover object-top'
          />

          {/* Collection badge for desktop image */}
          <div className='absolute top-6 right-6 w-[112px] h-[90px] bg-white/60 backdrop-blur-sm border border-white/40 flex flex-col items-center justify-center'>
            <p className='text-black text-[18px] font-bold tracking-wide'>SS'26</p>
            <span className='w-7 h-px bg-[#8C7A6B] my-[7px]'></span>
            <p className='text-black text-[10px] font-bold tracking-[0.22em] uppercase'>Collection</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero

