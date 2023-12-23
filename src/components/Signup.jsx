import React, { useState} from 'react'
import "./Signup.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import Loader from './Loader'

const Signup = () => {
    const navigate = useNavigate()
    const [serchParams, setserchParams] = useSearchParams()
    const token = serchParams.get("referralcode")
    const [loading, setLoading] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            email: "",
            phonenumber: "",
            couponcode: "",
            referral: token ? token : "",
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .required('Required'),
            lastname: Yup.string()
                .required('Required'),
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            email: Yup.string().email('Invalid email address')
                .required('Required'),
            phonenumber: Yup.number().typeError('Must be a number')
                .required('Required'),
            couponcode: Yup.string()
                .required('Required'),
            referral: Yup.string()
        }),
        onSubmit: values => {
            setLoading(true);
            let successMessage, errorMessage;
            axios.post("http://localhost:4500/userinvest/usersignup", { Firstname: values.firstname, Lastname: values.lastname, Username: values.username, Password: values.password, Email: values.email, Phonenumber: values.phonenumber, Couponcode: values.couponcode, referral: values.referral })
                .then((response) => {
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
                            // swal({
                            //     title: "Success",
                            //     text: response.data.message,
                            //     icon: "success",
                            //     button: "Okay",
                            // });
                            navigate("/login")
                        }
                    }, 6000)
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
    const linksignin = () => {
        navigate("/login")
    }
    


    return (
        <>
            {loading && <Loader />}
            <form action="" onSubmit={formik.handleSubmit}>
                <div className='contfirstdiv'>
                    <div className="mycontsec">
                        <div className='p-4 text-white'>
                            Home
                        </div>
                    </div>
                    <div className='contthirddiv'>
                        <div class="form">
                            <p class="form-title">Create Account</p>
                            <p className='text-center'>Fill in your correct details</p>
                            <div class="input-container">
                                <input type="text" onChange={formik.handleChange} name='firstname' value={formik.values.firstname} className='w-100' placeholder="First Name" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.firstname}
                            </div>

                            <div class="input-container">
                                <input type="text" className='w-100' onChange={formik.handleChange} name='lastname' value={formik.values.lastname} placeholder="Last Name" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.lastname}
                            </div>

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

                            <div class="input-container">
                                <input type="email" onChange={formik.handleChange} name='email' value={formik.values.email} className='w-100' placeholder="Email" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.email}
                            </div>
                            <div class="input-container">
                                <input type="number" onChange={formik.handleChange} name='phonenumber' value={formik.values.phonenumber} className='w-100' placeholder="Phone number" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.phonenumber}
                            </div>
                            <div class="input-container">
                                <input type="text" onChange={formik.handleChange} name='couponcode' value={formik.values.couponcode} className='w-100' placeholder="Coupon Code" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.couponcode}
                            </div>

                            <div class="input-container">
                                <input type="text" disabled={token} onChange={formik.handleChange} name='referral' value={formik.values.referral} className='w-100' placeholder="Referral link" />
                            </div>
                            <div className='text-end text-danger'>
                                {formik.errors.referral}
                            </div>
                            <div className='text-center mx-auto'>
                                <button type="submit" class="submitBtn">
                                    Sign Up
                                </button>
                            </div>
                            <div className='containerdisp justify-content-between'>
                                <div className='d-flex'>
                                    <div>
                                        <p>Already have an account?</p>
                                    </div>
                                    <div className='mx-1'>
                                        <p className='signincolor fw-bold' onClick={linksignin}>Signin</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Signup