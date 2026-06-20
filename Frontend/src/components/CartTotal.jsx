import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = typeof getCartAmount === 'function' ? getCartAmount() : 0
  const shippingFee = subtotal === 0 ? 0 : delivery_fee || 10
  const total = subtotal === 0 ? 0 : subtotal + shippingFee

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between py-3 border-b border-[#e8ded4]'>
        <p className='text-[#666] text-[14px]'>Subtotal</p>
        <p className='text-black text-[14px]'>
          {currency}{subtotal}.00
        </p>
      </div>

      <div className='flex items-center justify-between py-3 border-b border-[#e8ded4]'>
        <p className='text-[#666] text-[14px]'>Shipping Fee</p>
        <p className='text-black text-[14px]'>
          {currency}{shippingFee}.00
        </p>
      </div>

      <div className='flex items-center justify-between pt-4'>
        <p className='text-black text-[16px] font-medium'>Total</p>
        <p className='text-black text-[18px] font-medium'>
          {currency}{total}.00
        </p>
      </div>
    </div>
  )
}

export default CartTotal
