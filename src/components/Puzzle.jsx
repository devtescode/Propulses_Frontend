import React, { useEffect, useState } from 'react'
import Narvarbar from './Narvarbar'
import Board from '../components/Board';



const Puzzle = () => {
    const [margin, setmargin] = useState('');
    const [wdth, setwdth] = useState('');
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width);
            setmargin(localStorage.margin);
        }
    }, []);
    return (
        <>
            <Narvarbar />
            <div style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='App'>
                    <h1>Sliding Puzzle</h1>
                    <Board/>
                </div>
            </div>
        </>
    )
}

export default Puzzle