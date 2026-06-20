import React from 'react'
import { RefreshCcw, RotateCcw, Headphones } from 'lucide-react'

const OurPolicy = () => {
  const policies = [
    {
      icon: <RefreshCcw size={24} strokeWidth={1.4} />,
      title: 'Easy Exchanges',
      text: 'Exchange eligible products without any hassle.'
    },
    {
      icon: <RotateCcw size={24} strokeWidth={1.4} />,
      title: '7-Day Returns',
      text: 'Simple returns within 7 days of delivery.'
    },
    {
      icon: <Headphones size={24} strokeWidth={1.4} />,
      title: 'Customer Support',
      text: 'We’re here to help with orders and queries.'
    }
  ]

  return (
    <section className='w-full bg-[#fbfaf8] px-4 sm:px-8 lg:px-14 xl:px-16 py-8 sm:py-12 lg:py-16'>
      <div className='grid grid-cols-1 md:grid-cols-3 border border-[#e8ded4]'>

        {policies.map((item, index) => (
          <div
            key={index}
            className='p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#e8ded4] last:border-b-0 md:last:border-r-0 flex items-center md:items-start gap-4 md:block'
          >
            {/* Icon */}
            <div className='w-10 h-10 md:w-11 md:h-11 flex-shrink-0 rounded-full border border-[#cbbbad] text-[#8c7a6b] flex items-center justify-center md:mb-6'>
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className='text-black text-[16px] sm:text-[17px] md:text-[18px] font-normal tracking-[-0.02em]'>
                {item.title}
              </h3>

              <p className='mt-1 md:mt-2 text-[#666] text-[13px] sm:text-[14px] leading-[1.55] md:leading-[1.7] max-w-[280px]'>
                {item.text}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default OurPolicy
