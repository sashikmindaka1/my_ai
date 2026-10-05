import React from 'react'
import { useState } from 'react'
import chatgpt from '../assets/chatgpt.jpg';

// my icons and titles in navbar
const menuList = [
  { title: 'New Chat', icon: '✎', url: 'https://www.sashikmindaka.dev/' }, 
  { title: 'Explore', icon: '◉', url: '/explore' },
  { title: 'Library', icon: '▣', url: '/library' },
  { title: 'Settings', icon: '⚙', url: '/settings' }
];


export default function Navbar() {
  const [open, setOpen] = useState(true);
  


  


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
          <span className='flex items-center gap-4'>
           <img className=' ml-3  mt-3 w-14' src={chatgpt} alt="ai" />
           <p className='text-3xl text-amber-50'>sashik ai</p><br />
           
           </span>
           <p className='text-amber-50 ml-22 mb-7'>Think . Learn .Creative</p>
        </div>



        <div>
          {menuList.map((menu, index) => (
           <a 
           href={menu.url}
           target='_blank'
           key={index} 
           className="flex items-center p-3 text-amber-50 hover:bg-gray-700 rounded-lg transition-colors w-full"
           >
           <span className='text-xl w-6 text-center'>{menu.icon}
           </span>
           <span className='text-xl ml-5'>{menu.title}
           </span>
         </a>
          ))}


        <hr className='text-amber-50 mt-6'  />
        </div>

        <div>
          <span>
           <p className='text-2xl text-amber-50 mt-5 ml-6'>Recent chats</p>
          </span>
          
        </div>
        

    </div>
  )
}
