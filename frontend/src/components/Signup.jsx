import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const [user, setUser] = useState(null);

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Details:", decoded);
    setUser(decoded);
  }

  return (
    <div className='bg-black min-h-screen'>
      <p className='text-3xl text-amber-50 absolute top-8 left-8'>
        Sashik Ai
      </p>

      {/* Show the form if the user is not logged in yet */}
      {!user ? (
        <> {/* Used a fragment <> instead of div to fix the tag mismatch error */}
          <p className='text-6xl text-amber-50 text-center pt-30 font-bold'>
            Login or Sign up
          </p>

          <div className='flex items-center justify-center mt-15'>
            <input 
              type="text" 
              placeholder='enter email adddress' 
              className='w-100 h-14 bg-[#111827] text-white placeholder-gray-400 px-5 py-4 rounded-full border border-slate-700 focus:outline-none focus:border-b-blue-900 focus:ring-1 focus:ring-blue-900 shadow-lg transition-all duration-300 ' 
            />
          </div>

          <div className='flex justify-center items-center pt-5'>
            <button className='text-2xl text-black bg-amber-50 border-2 border-r-2 rounded-full p-3 px-38 hover:bg-gray-600 hover:border-gray-600 '>
              Continue
            </button>
          </div>

          <div className="flex items-center justify-center my-4 w-full">
             <hr className="w-1/4 border-amber-50" />
             <p className='mx-4 text-2xl text-amber-50'>OR</p>
             <hr className="w-1/4 border-amber-50" />
          </div>

          {/* Google signup and login */}
          <div className='flex justify-center items-center mt-6 scale-155 '>
            <GoogleLogin 
              onSuccess={handleSuccess} 
              onError={() => console.log('Login Failed')} 
              theme="filled_black" 
              shape="pill" 
              size="large"      
              width="260"
              text="continue_with"
            />
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center pt-40'>
          {/* UI displayed after the user logs in */}
          <img 
            src={user.picture} 
            alt="Profile" 
            className='w-24 h-24 rounded-full mb-4 border-2 border-amber-50' 
          />
          <h2 className='text-4xl text-amber-50 mb-2'>Welcome, {user.name}!</h2>
          <p className='text-xl text-gray-400 mb-8'>{user.email}</p>
          
          <button 
            onClick={() => setUser(null)}
            className='text-xl text-black bg-amber-50 border-2 rounded-full p-2 px-10 hover:bg-gray-400'
          >
            Logout
          </button>
        </div>
      )}
      
    </div>
  )
}