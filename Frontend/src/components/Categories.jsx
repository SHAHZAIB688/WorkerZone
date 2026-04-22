import React from 'react'

const Categories = () => {
  return (
    <div className='m-5 px-5 font-semibold '>
      <div className="dropdown">

      </div>
      <div className='flex flex-row gap-5'>
        {['Home','Plumber','Welder','Electrician','Painter','Cook'].map((links,index)=>{
           return <a  key={index} className='hover:text-blue-500' href="">{links}</a>

        })}
      </div>
    </div>
  )
}

export default Categories
