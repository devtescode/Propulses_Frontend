import React, { useState, useEffect } from 'react'
import Narvarbar from './Narvarbar'

const Converter = () => {
    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })

    const convertDollarsToNaira=()=> {
        if(dollarsInput.value == ""){
            swal({
                title: "Empty Input",
                text: "Your Converter Input Is Empty",
                icon: "warning",
                button: "Aww yiss!",
            });
        }
        if (!/^\d*\.?\d*$/.test(dollarsInput.value)) {
         swal({
             title: "Invalid Input",
             text: "Please enter a valid numeric value without letters",
             icon: "error",
             button: "Got it!",
         });
        }   
        else{
            const dollarsInput = document.getElementById("dollarsInput").value;
            const nairaOutput = dollarsInput * 800;
            document.getElementById("nairaOutput").value = nairaOutput;
        }
    }
    return (
        <>
            <Narvarbar />
            <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='container'>
                    <div className="row">
                        <div style={{backgroundColor:localStorage.mode=="black"?'white':'white'}} className="col-md-6 col-sm-12 shadow-lg border border-2 rounded-3 p-3 mx-auto text-center mt-5 input-container">
                            <p className='fw-bold text-start'>Converter</p>
                            <input id="dollarsInput" class='w-100 my-2 p-3' placeholder='Enter Amount In Dollars' type="text" />
                            <input id="nairaOutput" class='w-100 my-2 form-control p-3 text-center' disabled placeholder='Check Out Amount In Naira' type="text" readonly />
                            <button onClick={convertDollarsToNaira} class='btn btn-danger'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Converter