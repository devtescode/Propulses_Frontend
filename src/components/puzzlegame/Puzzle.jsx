import React, { useEffect, useState } from 'react'
import Narvarbar from '../Narvarbar'
import Board from './Board'
import { updateURLParameter } from './Helpers';


const Puzzle = () => {
    const [imgUrl, setimgUrl] = useState("")
    const [margin, setmargin] = useState('');
    const [wdth, setwdth] = useState('');

    useEffect(() => {
        if (localStorage.width) {
            setwdth(localStorage.width);
            setmargin(localStorage.margin);
        }
    }, []);
    const handleImageChange = (e) => {
        setimgUrl(e.target.value)
        window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (!urlParams.has("img")) {
            const defaultImageUrl = "https://img.freepik.com/free-photo/jigsaw-puzzle-with-missing-piece-missing-puzzle-pieces_1150-16390.jpg?t=st=1709289735~exp=1709293335~hmac=f44208f424381c229bc6df308f71decfb0476461abb1efb9da681a8b9e664b1f&w=740"
            setimgUrl(defaultImageUrl);
            window.history.replaceState("", "", updateURLParameter(window.location.href, "img", defaultImageUrl));
        } else {
            setimgUrl(urlParams.get("img"));
        }
    }, [imgUrl]);
    // let url = "http://localhost:4500/userinvest/puzzlepage"
    // axios.post(url,{})

    return (
        <>
            <Narvarbar />
            <div style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }}>
                <div className='Appp'>
                    {/* <h1 className=''>Puzzle</h1> */}
                    <h1 className='puzzle' style={{ color: '#4F46E5', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' }}>
                        Puzzle
                    </h1>

                    <Board imgUrl={imgUrl} />
                    <input className='' disabled type="text" value={imgUrl} onChange={handleImageChange} />
                </div>
            </div>
        </>
    )
}

export default Puzzle