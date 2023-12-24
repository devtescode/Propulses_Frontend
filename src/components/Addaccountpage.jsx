import axios from 'axios'
import Narvarbar from './Narvarbar'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import Data from './Data.json'
const Addaccountpage = () => {
    // http://localhost:4500/userinvest/addaccount
    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    const [account, setaccount] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })
    const formik = useFormik({
        initialValues: {
            accountnumber: "",
            selectaccount: ""
        },
        validationSchema: Yup.object({
            accountnumber: Yup.number().typeError('Must be a number')
                .required('Required'),
            selectaccount: Yup.string().required('Required')
        }),
        onSubmit: values => {
            axios.post("https://propulses.onrender.com/userinvest/addaccount", { Accountnumber: values.accountnumber, bankcode: values.selectaccount, bank:Data.banks.find((item)=>(item.code=== values.selectaccount)).name ,token: localStorage.token})
            .then((response)=>{
                if (response.data.status == true){
                    setaccount(response.data.acct)
                    swal({
                        title: "",
                        text: "Successfully Added",
                        icon: "success",
                        button: "Okay",
                    });
                    // console.log(response.data.acct);
                }
            })
            .catch((err) => {
                console.error('Error occurred', err);
                swal({
                    title: "",
                    text: "Incorrect Details",
                    icon: "warning",
                    button: "Aww yiss!",
                });
            });
        }
    })
    return (
        <>
            <Narvarbar />
            <div className='divTopchangepass'></div>
            <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='container'>
                        <div className="row">
                            <div style={{backgroundColor:localStorage.mode=="black"?'white':'white'}} className="col-md-6 col-sm-12 shadow-lg border border-2 rounded-3 p-3 mx-auto text-center mt-5">
                                <p className='fw-bold text-start'>Add Account</p>
                                
                            <div class="input-container w-100">
                                <input className='my-3 p-3 w-100' onChange={formik.handleChange} name='accountnumber' value={formik.values.accountnumber} placeholder='Account Number' type="text" />
                            </div>
                                <div className='text-danger text-end'>
                                    {formik.errors.accountnumber}
                                </div>
                                <select name="selectaccount" onChange={formik.handleChange} value={formik.values.selectaccount} class="form-select form-select-lg mb-3" aria-label="Large select example">
                                    {Data.banks.map((item, index) => (
                                        <option value={item.code}>{item.name}</option>
                                    ))}
                                </select>
                                <input className='form-control my-3 p-3 text-center' disabled placeholder='Bank Account Name' type="text" value={account} />
                                <div>
                                    
                                </div>
                                <button className='btn btn-danger' type='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Addaccountpage;