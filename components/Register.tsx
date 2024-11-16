'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import PhoneInput from 'react-phone-input-2'


import 'react-phone-input-2/lib/style.css'

function Register() {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [PIN, setPIN] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending registration data:', { fullName, phone: phoneNumber, password, PIN });
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone: phoneNumber, password, PIN }),
        mode: 'no-cors'
      });

      const data = await response.json();
      if (response.ok) {
        setMsg('Registration successful!');
        setLoading(false)
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setMsg(data.message || 'Registration failed');
        setLoading(false)
      }
    } catch (error) {
      setMsg('An error occurred');
      console.error('Error in registration:', error);
    }
    console.log(msg);
  };


  return (
    <div className="flex flex-col ">
      <form onSubmit={handleRegister} className=" grid grid-cols-1 md:grid-cols-2  gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="!w-full border !border-green3 !rounded-xl px-4 py-1  lg:w-80 duration-200 outline-none"
        />

        <PhoneInput
          country={'in'}
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          containerClass="group !rounded-xl !w-full !h-full !mt-0 "
          inputClass="border !border-green3 !py-1 !border-l-0 duration-200 !rounded-xl !h-full"
          buttonClass="border !border-green3 !border-r-0 duration-200 !bg-white !rounded-l-xl hover:!bg-none !h-full"
          placeholder="+XX XXXXXXXXXX"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="!w-full  border !border-green3 !rounded-xl px-4 py-1  lg:w-80 duration-200 outline-none"
        />
        <input
          type="text"
          placeholder="PIN Code"
          value={PIN}
          onChange={(e) => setPIN(e.target.value)}
          className="!w-full  border !border-green3 !rounded-xl px-4 py-1  lg:w-80 duration-200 outline-none"
        />

        <div className="w-full flex flex-col items-center justify-center col-span-2">
          <button type="submit" className=" font-semibold tracking-wide rounded-3xl px-6 py-2 bg-green3 hover:bg-green4 duration-200 text-white" onClick={()=>setLoading(true)}>
            Register
          </button>
          {
            loading 
            ? <span className='flex-gtm-center gap-2 py-4'> <span className='border-4 rounded-full border-green2 border-l-green3  animate-spin h-5 w-5'></span> <p className='text-sm text-semibold text-head'>Registering ...</p> </span>
            : <p className={`w-full text-center  ${msg==="Registration successful!" ? 'text-green3' : 'text-red-400'} text-sm py-4`}>{msg}. Redirecting you to login page... </p> 
          }
        </div>
      </form>
    </div>
  )
}

export default Register;
