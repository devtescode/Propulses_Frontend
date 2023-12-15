import React, { useState, useEffect } from 'react'
import Narvarbar from './Narvarbar'
import axios from 'axios'
import { date } from 'yup'

const Withdrawalhistory = () => {
    const [wdth, setwdth] = useState('')
    const [margin, setmargin] = useState('')
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width)
            setmargin(localStorage.margin)
        }
    })


    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    useEffect(() => {
        const fetchWithdrawalHistory = async () => {
            try {
                const token = localStorage.token;
                const response = await axios.get('https://propulses.onrender.com/userinvest/withdrawalhistroy', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWithdrawalHistory(response.data);
            } catch (error) {
                console.error('Error fetching withdrawal history:', error);
            }
        };

        fetchWithdrawalHistory();
    }, []);

    // const date = new date()
    // data()
    return (
        <>
            <div id='body'>
                <Narvarbar />
                <div className='eachgrid' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                  
                    <div className=''>
                        <div className='mt-3'>
                            <p className='fw-bold text-start'>Withdrawal Histroy</p>
                        </div>
                        <table class="table mt-4 shadow-lg border border-1 border-dark text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Bank</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalHistory.map((entry, index) => (
                                    <tr key={entry.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>${entry.amount}</td>
                                        <td>{entry.MyaccountName}</td>
                                        <td>{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Withdrawalhistory