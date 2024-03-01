import React, { useState } from 'react'
import Tile from '../components/Tile'
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from '../components/Constants'
import { canSwap, shuffle, swap, isSolved } from '../components/Helpers'

const Board = ({ imgUrl }) => {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
    const [isStarted, setIsStarted] = useState(false)

    const shuffleTiles = () => {
        const shuffledTiles = shuffle([...Array(TILE_COUNT).keys()])
        setTiles(shuffledTiles)
        setIsStarted(true)
    }

    const swapTiles = (tileIndex) => {
        if (isStarted) {
            if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
                const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
                setTiles(swappedTiles)
            } 
            // else {
            //     alert("Please click 'Start Game' before making moves.");
            // }
        }
        else {
            alert("Please click 'Start Game' before making moves.");
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
        backgroundSize: 'cover', // Adjust as needed
    }

    const hasWon = isSolved(tiles)

    return (
        <>
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
        </>
    )
}

export default Board
