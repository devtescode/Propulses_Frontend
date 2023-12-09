import React, { useState, useEffect } from 'react'
import Narvarbar from './Narvarbar'
import axios from 'axios'
import "./Profilepage.css"
import imagelocate from "../assets/profileusers.avif"
const Profilepage = () => {
    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })
    const [file, setfile] = useState("");
    const [image, setimage] = useState("");
    let url1 = "https://propulses.onrender.com/userinvest/dashboard"
    let url = "https://propulses.onrender.com/userinvest/profilepage"
    const getfile = (e) => {
        const myfile = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(myfile);
        reader.onload = () => {
            setfile(reader.result);
        };
    };
    const myupload = () => {
        const userData = { file, token: localStorage.token };
        console.log(userData);
        axios.post(url, userData).then((response) => {
            swal({
                title: "",
                text: response.data.message,
                icon: "warning",
                button: "Aww yiss!",
            });
            if (response.data.status == true) {
                setimage(response.data.image);
                swal({
                    title: "Good job!",
                    text: response.data.message,
                    icon: "success",
                    button: "Okay",
                });
            }
        });
    }


    useEffect(() => {
        let token = localStorage.token
        axios.get(url1, {
            headers: {
                "Authorization": `Bearers ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (!localStorage.useradminlogin || response.data.status == false) {
                    navigate("/login")
                }
                // console.log(response);
                // if (!localStorage.token) {
                //     console.log("wrong token");
                //     navigate("/login")
                // }
                else {
                    // console.log("welcome");
                    setimage(response.data.user.Uploadimg)
                    // console.log(response.data.user);
                }
            })
    }, [])
    return (
        <>
            <Narvarbar />
            <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='mx-auto mt-5 imgDiv shadow-lg'>
                    <img src={image ? image : imagelocate} className='mx-auto imgDiv2' alt="" />
                </div>
                <div className='text-center mt-2'>
                    <input type="file" onChange={(e) => getfile(e)} />
                    <button className='btn btn-dark' style={{ backgroundColor: "#4F46E5" }} onClick={myupload} >Upload</button>
                </div>
            </div>
        </>
    )
}

export default Profilepage