import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className='w-[76px] sm:w-[210px] lg:w-[235px] flex-shrink-0 min-h-[calc(100vh-74px)] bg-white border-r border-[#e8ded4]'>
      <div className='flex flex-col gap-2 pt-6 px-3 sm:px-4 text-[14px]'>
          <NavLink className='flex items-center gap-3 border border-[#e8ded4] px-3 py-3 transition hover:bg-[#fbfaf8]' to='/add'>
              <img className='w-5 h-5' src={assets.add_icon} alt="" />
              <p className='hidden sm:block'>Add Items</p>
          </NavLink>
          <NavLink className='flex items-center gap-3 border border-[#e8ded4] px-3 py-3 transition hover:bg-[#fbfaf8]' to='/list'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden sm:block'>List Items</p>
          </NavLink>
          <NavLink className='flex items-center gap-3 border border-[#e8ded4] px-3 py-3 transition hover:bg-[#fbfaf8]' to='/order'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden sm:block'>Orders</p>
          </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
