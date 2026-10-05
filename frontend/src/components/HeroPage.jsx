import React from 'react'
import chatgpt from '../assets/chatgpt.jpg'
import { useNavigate } from 'react-router-dom'

export default function Heropage() {
  const navigate = useNavigate();
  return (
    <div>
     <div  className='flex flex-col items-center justify-center mt-50'>
      <div>
      <img className='w-20' 
      src={chatgpt} 
      alt="sashik ai" 
      />
      </div>

      <div>
        <p className='text-6xl text-amber-50'>What's on your mind today?</p>
      </div>

      <div>

        <input 
          type="text" 
          placeholder="Type anything..." 
          className="w-170 h-17 mt-15 bg-[#111827] text-white placeholder-gray-400 px-5 py-4 rounded-full border border-slate-700 focus:outline-none focus:border-b-blue-900 focus:ring-1 focus:ring-blue-900 shadow-lg transition-all duration-300" 
/>
      </div>
      <div>
        <button className='absolute top-4 right-3 px-8 py-2 bg-amber-50 text-black border-2 rounded-full hover:bg-black hover:text-amber-50' onClick={() => navigate('/signup')} >sign up</button>
      </div>
    </div>
   
    </div>
  )
}
