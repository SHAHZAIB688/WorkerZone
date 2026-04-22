import React from 'react'
import electricianImg from '../assets/electrician.png'
import plumber from '../assets/plumber.jpg'
import painter from '../assets/painter.jpg'
import carpainter from '../assets/carpainter.jpg'
import mason from '../assets/mason.jpg'
import welder from '../assets/welder.jpg'
import roofer from '../assets/roofer.jpg'
import housekeeper from '../assets/housekeeper.jpg'
import cook from '../assets/cook.jpg'
import computertech from '../assets/ComputerTechnician.jpg'
import security from '../assets/SecuritySystemInstaller.jpg'
import loader from '../assets/loader.jpg'
import gardener from '../assets/gardner.jpg'
import guard from '../assets/guard.jpg'
import Categories from './Categories'
import Cards from './Cards'

const Home = () => {
  const categories = [
    { name: "Electrician", img: electricianImg, link: "/electrician" },
    { name: "Plumber", img: plumber, link: "/plumber" },
    { name: "Painter", img: painter, link: "/painter" },
    { name: "Carpenter", img: carpainter, link: "/carpenter" },
    { name: "Mason", img: mason, link: "/mason" },
    { name: "Welder", img: welder, link: "/welder" },
    { name: "Roofer", img: roofer, link: "/roofer" },
    { name: "Housekeeper", img: housekeeper, link: "/housekeeper" },
    { name: "Cook", img: cook, link: "/cook" },
    { name: "Computer Technician", img: computertech, link: "/computer-tech" },
    { name: "Security System Installer", img: security, link: "/security-installer" },
    { name: "Loader", img: loader, link: "/loader" },
    { name: "Gardener", img: gardener, link: "/gardener" },
    { name: "Security Guard", img: guard, link: "/security-guard" },
  ]

  return (
    <>
      <Categories />
      <div className='flex  flex-wrap gap-5 m-5  justify-start px-5 '>
        {categories.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className='w-40 flex flex-col items-center'
          >
            {/* Image as background */}
            <div
              className='w-30 h-30 rounded-md bg-cover bg-center shadow-md hover:scale-105 transition-transform'
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>

            {/* Name below the image */}
            <span className='mt-2 font-medium text-gray-800 text-center'>{item.name}</span>
          </a>
        ))}
        <Cards />
      </div>
    </>
  )
}

export default Home
