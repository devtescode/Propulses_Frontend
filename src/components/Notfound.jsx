import React from 'react'
import "./Notfound.css"
import { useNavigate } from 'react-router'
const Notfound = () => {
  const navigate = useNavigate()
  const LinkToHome=()=>{
    navigate("/signup")
  }
  return (
    <>
     <div className='notfoundcondiv'>

     </div>
     <div className='BtnHomeDIv'>
      <button className='btn btn-dark text-center mx-auto colourBtnHome' onClick={LinkToHome}>Home</button>
     </div>
    </>
  )
}

export default Notfound;