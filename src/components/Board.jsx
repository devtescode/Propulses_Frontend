import React, { useState, useEffect } from 'react'
import Tile from '../components/Tile'
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from '../components/Constants'
import { canSwap, shuffle, swap, isSolved } from '../components/Helpers'

const Board = ({ imgUrl }) => {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
   const [intervalId, setIntervalId] = useState(null);

    // const [wdth, setwdth] = useState('')
    // const [margin, setmargin] = useState('')
    // useEffect(() => {
    //     if (localStorage.width) {
    //         setwdth(localStorage.width)
    //         setmargin(localStorage.margin)
    //     }
    // })


    useEffect(() => {
        if (isStarted) {
            const currentTime = Date.now();
            setStartTime(currentTime);

            const intervalId = setInterval(() => {
                const elapsedSeconds = Math.floor((Date.now() - currentTime) / 1000);
                setElapsedTime(elapsedSeconds);

                if (elapsedSeconds >= 180) { // 3 minutes
                    clearInterval(intervalId);
                    setIsStarted(false);
                    const minutes = Math.floor(elapsedSeconds / 60);
                    const seconds = elapsedSeconds % 60;
                    swal({
                        title: "Time",
                        text: `Time's up! Game over. Total time: ${minutes} minutes and ${seconds} seconds`,
                        icon: "error",
                        button: "Aww yiss!",
                    });
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isStarted]);





    const shuffleTiles = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setElapsedTime(0);
            setStartTime(null);
        }

        const shuffledTiles = shuffle([...Array(TILE_COUNT).keys()]);
        setTiles(shuffledTiles);
        setIsStarted(true);
        setStartTime(Date.now());
    };
    
    const swapTiles = (tileIndex) => {
        if (isStarted) {
            if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
                const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
                setTiles(swappedTiles);
    
                if (isSolved(swappedTiles)) {
                    clearInterval(intervalId);
                    setIsStarted(false);
    
                    const minutes = Math.floor(elapsedTime / 60);
                    const seconds = elapsedTime % 60;
    
                    swal({
                        title: "Congratulations!",
                        text: `You solved the puzzle in ${minutes} minutes and ${seconds} seconds!`,
                        icon: "success",
                        button: "Awesome!",
                    });
                }
            } else {
                swal({
                    title: "Invalid Move",
                    text: "Invalid move. Please try again.",
                    icon: "error",
                    button: "Got it!",
                });
            }
        } else {
            swal({
                title: "Not Started",
                text: "Please click 'Start Game' before making moves.",
                icon: "error",
                button: "Got it!",
            });
        }
    }
    


    const handleTileClick = (index) => {
        swapTiles(index)
    }

    const handleShuffleClick = () => {
        shuffleTiles()
    }

    const pieceWidth = Math.round(BOARD_SIZE, GRID_SIZE)
    const pieceHeight = Math.round(BOARD_SIZE, GRID_SIZE)
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
    }

    const hasWon = isSolved(tiles)

    return (
        <>
            {/* style={{ width: wdth + 'vw', marginLeft: margin + 'vw' }} */}
            <div className='divpassword'>
                <ul style={style} className='board'>
                    {tiles.map((tile, index) => (
                        <Tile
                            key={tile}
                            index={index}
                            imgUrl={imgUrl}
                            tile={tile}
                            width={pieceWidth}
                            height={pieceHeight}
                            handleTileClick={handleTileClick}
                        />
                    ))}
                </ul>
                <div className='text-center mt-5'>
                    {hasWon && isStarted && <div>Winner 🧩👍</div>}
                    {!isStarted ? (
                        <button className='btn btn-success' onClick={() => shuffleTiles()}>
                            Start Game
                        </button>
                    ) : (
                        <button className='btn btn-danger' onClick={() => shuffleTiles()}>
                            Restart Game
                        </button>
                    )}
                    {/* {isStarted && <div>Time Elapsed: {elapsedTime} seconds</div>} */}
                    <p>{`${Math.floor(elapsedTime / 60)} minutes ${elapsedTime % 60} seconds`}</p>

                </div>
            </div >

        </>
    )
}

export default Board
