import React, { useState } from 'react'
import "./Emailpage.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Navigate, useNavigate } from 'react-router'
import Loader from './Loader'
const Emailpage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    function generateRandomToken() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomToken = generateRandomToken();
    console.log(randomToken);

    const formik = useFormik({
        initialValues: {
            emailpage: ""
        },
        validationSchema: Yup.object({
            emailpage: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            // 
            setLoading(true);
            let successMessage, errorMessage;
            axios.post("https://propulses.onrender.com/userinvest/useremailpage", { Emailpage: values.emailpage, randomToken }).then((response) => {
                successMessage = response.data.message;
                errorMessage = response.data.message;
             

                setTimeout(() => {
                    swal({
                        title: "",
                        text: successMessage,
                        icon: response.data.status ? "success" : "warning",
                        button: response.data.status ? "Okay" : "Aww yiss!",
                    });
                    if (response.data.status == true) {
                       
                        navigate("/forgetpassword")
                    }
                    
                }, 6000);

            })
            .catch((err) => {
                console.log(err);
                errorMessage = err.response ? err.response.data.message : "An error occurred";

                setTimeout(() => {
                    swal({
                        title: "",
                        text: errorMessage,
                        icon: "error",
                        button: "Aww yiss!",
                    });
                }, 6000);
            })
            setTimeout(() => {
                setLoading(false);
            }, 6000);
        }
    })
    return (
        <>
           {loading && <Loader />}
            <form onSubmit={formik.handleSubmit}>
                <div className='mymaildiv'>
                    <div className='mymaileachdiv'></div>
                    <div className='mymaileachdiv2'>
                        <div class="mailform">
                            <div>
                                <p>Enter your email address in the input provided</p>
                            </div>
                            <div>
                                <input class="mailinput mt-3" onChange={formik.handleChange} name='emailpage' value={formik.values.emailpage} placeholder="Email address" required="" type="text" />
                                <span class="input-border1">
                                </span>
                            </div>
                            <div className='text-danger text-end' style={{ position: "absolute", right: "0px" }}>
                                {formik.errors.emailpage}
                            </div>
                            <div className='mt-5 MailBtnStyle'>
                                <button className='btn btn-dark MailBtnStyle2'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Emailpage