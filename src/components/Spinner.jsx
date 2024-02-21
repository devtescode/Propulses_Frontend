import React, { useState, useEffect } from 'react';
import Narvarbar from './Narvarbar';
import SpinAndWin from 'react-spin-game';
import 'react-spin-game/dist/index.css';
import { useRef } from 'react';

const Spinner = () => {
    const freeSpinGifts = [['0', 'red'], ['30', 'gray'], ['10', 'blue'], ['70', 'purple'], ['20', 'aqua'], ['25', 'tomato'], ['90', 'cadetblue'], ['5', 'chocolate']];
    const [wdth, setwdth] = useState('');
    const [margin, setmargin] = useState('');
    const [time, setTime] = useState(0)
    const [data, setData] = useState(freeSpinGifts)
    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width);
            setmargin(localStorage.margin);
        }
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const ref = useRef()
    const handleClick = () => {
        const shuffledData = shuffleArray([...freeSpinGifts]);
        setData(shuffledData)
        setTime(getRandomInt(1, 20))
        ref.current.handleSpin()
    }
    

      
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return (
        <>
            <Narvarbar />
            <div className='divpassword' style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='text-center'></div>
                <div className='text-center' style={{ height: "100vh" }}>
                    <div>
                        <SpinAndWin horizantalText={true} hideButton={true} time={time} ref={ref} data={data} />
                    </div>
                    <div className='mt-5'>
                        <button className='btn btn-success' onClick={handleClick}>Spin</button>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Spinner;
