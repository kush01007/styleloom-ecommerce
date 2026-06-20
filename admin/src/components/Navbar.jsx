import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='h-[74px] bg-white flex items-center px-5 sm:px-[4%] justify-between'>
          <Link to='/add' className='flex items-center'>
            <p className='text-black text-[30px] sm:text-[34px] font-medium tracking-[-0.065em] leading-none'>
              StyleLoom
            </p>
          </Link>      
          <button onClick={()=>setToken('')} className='h-10 bg-black text-white px-5 sm:px-7 text-xs sm:text-sm tracking-[0.08em] uppercase hover:opacity-80 transition'>Logout</button>
    </div>
  )
}

export default Navbar
