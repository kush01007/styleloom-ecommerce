import React from 'react'
import { ArrowUpRight, Clock3, Mail, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <main className='w-full bg-white border-t border-[#e8ded4]'>
      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-14 sm:py-16 lg:py-20'>
        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-20 items-end'>
          <div>
            <p className='text-[#9b8977] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase mb-3'>
              Contact Us
            </p>
            <h1 className='text-black text-[36px] sm:text-[46px] lg:text-[52px] font-medium tracking-[-0.055em] leading-[1.08]'>
              How can we help?
            </h1>
          </div>

          <p className='text-[#666] text-[14px] sm:text-[16px] leading-[1.8] max-w-[570px]'>
            Questions about an order, sizing, returns, or anything else? Reach out and our customer-care team will help you find the right answer.
          </p>
        </div>
      </section>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16'>
        <div className='w-full max-w-6xl mx-auto bg-[#f7f4ef] border border-[#e8ded4] px-5 sm:px-9 lg:px-12 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7'>
          <div>
            <p className='text-[#9b8977] text-[10px] tracking-[0.25em] uppercase mb-3'>Customer Care</p>
            <h2 className='text-black text-[26px] sm:text-[34px] font-medium tracking-[-0.045em] leading-[1.15]'>
              The quickest way to reach us.
            </h2>
            <p className='mt-3 text-[#666] text-[14px] sm:text-[15px] leading-[1.7]'>
              We usually reply within one business day.
            </p>
          </div>

          <a
            href='mailto:support@styleloom.com'
            className='w-fit h-12 px-6 bg-black text-white text-[13px] inline-flex items-center justify-center gap-3 hover:opacity-85 transition'
          >
            Email Support
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <section className='px-4 sm:px-8 lg:px-14 xl:px-16 py-12 sm:py-16 pb-20'>
        <div className='w-full max-w-6xl mx-auto'>
          <div className='border-t border-[#e8ded4]'>
            <div className='grid grid-cols-[38px_1fr] sm:grid-cols-[48px_220px_1fr] gap-x-4 sm:gap-x-7 py-6 sm:py-7 border-b border-[#e8ded4] items-start'>
              <Mail size={19} strokeWidth={1.5} className='text-[#8c7a6b] mt-0.5' />
              <h3 className='text-black text-[17px] sm:text-[18px]'>Email</h3>
              <a
                href='mailto:support@styleloom.com'
                className='col-start-2 sm:col-start-auto mt-1 sm:mt-0 text-[#666] text-[14px] sm:text-[15px] hover:text-black transition'
              >
                support@styleloom.com
              </a>
            </div>

            <div className='grid grid-cols-[38px_1fr] sm:grid-cols-[48px_220px_1fr] gap-x-4 sm:gap-x-7 py-6 sm:py-7 border-b border-[#e8ded4] items-start'>
              <Phone size={19} strokeWidth={1.5} className='text-[#8c7a6b] mt-0.5' />
              <h3 className='text-black text-[17px] sm:text-[18px]'>Phone</h3>
              <a
                href='tel:+919876543210'
                className='col-start-2 sm:col-start-auto mt-1 sm:mt-0 text-[#666] text-[14px] sm:text-[15px] hover:text-black transition'
              >
                +91 98765 XXXXX
              </a>
            </div>

            <div className='grid grid-cols-[38px_1fr] sm:grid-cols-[48px_220px_1fr] gap-x-4 sm:gap-x-7 py-6 sm:py-7 border-b border-[#e8ded4] items-start'>
              <Clock3 size={19} strokeWidth={1.5} className='text-[#8c7a6b] mt-0.5' />
              <h3 className='text-black text-[17px] sm:text-[18px]'>Support hours</h3>
              <p className='col-start-2 sm:col-start-auto mt-1 sm:mt-0 text-[#666] text-[14px] sm:text-[15px] leading-[1.7]'>
                Monday–Saturday, 10:00 AM–6:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
