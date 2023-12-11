import React from 'react'
import { useNavigate } from 'react-router'
import "./Landingpage.css"
const Landingpage = () => {
  const navigate = useNavigate()
  const LandingRegisterBTn = () => {
    navigate("/signup")
  }
  const LandingLoginBtn = () => {
    navigate("/login")
  }
  return (
    <>
      {/* <button className='btn btn-success' onClick={LandingRegisterBTn}>Register</button>
      <button className='btn btn-dark' onClick={LandingLoginBtn}>Login</button> */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid px-2 px-md-5 p-2">
          <a class="navbar-brand bg-success NavberImg" href="#"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end text-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='landivone'>
        <div className='landiveachone'>
          <div className='textstylewelcome'>
            <h3>Welcome to Propulses where your financial aspirations take flight!</h3>
          </div>
          <div className='text-center mt-5 textstyleStart'>
            <p>Start your investment journey with Propulses and receive an instant $4 bonus! Plus, boost your earnings by referring friends. It's not just an investment; it's a lucrative community. Join now and watch your wealth grow!</p>
          </div>
        </div>
        <div className='landiveachtwo'>2</div>
      </div>
    </>
  )
}

export default Landingpage;