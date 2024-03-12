import React, { useState, useEffect } from 'react'
import Tile from '../components/Tile'
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from '../components/Constants'
import { canSwap, shuffle, swap, isSolved } from '../components/Helpers'
import axios from 'axios'

const Board = ({ imgUrl }) => {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [stakeAmount, setStakeAmount] = useState(0)
    const [displayStake, setDisplayStake] = useState(false);
    useEffect(() => {
        if (isStarted) {
            const currentTime = Date.now();
            setStartTime(currentTime);

            const intervalId = setInterval(() => {
                const elapsedSeconds = Math.floor((Date.now() - currentTime) / 1000);
                setElapsedTime(elapsedSeconds);

                if (elapsedSeconds >= 90) {
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

    const openModal = () => {
        if (!isStarted) {
            const modal = new bootstrap.Modal(document.getElementById('stakeModal'));
            modal.show();
        }
    };

    const shuffleTiles = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setElapsedTime(0);
            setStartTime(null);
        }
        openModal();
    };

    const handleModalSubmit = () => {
        const parsedStake = parseFloat(stakeAmount);
        if (isNaN(parsedStake) || parsedStake < 10) {
            swal({
                title: "Invalid Amount",
                text: "Please enter a valid stake amount of at least $10.",
                icon: "warning",
                button: "Aww yiss!",
            });
        }
        else if (parsedStake > 1000) {
            swal({
                title: "Amount",
                text: "The maximum stake amount is $1000. Please enter a valid amount.",
                icon: "warning",
                button: "Aww yiss!",
            });
        }
        else {
            if (!isStarted) {
                const shuffledTiles = shuffle([...Array(TILE_COUNT).keys()]);
                setTiles(shuffledTiles);
                setIsStarted(true);
                setStartTime(Date.now());
                setDisplayStake(true);
            }
        }
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
                    updateGameResult(true, elapsedTime);

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


    const updateGameResult = async (isWinner, elapsedTime) => {
        try {
            const response = await axios.post('http://localhost:4500/userinvest/puzzlepage', {
                isWinner,
                elapsedTime,
            });

            if (response.data.success) {
                console.log('Game result updated successfully:', response.data);
                // Handle any additional logic after a successful update if needed
            } else {
                throw new Error('Failed to update game result');
            }
        } catch (error) {
            console.error('Error updating game result:', error.message);
            // Handle error, show a user-friendly message, or redirect to an error page
        }
    };
    
    // validateuser
    const userToken =  localStorage.token;
    console.log('userToken:', userToken);
    const validateUser = async () => {
        try {
            const response = await axios.get('http://localhost:4500/userinvest/validateuser', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.data.success) {
                console.log('User is validated successfully:', response.data);
            } else {
                throw new Error('User validation failed');
            }
        } catch (err) {
            console.log('Error validating user:', err.message);
        }
    };
    useEffect(() => {
        validateUser(userToken);
    }, [])


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
                    {displayStake && isStarted && <p style={{ color: '#4F46E5', fontSize: '16px', fontWeight: 'bold' }}>Stake Amount: ${stakeAmount}</p>}

                </div>
                <div className="modal fade" id="stakeModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Stake Amount</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="stakeAmount">Stake Amount:</label>
                                <input
                                    type="number"
                                    id="stakeAmount"
                                    value={stakeAmount}
                                    onChange={(e) => setStakeAmount(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter stake amount"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="button" className="btn btn-primary" onClick={handleModalSubmit} >Start Game</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Board
