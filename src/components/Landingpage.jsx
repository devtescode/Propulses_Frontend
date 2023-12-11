import React from 'react'
import { useNavigate } from 'react-router'

const Landingpage = () => {
    const navigate = useNavigate()
    const LandingRegisterBTn=()=>{
        navigate("/signup")
    }
    const LandingLoginBtn=()=>{
        navigate("/login")
    }
  return (
    <>
    <div>Landingpage</div>
    <button className='btn btn-success' onClick={LandingRegisterBTn}>Register</button>
    <button className='btn btn-dark' onClick={LandingLoginBtn}>Login</button>
    </>
  )
}

export default Landingpage;