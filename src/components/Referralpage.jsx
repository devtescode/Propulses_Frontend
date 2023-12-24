import React, { useEffect, useState } from 'react'
import Narvarbar from './Narvarbar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
const Referralpage = () => {
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
            enteramount: ""
        },
        validationSchema: Yup.object({
            enteramount: Yup.number().typeError('Must be a number')
            .required('Required'),
        }),
        onSubmit: values => {
            let token = localStorage.token
            axios.post("https://propulses.onrender.com/userinvest/referral", { Enteramount: values.enteramount, token})
            .then((response)=>{
                swal({
                    title: "",
                    text: (response.data.message),
                    icon: "warning",
                    button: "Aww yiss!",
                });
                if(response.data.status == true){
                    swal({
                        title: "",
                        text: (response.data.message),
                        icon: "success",
                        button: "Okay",
                    });
                }
            })
        }
    })
    return (
        <>
            <Narvarbar />
            <div className='divTopchangepass'></div>
            <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div style={{backgroundColor:localStorage.mode=="black"?'white':'white'}}className="col-md-6 col-sm-12 shadow mx-auto p-4 border border-2 rounded-3 input-container changepasscont">
                                <p className='fw-bold text-start'>Referral Withdrawal</p>
                                <input type="text" placeholder='Enter Amount' onChange={formik.handleChange} value={formik.values.enteramount} name='enteramount' className='w-100 my-2 p-3' />
                                <div className='text-danger text-end'>
                                    {formik.errors.enteramount}
                                </div>
                                <select class="form-select my-2 p-3" aria-label="Default select example">
                                    <option selected>------</option>
                                    <option>Referral sales</option>
                                </select>
                                <div className='text-center'>
                                    <button className='btn btn-success' type='submit'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Referralpage