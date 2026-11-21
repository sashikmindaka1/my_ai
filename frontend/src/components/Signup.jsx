import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const goBackHome = () => {
    navigate("/");
  };

  // Google Auth 
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Google authentication failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch (err) {
      console.error("Google Auth Error:", err);
      alert("Server error during Google login");
    }
  };

  // Email + Password Signup -> Backend save in db
  const handleContinue = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please enter email, password, and name.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error saving user");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      alert("Cannot connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className='bg-black min-h-screen'>
      <p className='text-3xl text-amber-50 absolute top-8 left-8'>
        Sashik Ai
      </p>

      {!user ? (
        <>
          <p className='text-6xl text-amber-50 text-center pt-30 font-bold'>
            create new account
          </p>

          {/* Email Input */}
          <div className='flex items-center justify-center mt-15'>
            <input
              type="email"
              placeholder='enter email adddress'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-100 h-14 bg-[#111827] text-white placeholder-gray-400 px-5 py-4 rounded-full border border-slate-700 focus:outline-none focus:border-b-blue-900 focus:ring-1 focus:ring-blue-900 shadow-lg transition-all duration-300'
            />
          </div>

          {/* Password Input */}
          <div className='flex items-center justify-center mt-5'>
            <input
              type="password"
              placeholder='enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-100 h-14 bg-[#111827] text-white placeholder-gray-400 px-5 py-4 rounded-full border border-slate-700 focus:outline-none focus:border-b-blue-900 focus:ring-1 focus:ring-blue-900 shadow-lg transition-all duration-300'
            />
          </div>

          {/* Name Input */}
          <div className='flex items-center justify-center mt-5'>
            <input
              type="text"
              placeholder='enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-100 h-14 bg-[#111827] text-white placeholder-gray-400 px-5 py-4 rounded-full border border-slate-700 focus:outline-none focus:border-b-blue-900 focus:ring-1 focus:ring-blue-900 shadow-lg transition-all duration-300'
            />
          </div>

          {/* Continue Button */}
          <div className='flex justify-center items-center pt-5'>
            <button
              type="button"
              onClick={handleContinue}
              disabled={loading}
              className='text-2xl text-black bg-amber-50 border-2 border-r-2 rounded-full p-3 px-38 hover:bg-gray-600 hover:border-gray-600 cursor-pointer disabled:opacity-50'
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </div>

          <div className="flex items-center justify-center my-4 w-full">
            <hr className="w-1/4 border-amber-50" />
            <p className='mx-4 text-2xl text-amber-50'>OR</p>
            <hr className="w-1/4 border-amber-50" />
          </div>

          {/* Google signup and login */}
          <div className='flex justify-center items-center mt-6 scale-155'>
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
          <img
            src={user.picture || user.avatar}
            alt="Profile"
            className='w-24 h-24 rounded-full mb-4 border-2 border-amber-50'
          />
          <h2 className='text-4xl text-amber-50 mb-2'>Welcome, {user.name}!</h2>
          <p className='text-xl text-gray-400 mb-8'>{user.email}</p>

          <button
            type="button"
            onClick={handleLogout}
            className='text-xl text-black bg-amber-50 border-2 rounded-full p-2 px-10 hover:bg-gray-400 cursor-pointer'
          >
            Logout
          </button>
        </div>
      )}

      <button
        type="button"
        className='fixed top-10 right-10 bg-amber-50 text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-blue-950 hover:text-amber-50 cursor-pointer'
        onClick={goBackHome}
      >
        back
      </button>
    </div>
  );
}