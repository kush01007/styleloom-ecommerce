import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Mail, Phone, Globe } from 'lucide-react'

const Footer = () => {
return ( 
<footer className='w-full bg-white border-t border-[#e8ded4] px-5 sm:px-8 lg:px-14 xl:px-16 pt-14 sm:pt-16'>

  <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-14 pb-12'>

    <div>
      <h2 className='text-black text-[32px] font-medium tracking-[-0.065em] leading-none mb-5'>
        StyleLoom
      </h2>

      <p className='text-[#666] text-[14px] leading-[1.8] max-w-[420px]'>
        StyleLoom is a modern fashion store focused on clean, comfortable,
        and everyday-ready clothing for effortless styling.
      </p>

      <div className='flex items-center gap-3 mt-7'>
        <a
          href='#'
          className='w-10 h-10 rounded-full border border-[#e0d7ce] flex items-center justify-center text-black hover:bg-black hover:text-white transition'
        >
          <FaInstagram size={17} />
        </a>

        <a
          href='#'
          className='w-10 h-10 rounded-full border border-[#e0d7ce] flex items-center justify-center text-black hover:bg-black hover:text-white transition'
        >
          <FaWhatsapp size={17} />
        </a>

        <a
          href='#'
          className='w-10 h-10 rounded-full border border-[#e0d7ce] flex items-center justify-center text-black hover:bg-black hover:text-white transition'
        >
          <FaLinkedin size={17} />
        </a>

        <a
          href='#'
          className='w-10 h-10 rounded-full border border-[#e0d7ce] flex items-center justify-center text-black hover:bg-black hover:text-white transition'
        >
          <FaTwitter size={17} />
        </a>
      </div>
    </div>

    <div>
      <p className='text-black text-[13px] font-normal tracking-[0.2em] uppercase mb-5'>
        Shop
      </p>

      <ul className='flex flex-col gap-3 text-[#666] text-[14px]'>
        <li><Link to='/collection' className='hover:text-black transition'>New Arrivals</Link></li>
        <li><Link to='/collection?category=Men' className='hover:text-black transition'>Men</Link></li>
        <li><Link to='/collection?category=Women' className='hover:text-black transition'>Women</Link></li>
        <li><Link to='/collection' className='hover:text-black transition'>Best Sellers</Link></li>
      </ul>
    </div>

    <div>
      <p className='text-black text-[13px] font-normal tracking-[0.2em] uppercase mb-5'>
        Company
      </p>

      <ul className='flex flex-col gap-3 text-[#666] text-[14px]'>
        <li><Link to='/' className='hover:text-black transition'>Home</Link></li>
        <li><Link to='/about' className='hover:text-black transition'>About</Link></li>
        <li><Link to='/contact' className='hover:text-black transition'>Contact</Link></li>
        <li><span className='hover:text-black transition cursor-pointer'>Privacy Policy</span></li>
      </ul>
    </div>

    <div>
      <p className='text-black text-[13px] font-normal tracking-[0.2em] uppercase mb-5'>
        Contact
      </p>

      <ul className='flex flex-col gap-4 text-[#666] text-[14px]'>
        <li className='flex items-center gap-3'>
          <Phone size={16} strokeWidth={1.5} />
          <span>+91 98765 XXXXX</span>
        </li>

        <li className='flex items-center gap-3'>
          <Mail size={16} strokeWidth={1.5} />
          <span>support@styleloom.com</span>
        </li>

        <li className='flex items-center gap-3'>
          <Globe size={16} strokeWidth={1.5} />
          <span>www.styleloom.com</span>
        </li>
      </ul>
    </div>

  </div>

  <div className='border-t border-[#e8ded4] py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
    <p className='text-[#777] text-[13px]'>
      © 2026 StyleLoom. All rights reserved.
    </p>

    <p className='text-[#777] text-[13px]'>
      Built for a clean fashion shopping experience.
    </p>
  </div>

</footer>

)}

export default Footer
