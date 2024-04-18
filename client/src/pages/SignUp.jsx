import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoader(true)
    try{
      const fetchData = async() => {
        const response = await fetch('http://localhost:3000/api/auth/signup',{
          method: 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData)
        })
        const res = await response.json()
        if(res.success === false){
          setLoader(false)
          setError(res.message)
          console.log(res)
          return
        }
        setLoader(false)
        navigate('/sign-in')
      }
      fetchData()
    }catch(e){
      setLoader(false)
      setError(e.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loader} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loader ? 'loading...' : 'Sing Up'}</button>
      </form >
      <div className='flex gap-2 mt-5' >
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
