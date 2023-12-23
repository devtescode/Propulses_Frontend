import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router'
const Admin = () => { 
    localStorage.removeItem("adminlogin")
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
            axios.post("https://propulses.onrender.com/userinvest/useradmin", { Username: values.username, Password: values.password })
                .then((response) => {
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "error",
                        button: "Aww yiss!",
                    });
                    if (response.data.status == true) {
                        localStorage.admintoken = response.data.admintoken
                        swal({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                            button: "Okay",
                        });
                        navigate("/adminpage")
                        localStorage.setItem("adminlogin", true)
                    }
                })
        }
    })
    return (
        <>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className='contfirstdiv'>
                    <div className="mycontsec">
                        <div className='p-4 text-white'>
                            Home
                        </div>
                    </div>
                    <div className='contthirddiv'>
                        <div class="form mt-4">
                            <p class="form-title">Admin Account</p>
                            <div class="input-container">
                                <input type="text" className='w-100' onChange={formik.handleChange} name='username' value={formik.values.username} placeholder="Username" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.username}
                            </div>

                            <div class="input-container">
                                <input type="password" onChange={formik.handleChange} name='password' value={formik.values.password} className='w-100' placeholder="Password" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.password}
                            </div>

                            <div className='text-center mx-auto'>
                                <button type="submit" class="submitBtn">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Admin;