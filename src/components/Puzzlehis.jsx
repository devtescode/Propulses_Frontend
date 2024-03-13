import React, { useEffect, useState } from 'react'
import Narvarbar from './Narvarbar';
import axios from 'axios';

const Puzzlehis = () => {
    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    const [withdrawfetchis, setwithdrawfetchis] = useState([])
    const time = (time)=>{
        const utcDate = new Date(time);
        const localDateString = utcDate.toLocaleString();
        return localDateString
    }
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })

    useEffect(() => {
        const withdrawfetchis = async () => {
            try {
                const userToken = localStorage.token;
                const response = await axios.get('https://propulses.onrender.com/userinvest/puzzlewithdrawalhis', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setwithdrawfetchis(response.data);
            } catch (error) {
                console.error('Error fetching withdrawal history:', error);
            }
        }
        withdrawfetchis()
    }, [])

    return (
        <>
            <Narvarbar />
            <div className='divpassword' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='mt-3'>
                    <p className='fw-bold text-center  fs-3'>Puzzle History</p>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawfetchis.map((passkey, index) => (
                            <tr key={passkey}>
                                <th scope="row">{index + 1}</th>
                                <td>${passkey.amount}</td>
                                <td>{passkey.status}</td>
                                <td>{time(passkey.date)}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Puzzlehis;