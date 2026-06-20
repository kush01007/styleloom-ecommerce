import React from 'react';
import NavBar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login.jsx';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const currency = '₹';

import { useState,useEffect } from 'react';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):''); 
  useEffect(()=>{
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-[#fbfaf8] min-h-screen text-[#222]">
    <ToastContainer/>
      {token === '' ? (
        <Login setToken={setToken}  />
      ) : (
        <>
          <NavBar setToken={setToken}/>
          <div className="flex w-full border-t border-[#e8ded4]">
            <Sidebar />
            <main className="flex-1 min-w-0 px-4 sm:px-7 lg:px-10 py-7 sm:py-9 text-[#444] text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}  />} />
                <Route path="/order" element={<Orders token={token} />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
