import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
const Adminpage = () => {
    const [setcon, setsetcon] = useState("")
    const [useradmin, setUseradmin] = useState("")
    useEffect(() => {
      setTimeout(() => {
        navigate("/admin")
      }, 50000);
    },)    
    function randomNumber(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }
    let url = "https://propulses.onrender.com/userinvest/useradmincoupon"
    let admintoken = localStorage.admintoken
    let navigate = useNavigate()
    useEffect(()=>{
        axios.get(url, {
            headers: {
                "Authorization": `Bearers ${admintoken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        .then((res)=>{
            console.log(res.data);
            // if(!res.data.status){
            //     navigate("/admin")
            // }
            if(!localStorage.adminlogin || res.data.status==false){
                navigate("/admin")
            }
        }).catch(err=>{
            console.log(err);
        })
    })
    
    const trigerr = () => {
        const code = randomNumber(15)
        setsetcon(code)
        let url2 = "https://propulses.onrender.com/userinvest/sendCode"
        axios.post(url2, {Couponcode: code})
        .then((response) => {
            alert(response.data.message)
            if (response.data.status == true) {

            }
           
            
        })
        .catch((err) => {
            console.log(err);
            alert(response.data.message)
        })
    }

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = setcon;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        swal({
            title: "Success",
            text: "Coupon code copied to clipboard!",
            icon: "success",
            button: "Okay",
        });
    }



    return (
        <>
            <div className='container'>
                <div className="row">
                    <div style={{ backgroundColor: "skyblue" }} className="col-md-6 col-sm-12 p-3 border border-3 rounded-3 mx-auto text-center mt-5">
                        <p>{useradmin}</p>
                        <p className='text-start fw-bold fs-3'>Admin Dashboard</p>
                        <hr />
                        <input disabled type="text" className='form-control my-2 text-center p-3 w-75 mx-auto' onChange={(e) => setsetcon(e.target.value)} placeholder='Generate Coupon Code' style={{ backgroundColor: "#4F46E5" }} />
                        <div className='d-flex justify-content-around py-3 px-5' style={{ alignItems: "center" }}>
                            <p className='mt-3'>{setcon}</p>
                            <button className='btn btn-primary my-2' onClick={copyToClipboard} disabled={!setcon}>Copy<i class="ri-file-copy-fill"></i></button>
                        </div>
                        <button className='btn btn-dark my-2' onClick={trigerr} type='submit'>Coupon<i class="ri-coupon-fill"></i></button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Adminpage