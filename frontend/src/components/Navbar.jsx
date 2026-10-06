import React, { useState } from 'react'
import chatgpt from '../assets/chatgpt.jpg';
import arrowimg from '../assets/arrow1.jpg';

const menuList = [
  { title: 'New Chat', icon: '✎', url: '/' }, 
  { title: 'Explore', icon: '◉', url: '/explore' },
  { title: 'Library', icon: '▣', url: '/library' },
  { title: 'Settings', icon: '⚙', url: '/settings' }
];

const userDetails = [
  { proPic: chatgpt, name: 'sashik mindaka' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const currentUser = userDetails[0];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-[#08111f] border-r border-slate-800 flex flex-col transition-all duration-300 ${isOpen ? 'w-88' : 'w-26'} overflow-hidden`}>
      
      {/* 1. Header  */}
      <div className='flex flex-col p-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img 
  onClick={() => setIsOpen(!isOpen)} 
  className='w-10 h-10 min-w-[2.5rem] rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity' 
  src={chatgpt} 
  alt="ai profile" 
/>
            
            {/* hide name when close slidebar */}
            <p className={`text-2xl text-amber-50 font-bold whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
              sashik ai
            </p>
          </div>

          {/* Toggle Button  */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-800 rounded">
            <img className={`w-5 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''} ${!isOpen ? 'hidden' : 'block'}`} 
            src={arrowimg} alt="toggle" />
          </button>
        </div>

        {/* Tagline hide*/}
        <p className={`text-amber-50/70 text-[10px] uppercase tracking-widest ml-[3.5rem] mt-1 whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
          Think . Learn . Creative
        </p>
      </div>

      {/* 2. Menu List  */}
      <div className="px-2 mt-4">
        {menuList.map((menu, index) => (
          <a 
            href={menu.url}
            rel="noopener noreferrer"
            key={index} 
            className="flex items-center p-3 text-amber-50 hover:bg-gray-700 rounded-lg transition-colors w-full"
          >
            <span className='text-xl w-6 text-center shrink-0'>{menu.icon}</span>
            
            {/* Title */}
            <span className={`text-base ml-4 whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
              {menu.title}
            </span>
          </a>
        ))}
        <hr className='border-slate-800 mt-4' />
      </div>

      {/* 3. Recent Chats  */}
      <div className="px-4">
  
        <p className={`text-lg text-amber-50 mt-4 whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
          Recent chats
        </p>
      </div>

      {/* 4. Profile  */}
      <div className="mt-auto p-3 mb-2 border-t border-slate-800">
        <button className="flex items-center justify-between w-full p-2 border border-gray-600 rounded-xl hover:bg-gray-700 transition-colors overflow-hidden">
          
          <div className="flex items-center gap-3">
            <img 
              className="w-10 h-10 min-w-[2.5rem] rounded-full object-cover border border-amber-100"
              src={currentUser.proPic}
              alt={currentUser.name}
            />

            <p className={`text-amber-50 font-sans font-medium whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
              {currentUser.name}
            </p>
          </div>


          <span className={`text-[10px] text-black bg-amber-400 px-2 py-1 rounded-md font-bold whitespace-nowrap transition-all duration-300 ${!isOpen ? 'hidden' : 'block'}`}>
            PRO
          </span>

        </button>
      </div>

    </div>
  )
}