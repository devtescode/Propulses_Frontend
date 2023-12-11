import React from 'react'
import "./Signin.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router'
const Signin = () => {
    localStorage.removeItem("useradminlogin")
    const navigate = useNavigate()
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
            axios.post("https://propulses.onrender.com/userinvest/usersignin", {Username: values.username, Password: values.password})
            .then((response) => {
                swal({
                    title: "",
                    text: response.data.message,
                    icon: "warning",
                    button: "Aww yiss!",
                });
                if (response.data.status === true) {
                    localStorage.token = response.data.token
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "success",
                        button: "Okay",
                    });
                    console.log(response);
                    navigate("/dashboard")
                    localStorage.setItem("useradminlogin", true)

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
    const linksignup=()=>{
        navigate("/signup")
    }
    const forgetpassBtn=()=>{
        navigate("/emailpage")
    }
    return (
        <>
        <form autoComplete='on' onSubmit={formik.handleSubmit}>
                <div className='contfirstdiv'>
                <div className="mycontsec">
                        <div className='p-4 text-white'>
                            Home
                        </div>
                    </div>
                    <div className='contthirddivsignin'>
                        <div class="form">
                            <p class="form-title">Login</p>
                            <div class="input-container">
                                <input type="text" autoComplete='true' className='w-100' onChange={formik.handleChange} name='username' value={formik.values.username} placeholder="Username" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.username}
                            </div>

                            <div class="input-container">
                                <input type="password" autoComplete='true' onChange={formik.handleChange} name='password' value={formik.values.password} className='w-100' placeholder="Password" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.password}
                            </div>
                            <div className='text-center mx-auto'>
                                <button type="submit" class="submitBtn">
                                    Sign In
                                </button>
                            </div>
                            <div className='containerdisp justify-content-between'>
                                <div className='d-flex'>
                                    <div>
                                        <p>Don't have an account</p>
                                    </div>
                                    <div className='mx-1'>
                                        <p className='signincolor fw-bold' onClick={linksignup}>Signup</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='fw-bold' onClick={forgetpassBtn} style={{cursor:"pointer"}}>forget password</p>
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