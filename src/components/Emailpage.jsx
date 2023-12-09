import React from 'react'
import "./Emailpage.css"
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { Navigate, useNavigate } from 'react-router'
const Emailpage = () => {
    const navigate = useNavigate()
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
            // localhost:4500
            axios.post("https://propulses.onrender.com/userinvest/useremailpage", { Emailpage: values.emailpage, randomToken}).then((response)=>{
                swal({
                    title: "",
                    text: response.data.message,
                    icon: "warning",
                    button: "Aww yiss!",
                });
                if(response.data.status == true){
                    swal({
                        title: "",
                        text: response.data.message,
                        icon: "success",
                        button: "Aww yiss!",
                    });
                    navigate("/forgetpassword")
                }
            })
            .catch((err)=>{
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
        <>
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