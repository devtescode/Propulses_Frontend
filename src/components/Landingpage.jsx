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
  const AdminBtn = () => {
    navigate("/admin")
  }
  return (
    <>

      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
                <a class="nav-link" href="#" onClick={AdminBtn}>Admin</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="landing-clippysyl">
      </div>
      <div className='landivonerealone'>
        <div className='landivone'>
          <div className='landiveachone'>
            <div className='col-md-11 col-sm-11 landpadding'>
              <div className='textstylewelcome'>
                <h1 className='fw-bold'>Welcome to Propulses where your financial aspirations take flight!</h1>
              </div>
              <div className='text-center mt-3 textstyleStart'>
                <p className='fs-5 ptagstyle'>Start your investment journey with Propulses and receive an instant $4 bonus! Plus, boost your earnings by referring friends. It's not just an investment; it's a lucrative community. Join now and watch your wealth grow!</p>
              </div>
              <div>
                <button className='landBtnstyle btn btn-dark' onClick={LandingRegisterBTn}>Register</button>
                <button className='landBtnstyle btn btn-dark mx-2' onClick={LandingLoginBtn}>Login</button>
              </div>
            </div>
          </div>
        </div>

        <div className='landiveachtwo'>
          <div className='landiveachtwoImg '>

          </div>
        </div>

      </div>

      <div class="row col-md-12 col-sm-12 mx-auto divtextlanding mt-4 mt-sm-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Landingpage;