import React, { useContext, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Search, LogIn, LogOut, Package, Info, Mail, ShoppingBag, Menu, X, Truck } from 'lucide-react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext)

  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  // Navbar links
  const menuLinks = [
    { name: 'Men', path: '/collection?category=Men' },
    { name: 'Women', path: '/collection?category=Women' },
    { name: 'Collections', path: '/collection' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ]

  return (
    <header className='w-full bg-[#fbfaf8]'>

      {/* Top shipping strip */}
      <div className='h-10 bg-[#f3eee8] border-b border-[#e9dfd4] flex items-center justify-center gap-2 text-[#111]'>
        <Truck size={14} strokeWidth={1.45} />
        <p className='text-[13px] sm:text-[14px] font-normal tracking-[-0.01em]'>
          Free shipping on orders above ₹999
        </p>
      </div>

      {/* Main navbar */}
      <nav className='h-[82px] bg-white '>
        <div className='h-full flex items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-16'>

          {/* Logo */}
          <Link to='/' className='flex items-center'>
            <p className='text-black text-[30px] sm:text-[34px] font-medium tracking-[-0.065em] leading-none'>
              StyleLoom
            </p>
          </Link>

          {/* Desktop menu */}
          <ul className='hidden lg:flex items-center gap-11 xl:gap-12'>
            {menuLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className='group text-[15px] font-light text-[#111] tracking-[-0.015em]'
                >
                  <div className='flex flex-col items-center gap-[7px]'>
                    <span>{item.name}</span>
                    <span
                      className={`h-[1.5px] bg-zinc-800 transition-all duration-300 ${`${location.pathname}${location.search}` === item.path ? 'w-5' : 'w-0 group-hover:w-full'}`}
                    ></span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className='flex items-center gap-6 sm:gap-7 text-black'>

            {/* Search */}
            <button
              onClick={() => {
                setShowSearch(true)
                navigate('/collection')
              }}
              className='hover:opacity-60 transition'
              aria-label='Search'
            >
              <Search size={24} strokeWidth={1.55} />
            </button>

            {/* Account */}
            <button
              onClick={token ? logout : () => navigate('/login')}
              className='hidden sm:flex items-center gap-2 hover:opacity-60 transition'
              aria-label={token ? 'Logout' : 'Login'}
            >
              {token
                ? <LogOut size={23} strokeWidth={1.55} />
                : <LogIn size={23} strokeWidth={1.55} />}
              <span className='hidden xl:inline text-[14px]'>
                {token ? 'Logout' : 'Login'}
              </span>
            </button>

            {/* Cart */}
            <Link to='/cart' className='relative hover:opacity-60 transition'>
              <ShoppingBag size={24} strokeWidth={1.55} />

              <p className='absolute right-[-7px] bottom-[-6px] min-w-[15px] h-[15px] px-[4px] bg-black text-white rounded-full text-[8px] flex items-center justify-center leading-none'>
                {getCartCount()}
              </p>
            </Link>

            {/* Sidebar menu */}
            <button
              onClick={() => setVisible(true)}
              className='hover:opacity-60 transition'
              aria-label='Open menu'
            >
              <Menu size={24} strokeWidth={1.55} />
            </button>

          </div>
        </div>
      </nav>

      {/* Sidebar backdrop */}
      <button
        type='button'
        onClick={() => setVisible(false)}
        className={`fixed inset-0 z-[70] bg-black/25 transition-opacity duration-300 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-label='Close menu'
      />

      {/* Sidebar menu */}
      <aside className={`fixed top-0 right-0 bottom-0 z-[80] w-[86%] max-w-[360px] bg-[#fbfaf8] shadow-[-12px_0_40px_rgba(0,0,0,0.1)] transition-transform duration-300 overflow-y-auto ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='h-full flex flex-col'>

          {/* Mobile menu top */}
          <div className='flex items-center justify-between px-5 py-5 border-b border-[#e8ded4]'>
            <p className='text-black text-[30px] font-medium tracking-[-0.065em]'>
              StyleLoom
            </p>

            <button
              onClick={() => setVisible(false)}
              className='text-black hover:opacity-60 transition'
              aria-label='Close menu'
            >
              <X size={24} strokeWidth={1.55} />
            </button>
          </div>

          {/* Collection preview */}
          <Link
            to='/collection'
            onClick={() => setVisible(false)}
            className='relative h-[170px] mx-5 mt-5 flex-shrink-0 overflow-hidden group'
          >
            <img
              src={assets.hero_img}
              alt="Explore StyleLoom SS'26 collection"
              className='absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent' />
            <div className='absolute left-4 right-4 bottom-4 text-white'>
              <p className='text-[9px] tracking-[0.26em] uppercase text-white/80'>SS'26 Edit</p>
              <div className='mt-1 flex items-end justify-between gap-3'>
                <p className='text-[20px] font-medium tracking-[-0.03em]'>Shop Collection</p>
                <span className='text-[18px] leading-none' aria-hidden='true'>→</span>
              </div>
            </div>
          </Link>

          {/* Shop links */}
          <div className='flex flex-col px-5 pt-5'>
            <p className='pb-2 text-[10px] text-[#9b8977] tracking-[0.24em] uppercase'>
              Shop
            </p>

            {menuLinks
              .filter((item) => ['Men', 'Women'].includes(item.name))
              .map((item) => (
              <NavLink
                key={item.name}
                onClick={() => setVisible(false)}
                to={item.path}
                className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black tracking-[0.03em]'
              >
                {item.name}
              </NavLink>
              ))}
          </div>

          {/* Account and company links */}
          <div className='flex flex-col px-5 pt-6'>
            <p className='pb-2 text-[10px] text-[#9b8977] tracking-[0.24em] uppercase'>
              More
            </p>

            <NavLink
              onClick={() => setVisible(false)}
              to={token ? '/orders' : '/login'}
              className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black flex items-center gap-3'
            >
              <Package size={18} strokeWidth={1.5} />
              Orders
            </NavLink>

            {!token && (
              <NavLink
                onClick={() => setVisible(false)}
                to='/login'
                className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black flex items-center gap-3'
              >
                <LogIn size={18} strokeWidth={1.5} />
                Login
              </NavLink>
            )}

            <NavLink
              onClick={() => setVisible(false)}
              to='/about'
              className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black flex items-center gap-3'
            >
              <Info size={18} strokeWidth={1.5} />
              About Us
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              to='/contact'
              className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black flex items-center gap-3'
            >
              <Mail size={18} strokeWidth={1.5} />
              Contact
            </NavLink>

            {token && (
              <button
                type='button'
                onClick={() => {
                  setVisible(false)
                  logout()
                }}
                className='py-4 border-b border-[#e8ded4] text-[15px] font-normal text-black flex items-center gap-3 text-left hover:text-[#8c7a6b] transition'
              >
                <LogOut size={18} strokeWidth={1.5} />
                Logout
              </button>
            )}
          </div>

          {/* Small bottom text */}
          <div className='mt-auto px-5 py-6 border-t border-[#e8ded4]'>
            <p className='text-xs text-[#777] font-normal tracking-[0.08em] uppercase'>
              Everyday fashion, cleanly curated.
            </p>
          </div>

        </div>
      </aside>
    </header>
  )
}

export default Navbar
