import React from 'react'
import { useNavigate } from 'react-router'
import "./Landingpage.css"
import smart from '../assets/smartphone.png'
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
                <h1 className='fw-bold'>Welcome to Propulses
                  where your financial aspirations take flight!</h1>

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

      <div className='mx-auto text-center d-flex justify-content-center'>
        <button class="button" data-text="Awesome">
          <span class="actual-text">&nbsp;How Propulses Work&nbsp;</span>
          <span aria-hidden="true" class="hover-text">How Propulses Work</span>
        </button>
      </div>

      <div class="row col-md-12 col-sm-12 mx-auto divtextlanding mt-4 mt-sm-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card shadow">
            <div class="card-body">
              <div className='d-flex' style={{ alignItems: "center" }}>
                <div className='howitworks1'>
                </div>
                <div className='mx-2'>
                  <b>
                    Sign Up and Claim Your Instant $4 Bonus:
                  </b>
                </div>
              </div>

              <div className='mt-3'>
                <p>
                  Begin your investment journey by signing up with Propulses. As a welcome gesture, enjoy an instant $4 bonus credited to your account upon registration.
                  This initial boost kickstarts your investment experience and sets the stage for potential earnings.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <div className='d-flex' style={{ alignItems: "center" }}>
                <div className='howitworks2'>
                </div>
                <div className='mx-2'>
                  <b>
                    Refer Friends and Boost Your Earnings:
                  </b>
                </div>
              </div>

              <div className='mt-3'>
                <p>
                  Supercharge your earnings by referring friends, family, and colleagues to Propulses. Share the wealth-building experience with your network and reap the rewards.
                  Receive additional incentives for every successful referral, creating a community where everyone benefits from financial growth.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 mt-sm-0 mt-4">
          <div class="card">
            <div class="card-body">
              <div className='d-flex' style={{ alignItems: "center" }}>
                <div className='howitworks3'>
                </div>
                <div className='mx-2'>
                  <b>
                    Withdraw Funds Seamlessly:
                  </b>
                </div>
              </div>

              <div className='mt-3'>
                <p>
                  When the time comes to reap the rewards of your investments, our seamless withdrawal process ensures a hassle-free experience.
                  Withdraw funds with ease, giving you the flexibility to utilize your returns or reinvest in new opportunities as you continue to build your financial future.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 mt-4">
          <div class="card">
            <div class="card-body">
              <div className='d-flex' style={{ alignItems: "center" }}>
                <div className='howitworks4'>
                </div>
                <div className='mx-2'>
                  <b>
                  Exceptional Customer Support:
                  </b>
                </div>
              </div>

              <div className='mt-3'>
                <p>
                Experience peace of mind with our dedicated customer support team. Whether you have questions, need assistance, or seek guidance, our team is readily available to ensure your journey with Propulses is smooth and enjoyable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Landingpage;