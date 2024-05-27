import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-blue-500 text-white'>
      <div className="logo">
        <span className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mx-9'>iTask</span>
      </div>
    </nav>
  )
}

export default Navbar;
