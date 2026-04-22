import React from 'react'
import img from '../assets/welder.jpg'
const Cards = () => {
    const data=[
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
        {title:'Welder',location:'Bata purr',listed:'2 hours ago',img:img},
    ]
  return (
    <div className='m-5 flex flex-wrap flex-row gap-5 items-center justify-center'>
      {data.map((card,index)=>{
        return (
            <div key={index} className='border border-zinc-400 rounded-md p-2 w-75 h-95'>
                <img src={card.img} alt="" />
                <div>
                    <h1 className='font-bold'>{card.title}</h1>
                    <h3 className='text-sm text-gray-500'>{card.location}</h3>
                    <h3 className='text-sm text-gray-500'>{card.listed}</h3>
                </div>
            </div>
        )
      })}
    </div>
  )
}

export default Cards
