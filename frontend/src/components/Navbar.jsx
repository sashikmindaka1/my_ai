import React from 'react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const menuList = [

    {
    title: 'New Chat',
    icon: '✎'
  },
  {
    title: 'Explore',
    icon: '◉'
  },
  {
    title: 'Library',
    icon: '▣'
  },
  {
    title: 'Settings',
    icon: '⚙'
  }
  ];




  return (
    <div className={`
        fixed
        left-0
        top-0
        h-screen
        bg-[#08111f]
        border-r
        border-slate-800
       
        transition-all
        duration-300
        ${open ? 'w-72' : 'w-20'}
      `}>
        <div>
         <img src="" alt="" />
        </div>
      
     
    </div>
  )
}
