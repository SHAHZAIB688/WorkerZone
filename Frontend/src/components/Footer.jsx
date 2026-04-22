import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaArrowCircleUp } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='flex flex-col w-full bg-zinc-200'>
      <div className='border-t flex justify-center  border-zinc-400 h-70'>
        <div className='flex flex-row gap-12'>
            <div className='flex flex-col gap-3 p-10 '>
                <h1 className='font-bold'>Popular Categories</h1>
                <div className='flex flex-col gap-1'>
                <a href="">Electrician</a>
                <a href="">Plumber</a>
                <a href="">Welder</a>
                <a href="">Chef</a>
                </div>
            </div>
            <div className='flex flex-col gap-3 p-10 '>
                <h1 className='font-bold'>Trending Searches</h1>
                <div className='flex flex-col gap-1'>
                <a href="">Chef</a>
                <a href="">Plumber</a>
                <a href="">Electrician</a>
                <a href="">Welder</a>
                </div>
            </div>
            <div className='flex flex-col gap-3 p-10 '>
                <h1 className='font-bold'>About Us</h1>
                <div className='flex flex-col gap-1'>
                <a href="">Contact Us</a>
                <a href="">Blog</a>
                <a href="">Careers</a>
                </div>
            </div>
            <div className='flex flex-col gap-3 p-10 '>
                <h1 className='font-bold'>Worker Zone</h1>
                <div className='flex flex-col gap-1'>
                <a href="">Privacy Policy</a>
                <a href="">Help</a>
                <a href="">Terms of Use</a>
                </div>
            </div>
            <div className='flex flex-col gap-5 p-10 '>
                <h1 className='font-bold'>Follow Us</h1>
                <div className='flex flex-row gap-3'>
                <FaFacebook size={30} className='hover:cursor-pointer'/>
                <FaXTwitter size={30} className='hover:cursor-pointer'/>
                <IoLogoYoutube size={30} className='hover:cursor-pointer'/>
                <FaInstagram size={30} className='hover:cursor-pointer'/>
                </div>
                <div className='mt-10 flex cursor-pointer justify-end'>
                    <FaArrowCircleUp href='' size={30}/>
                </div>
            </div>
        </div>
      </div>
      <div className='text-md text-center items-center flex justify-center h-10 bg-blue-600'>
              © {new Date().getFullYear()} Worker Zone. All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
