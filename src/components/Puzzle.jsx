import React, { useEffect, useState } from 'react'
import Narvarbar from './Narvarbar'
import Board from '../components/Board';
import { updateURLParameter } from '../components/Helpers';


const Puzzle = () => {
    const [margin, setmargin] = useState('');
    const [wdth, setwdth] = useState('');
    const [imgUrl, setimgUrl] = useState("")


    const handleImageChange =(e)=>{
        setimgUrl(e.target.value)
        window.history.replaceState("","", updateURLParameter(window.location.href, "img", e.target.value))
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if(urlParams.has("img")){
            setimgUrl(urlParams.get("img"))
        }
    }, [])
    
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
                <div className='Appp'>
                    <h1>Sliding Puzzle</h1>
                    <Board imgUrl={imgUrl}/>
                    <input disabled className='' type="text" value={imgUrl} onChange={handleImageChange}/>
                </div>
            </div>
        </>
    )
}

export default Puzzle