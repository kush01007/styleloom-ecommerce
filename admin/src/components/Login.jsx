import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import { toast } from 'react-toastify';

import { backendUrl } from '../App';


const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async (e) =>{
        try{
            e.preventDefault();
            const response=await axios.post(`${backendUrl}/api/user/admin`,{email,password})
            if(response.data.success){
              setToken(response.data.token)

            }else{
              toast.error(response.data.message)

            }
        }
        catch (error){
            console.log(error);
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen bg-[#f3eee8] flex items-center justify-center w-full px-4'>
      <div className='w-full max-w-[390px] bg-white border border-[#d8cabc] px-6 sm:px-8 py-8'>
        <p className='text-[#9b8977] text-[10px] tracking-[0.25em] uppercase mb-2'>StyleLoom</p>
        <h1 className='text-[28px] font-medium tracking-[-0.04em] mb-6'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-4'>
                <p className='text-sm text-[#555] mb-2'>Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full h-11 px-3 outline-none' type="email" placeholder='your@email.com' required/>
            </div>
            <div className='mb-4'>
                <p className='text-sm text-[#555] mb-2'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full h-11 px-3 outline-none' type="password" placeholder='Enter your password' required />
            </div>
            <button className='mt-2 w-full h-11 px-4 text-white bg-black text-[13px] tracking-[0.1em] uppercase hover:opacity-85 transition' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
