import React from "react";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function MainLayout() {
  return (
    <div className="bg-[#050a13] min-h-screen text-white flex">
      <Navbar />

      <div className="flex-1 ml-64 bg-[#050a13] min-h-screen">
        <Outlet />
      </div>
    </div>
  
  );
}

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
          <Route path="/" element={<Homepage />} />
          </Route>

          <Route path="/signup" element= {<Signup />}/>

        </Routes>
   
    </BrowserRouter>
  );

}






