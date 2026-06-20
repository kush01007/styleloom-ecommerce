import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const About = () => {
  const values = [
    {
      title: 'Simple by design',
      text: 'Clean, versatile pieces that are easy to wear and easy to make your own.'
    },
    {
      title: 'Comfort comes first',
      text: 'Thoughtful fits and wearable fabrics made for real days and real movement.'
    },
    {
      title: 'Chosen with care',
      text: 'A focused collection that values usefulness, quality, and lasting style.'
    }
  ]

  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>
      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-14 sm:py-16 lg:py-20 text-center'>
        <div className='max-w-[760px] mx-auto'>
          <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3'>
            About Us
          </p>
          <h1 className='text-black text-[36px] sm:text-[46px] lg:text-[52px] font-medium tracking-[-0.055em] leading-[1.08]'>
            Everyday fashion, made simpler.
          </h1>
          <p className='mt-5 text-[#666] text-[14px] sm:text-[16px] leading-[1.75] max-w-[650px] mx-auto'>
            StyleLoom is a modern clothing store for people who want to dress well without making it complicated.
          </p>
        </div>
      </section>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16'>
        <div className='w-full max-w-6xl mx-auto bg-[#f7f4ef] border border-[#e8ded4] px-5 sm:px-9 lg:px-12 py-8 sm:py-11 lg:py-12 grid grid-cols-1 lg:grid-cols-[0.65fr_1.35fr] gap-6 lg:gap-14'>
          <div>
            <p className='text-[#9b8977] text-[10px] tracking-[0.25em] uppercase'>Our Story</p>
            <h2 className='mt-3 text-black text-[26px] sm:text-[32px] font-medium tracking-[-0.045em] leading-[1.15]'>
              Style that works with your life.
            </h2>
          </div>

          <div className='text-[#5f5f5f] text-[14px] sm:text-[15px] leading-[1.8]'>
            <p>
              We started StyleLoom with a clear idea: a good wardrobe should feel useful, comfortable, and personal. Our collections focus on clean silhouettes and easy combinations that move naturally through everyday life.
            </p>
            <p className='mt-4'>
              Instead of chasing every trend, we choose pieces that feel relevant now and remain easy to wear later. The result is a calmer, more considered way to shop.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-10 sm:py-12 lg:py-14'>
        <div className='w-full max-w-6xl mx-auto'>
          <div className='max-w-[420px]'>
            <p className='text-[#9b8977] text-[10px] tracking-[0.25em] uppercase mb-2'>What We Value</p>
            <h2 className='text-black text-[28px] sm:text-[34px] font-medium tracking-[-0.045em] leading-[1.15]'>
              The things that guide us
            </h2>
          </div>

          <div className='mt-6 sm:mt-7 border-t border-[#e8ded4]'>
            {values.map((value, index) => (
              <div
                key={value.title}
                className='grid grid-cols-[32px_1fr] sm:grid-cols-[42px_210px_1fr] gap-x-4 sm:gap-x-6 py-5 sm:py-6 border-b border-[#e8ded4] items-start'
              >
                <p className='text-[#9b8977] text-[10px] tracking-[0.18em]'>0{index + 1}</p>
                <h3 className='text-black text-[17px] sm:text-[18px] tracking-[-0.03em]'>{value.title}</h3>
                <p className='col-start-2 sm:col-start-auto mt-1 sm:mt-0 text-[#666] text-[14px] leading-[1.7]'>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 pb-20 sm:pb-16 sm:px-8 lg:px-14 xl:px-16  '>
        <div className='w-full max-w-6xl mx-auto border border-[#e8ded4] px-5 sm:px-8 py-7 sm:py-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>
          <div>
            <h2 className='text-black text-[23px] sm:text-[28px] font-medium tracking-[-0.04em]'>Find your next everyday favorite.</h2>
            <p className='mt-1 text-[#777] text-[14px]'>Explore pieces selected for comfort and effortless styling.</p>
          </div>

          <Link
            to='/collection'
            className='h-11 px-6 bg-black text-white text-[13px] inline-flex items-center justify-center gap-3 w-fit hover:opacity-85 transition'
          >
            Shop Collection
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default About
