import React, { useEffect, useState } from 'react'
import "./Narbar.css"
import { Outlet, useNavigate } from 'react-router'

const Narvarbar = ({ user }) => {
    const navigate = useNavigate()
    const toggleOffcanvas = () => {
        let offcanvas = document.getElementById('offcanvasDark');
        offcanvas.style.display = (offcanvas.style.display === 'none' || offcanvas.style.display === '') ? 'block' : 'none';
        console.log(window.innerWidth);
    }
    useEffect(() => {
        localStorage.setItem('width', 73)
        localStorage.setItem('margin', 25)
    })
    const closeOffcanvas = () => {
        let offcanvas = document.getElementById('offcanvasDark');
        offcanvas.style.display = 'none';
    }
    const profileBtn = () => {
        let navbardisp = document.getElementById('navbardisp');
        if (navbardisp.style.display === 'none' || navbardisp.style.display === '') {
            navbardisp.style.display = 'block';
        } else {
            navbardisp.style.display = 'none';
        }
    }
    const AddaccBtn = () => {
        navigate("/addaccount")
    }
    const dashboardBtn = () => {
        navigate("/dashboard")
    }
    const changepassBtn = () => {
        navigate("/changepassword")
    }
    const converterBtn = () => {
        navigate("/converter")
    }
    const ReferralBtn = () => {
        navigate("/referral")
    }
    const profileBtnpage=()=>{
        navigate("/profile")
    }
    const withdrawHisBtn=()=>{
        navigate("/withdrawalhistory")
    }
    // const spinnergameBtn=()=>{
    //     navigate("/spinner")
    // }
    const PuzzleBtn=()=>{
        navigate("/puzzle")
    }

    const Puzzlehistory=()=>{
        navigate("/puzzlehis")
    }
    // const [user, setUser] = useState("")
    let token = localStorage.token

    // let mode = "black";
    // if(!localStorage.mode){
    //     localStorage.setItem('mode', 'white');
    // }
    // const inputBtn = () => {
    //     if (localStorage.mode=="white") {
    //         localStorage.setItem('mode', 'black')

    //     } else if (localStorage.mode=="black") {
    //         localStorage.setItem('mode', 'white');
    //     }
    //     location.reload()
    // }

    const logOut=()=>{
        swal({
            title: "Are you sure?",
            text: "After logging out, you must enter your correct details to log back in.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const willDelete = navigate("/login")
                // setTimeout(() => {
                //     swal("Successfully Logout", {
                //       icon: "success",
                //     });
                // }, 1000);
            }
          });
    }
    
    return (
        // id='dark'
        <div >
            <div className='gridcont'>
                <div className="eachgrid">
                    <div className="offcanvas offcanvas-start show text-bg-dark myoffcanvarespon" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasDark"  aria-labelledby="offcanvasDarkLabel">

                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkLabel"></h5>
                            <button type="button" className="btn-close btn-close-white trigeroffcan btn btn-success" data-bs-dismiss="offcanvasDark" aria-label="Close" onClick={closeOffcanvas}></button>

                        </div>
                        <div className="offcanvas-body ">
                            <div className='divtogrespon'>
                                <div className=''>
                                    <button className='my-4 p-1 givebtnwidth border border-2 rounded-3' onClick={dashboardBtn}>Dashboard</button>
                                </div>

                                <div>
                                    <button className='my-4 p-1 givebtnwidth border border-2 rounded-3' onClick={changepassBtn}>Password</button>
                                </div>

                                <div>
                                    <button className='my-4 p-1 givebtnwidth border border-2 rounded-3' onClick={AddaccBtn}>Add Account</button>
                                </div>

                                <div>
                                    <button className='my-4 p-1 givebtnwidth border border-2 rounded-3' onClick={converterBtn}>Converter</button>
                                </div>

                                <div>
                                    <button onClick={profileBtnpage} className='my-4 p-1 givebtnwidth border border-2 rounded-3'>Profile</button>
                                </div>


                                {/* <div>
                                    <button onClick={spinnergameBtn} className='my-4 p-1 givebtnwidth border border-2 rounded-3'>Spinner</button>
                                </div> */}


                                <div>
                                    <button onClick={PuzzleBtn} className='my-4 p-1 givebtnwidth border border-2 rounded-3'>Puzzle</button>
                                </div>


                                <div>
                                    <button className='my-4 p-1 givebtnwidth border border-2 rounded-3' onClick={ReferralBtn}>Withdrawal</button>
                                </div>

                                <div>
                                    <button onClick={withdrawHisBtn} className='my-4 p-1 givebtnwidth border border-2 rounded-3'>History</button>
                                </div>

                                <div>
                                    <button onClick={Puzzlehistory} className='my-4 p-1 givebtnwidth border border-2 rounded-3'>Puzzle History</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='offcanvastopBTn'>
                        <div className='my-3'>
                            <button className="offcanvas-button btn btn-success resbgcolor mt-3" onClick={toggleOffcanvas}><i className="ri-menu-2-line"></i></button>
                        </div>
                    </div>
                </div>
                <div className='eachgrid '>
                    <nav className="bg-body-tertiary p-1 fixed-top">
                        <div className='navbarprofile my-3' onClick={profileBtn}>

                        </div>
                    </nav>
                    <div className='navbardisp' id='navbardisp'>
                        <div className='text-start d-flex justify-content-between px-3 p-2 eachcolornarbar'>
                            <div className='navbarprofile2'>
                                <p className='text-white fw-bold text-center mt-2'>{user && user?.Username}</p>
                            </div>
                            <div>
                                <span className='fw-bold'>{user && user?.Firstname}</span>
                                <span className='fw-bold mx-1'>{user && user?.Lastname}</span>
                                <h6>{user && user?.Email}</h6>
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between px-3 p-2'>
                            {/* <b>Dark mode</b>
                            <div>
                                <label class="switch" >
                                    <span class="sun"><i class="ri-sun-fill svg"></i></span>
                                    <span class="moon"><i class="ri-moon-fill svg"></i></span>
                                    <input type="checkbox" class="input" id='changmode' />
                                    <span class="slider border" onClick={inputBtn}></span>
                                </label>
                            </div> */}
                        </div>
                        <hr />
                        <div className='text-start px-3 p-2 fw-bold' onClick={logOut} style={{cursor:"pointer"}}>
                            log out<i className="ri-logout-circle-line"></i>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default Narvarbar