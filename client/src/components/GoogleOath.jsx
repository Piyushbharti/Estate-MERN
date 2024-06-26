import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
const GoogleOath = () => {
    const handleGoogleClick = async() => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
  )
}

export default GoogleOath
