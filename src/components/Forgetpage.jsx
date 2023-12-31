import React, {useState} from 'react'
import "./Forgetpage.css"
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Loader from './Loader'
const Forgetpage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            forgetemailpage1: "",
            forgetemailpage2: "",
            forgetemailpage3: "",
        },
        validationSchema: Yup.object({
            forgetemailpage1: Yup.string()
                .required('Required'),
        
        }),
        onSubmit: values => {
            setLoading(true);
            let successMessage, errorMessage;
            axios.post("https://propulses.onrender.com/userinvest/Forgetpasspage", {Forgetmailone: values.forgetemailpage1, Forgetmailtwo: values.forgetemailpage2, Forgetmailthree: values.forgetemailpage3})
            .then((response)=>{
                successMessage = response.data.message;
                errorMessage = response.data.message;   
                setTimeout(() => {
                    swal({
                        title: "",
                        text: successMessage,
                        icon: response.data.status ? "success" : "warning",
                        button: response.data.status ? "Okay" : "Aww yiss!",
                    });
                   
                if(response.data.status == true){   
                    navigate("/login")
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
            <div className='mycondiv'>
                <div className='myeachdiv'></div>
                <div className='myeachdiv2 shadow-lg'>
                    <div className='text-center mt-3 taketop'>
                        <h3>Email Verification</h3>
                        <p>We have sent a code to your email</p>
                    </div>
                    <div className='input-container mx-auto forgetinputwidthdiv mt-4'>
                        <input className='forgetinputwidth' onChange={formik.handleChange} name='forgetemailpage1' value={formik.values.forgetemailpage1} maxLength={4} type="text" placeholder='OTP'/>
                        <input className='forgetinputwidth' onChange={formik.handleChange} name='forgetemailpage2' value={formik.values.forgetemailpage2}  type="text" placeholder='Password'/>
                        <input className='forgetinputwidth' onChange={formik.handleChange} name='forgetemailpage3' value={formik.values.forgetemailpage3}  type="text" placeholder='Confirm Password'/>
                    </div>
                    <div className='text-center mt-3'>
                        <button className='btn btn-dark w-75 p-2 styleBtn'>Verify Account</button>
                    </div>
                    {/* <div className='d-flex mt-3 justify-content-center'>
                        <p>Didn't recieve code?</p>
                        <p className='fw-bold'>Resend OTP</p>
                    </div> */}
                </div>
            </div>
        </form>

        </>
    )
}

export default Forgetpage