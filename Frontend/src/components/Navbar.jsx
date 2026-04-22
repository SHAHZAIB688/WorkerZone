import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-between bg-blue-500 py-3 px-5 items-center '>

      {/* Left Section */}
      <div className='flex gap-6 items-center'>
        <Link className='text-2xl font-semibold text-white' to={'/'}>
          Worker Zone
        </Link>

      </div>

      {/* Search Section */}
      <div className="w-120 flex items-center bg-white rounded-md overflow-hidden shadow-sm">
        <div className="px-3 text-gray-500">
          <FaLocationDot size={18} />
        </div>

        <input
          className="w-full outline-none  px-2"
          type="text"
          placeholder="Search workers, services..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white flex items-center justify-center transition">
          <CiSearch size={22}  />
        </button>
      </div>

      {/* Right Section */}
      <div className='gap-5 flex items-center'>
        <a href="" className='text-white'>Become a Worker</a>

        <Link to={'/login'}  className='text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md'>
          Login
        </Link>

        <Link to={'/signup'} className='text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md'>
          Sign Up
        </Link>
      </div>

    </div>
  )
}

export default Navbar
