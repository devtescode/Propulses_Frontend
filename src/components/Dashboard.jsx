import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import Narvarbar from './Narvarbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import first from '../assets/first.avif'
import second from '../assets/second.avif'
import third from '../assets/third.avif'
import fourth from '../assets/fourth.avif'

const Dashboard = () => {
    const navigate = useNavigate()
    let url = "https://propulses.onrender.com/userinvest/dashboard"
    useEffect(() => {
        setTimeout(() => {
            // alert("login expired you are allow to login again")
            navigate("/login")
        },500000);
    },[])
    
    const [user, setUser] = useState("")
    useEffect(() => {
        let token = localStorage.token
        axios.get(url, {
            headers: {
                "Authorization": `Bearers ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if(!localStorage.useradminlogin || response.data.status==false){
                    navigate("/login")
                }
                // console.log(response);
                // if (!localStorage.token) {
                //     console.log("wrong token");
                //     navigate("/login")
                // }
                else {
                    // console.log("welcome");
                    setUser(response.data.user)
                    // console.log(response.data.user);
                }
            })
    }, [])

    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })

    return (
        <div id='body' style={{backgroundColor:localStorage.mode?localStorage.mode:"white"}}>
            <Narvarbar user={user}/>
            <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='p-3 d-flex'>
                    <div>
                        <h5 style={{color:localStorage.mode=="black"?'white':'black'}}>Welcome Back,</h5>
                    </div>
                    <div className='mx-1'>
                        <h5 style={{color:localStorage.mode=="black"?'white':'black'}}>{user && user?.Username}</h5>
                    </div>
                </div>
                <div class="container text-center">
                    <div class="row col-md-11 col-sm-6 gap-2 mt-4 mx-auto">
                        <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Welcome Bonus</h6>
                                </div>
                                <div>
                                    <h1>${user?.Welcomebonus}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Referral Earning </h6>
                                </div>
                                <div>
                                    <h1>${user?.Balance}</h1>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Earnings Balance</h6>
                                </div>
                                <div>
                                    <h1>$12</h1>
                                </div>
                            </div>
                        </div> */}
                        {/* <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Earnings Balance</h6>
                                </div>
                                <div>
                                    <h1>$12</h1>
                                </div>
                            </div>
                        </div> */}
                        <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Amount Referral</h6>
                                </div>
                                <div>
                                    <h1>${user?.TotalBalance}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="col border border-2 rounded-3 dashboard-bg">
                            <div className='styleTop mx-3'>
                                <div className=''>
                                    <h6>Total Number Referral</h6>
                                </div>
                                <div>
                                    <h1>{user && user.Totalrefrral}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex mt-5 gap-2 styleReferral">
                    <label class="fw-bold bg-body-tertiary p-2 border border-2 rounded-2 bg-success">Referral Link</label>
                    <div class="">
                        <Link to={"/signup?referralcode=" + user.Username}>
                            <input type="text" class="form-control shadow p-2" value={"https://propulses.onrender.com/signup/?referralcode=" + user.Username} />
                        </Link>
                    </div>
                </div>
              
                <div className='displayimgdiv gap-4'>
                    <div className=''>
                        <img src={first} class="rounded imgwidth border border-2" alt="..." />
                    </div>
                    <div>
                        <img src={third} class="rounded imgwidth border border-2" alt="..." />
                    </div>
                </div>
                <div className='displayimgdiv gap-4'>
                    <div className=''>
                        <img src={second} class="rounded imgwidth border border-2" alt="..." />
                    </div>
                    <div>
                        <img src={fourth} class="rounded imgwidth border border-2" alt="..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard