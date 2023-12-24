import React, { useEffect, useState } from 'react'
import Narvarbar from './Narvarbar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import "./Changepassword.css"
const Changepassword = () => {

    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })
   
    const formik = useFormik({
        initialValues: {
            currencypass: "",
            newpass: ""
        },
        validationSchema: Yup.object({
            currencypass: Yup.string()
                .required('Required'),
            newpass: Yup.string()
                .required('Required'),

        }),
        onSubmit: values => {
            let token = localStorage.token
            axios.post("https://propulses.onrender.com/userinvest/changepassword", { Currencypassword: values.currencypass, Newpassword: values.newpass, token })
                .then((response) => {
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "warning",
                        button: "Aww yiss!",
                    });
                    if (response.data.status == true) {
                        swal({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                            button: "Okay",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "error",
                        button: "Aww yiss!",
                    });
                })
        }
    })

    return (
        <div id='body'>
            <Narvarbar />
            <div className='divTopchangepass'></div>
            <div className='divpassword' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='container'>
                        <div className="row">
                            <div style={{ backgroundColor: localStorage.mode == "black" ? 'white' : 'white' }} className="changepasscont col-md-7 col-sm-12 shadow-lg border border-2 rounded-3 p-3 mx-auto text-center input-container">
                                <p className='fw-bold text-start'>Change Password</p>
                                <input className='w-100 my-2 p-3' name='currencypass' onChange={formik.handleChange}
                                    value={formik.values.currencypass} placeholder='Currency Password' type="text" />
                                <div className='text-end text-danger'>
                                    {formik.errors.currencypass}
                                </div>
                                <input className='w-100 my-2 p-3' name='newpass' onChange={formik.handleChange}
                                    value={formik.values.newpass} placeholder='New Password' type="text" />
                                <div className='text-end text-danger'>
                                    {formik.errors.newpass}
                                </div>
                                <button className='btn btn-danger' type='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Changepassword