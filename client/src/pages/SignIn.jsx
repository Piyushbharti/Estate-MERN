import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { IsLoading, UserData } from '../action';
import GoogleOath from '../components/GoogleOath';

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const isLoading = useSelector((state)=>state.IsLoadingClicked)
  const userData = useSelector((state)=>state.userData)
  // console.log(userData)
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(IsLoading(true))
    try{
      const fetchData = async() => {
        const response = await fetch('http://localhost:3000/api/auth/signIn',{
          method: 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData)
        })
        const res = await response.json()
        dispatch(UserData(res))
        console.log(userData)
        if(res.success === false){
          setLoader(false)
          setError(res.message)
          console.log(res)
          return
        }
        setTimeout(()=>{
          dispatch(IsLoading(false))
          navigate('/')
        },1000)
      }
      fetchData()
    }catch(e){
      dispatch(IsLoading(false))
      setError(e.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{isLoading ? 'loading...' : 'Sing In'}</button>
        <GoogleOath />
      </form >
      <div className='flex gap-2 mt-5' >
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
