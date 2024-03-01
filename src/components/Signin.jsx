import React, { useState, useEffect } from 'react'
import "./Signin.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router'
import Loader from './Loader'

const Signin = () => {
    useEffect(() => {
        if (localStorage.reload) {

        }
        else {
            // alert("success11111")
            localStorage.setItem('reload', 'true')
            window.location.reload()
        }
    }, [])
    // localStorage.setItem('reload', 'true')

    localStorage.removeItem("useradminlogin")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            setLoading(true);
            let successMessage, errorMessage;
            axios.post("https://propulses.onrender.com/userinvest/usersignin", { Username: values.username, Password: values.password })
                .then((response) => {
                    successMessage = response.data.message;
                    errorMessage = response.data.message;
                    swal({
                        title: "",
                        text: successMessage,
                        icon: response.data.status ? "success" : "warning",
                        button: response.data.status ? "Okay" : "Aww yiss!",
                    });
                    if (response.data.status === true) {
                        localStorage.token = response.data.token
                        navigate("/dashboard")
                        localStorage.setItem("useradminlogin", true)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    errorMessage = err.response ? err.response.data.message : "An error occurred";

                    // setTimeout(() => {
                        swal({
                            title: "",
                            text: errorMessage,
                            icon: "error",
                            button: "Aww yiss!",
                        });
                    // }, 6000);
                })

            setTimeout(() => {
                setLoading(false);
            }, 6000);
        }
    })
    const linksignup = () => {
        navigate("/signup")
    }
    const forgetpassBtn = () => {
        navigate("/emailpage")
    }
    return (
        <>
            {loading && <Loader />}
            <form autoComplete='on' onSubmit={formik.handleSubmit}>
                <div className='contfirstdiv'>
                    <div className="mycontsec">
                        <div className='p-4 text-white'>
                            Home
                        </div>
                    </div>
                    <div className='contthirddivsignin'>
                        <div className="form">
                            <p className="form-title">Login</p>
                            <div class="input-container">
                                <input type="text" autoComplete='true' className='w-100' onChange={formik.handleChange} name='username' value={formik.values.username} placeholder="Username" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.username}
                            </div>

                            <div className="input-container">
                                <input type="password" autoComplete='true' onChange={formik.handleChange} name='password' value={formik.values.password} className='w-100' placeholder="Password" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.password}
                            </div>
                            <div className='justify-content-center d-flex'>
                                <button type="submit" class="submitBtn">
                                    Sign In
                                </button>
                            </div>
                            <div className='text-center'>
                                <div className=''>
                                    <div className=''>
                                        <span>Don't have an account?</span>
                                        <span className='signincolor fw-bold mx-1' onClick={linksignup}>Signup</span>
                                    </div>
                                </div>
                                <div>
                                    <p className='fw-bold' onClick={forgetpassBtn} style={{ cursor: "pointer" }}>forget password</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Signin