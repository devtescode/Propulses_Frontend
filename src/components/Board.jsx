import React, { useState } from 'react'
import Tile from '../components/Tile'
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from '../components/Constants'
import { canSwap, shuffle, swap, isSolved} from '../components/Helpers'

const Board = ({imgUrl}) => {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()])
    // const [isSolved, setIsSolved] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    console.log('is started:', isStarted);
    const shuffleTiles =() => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles) 
    }
    const swapTiles = (tileIndex) =>{
        if(canSwap(tileIndex, tiles.indexOf(tiles.length - 1))){
           const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1 ))
           setTiles(swappedTiles)
        }
    }

    const handleTileClick = (index)=>{
        swapTiles(index)
    }

    const handleshuffleClick = () =>{
        shuffleTiles()
    }

    const handleStartClick=()=>{
        shuffleTiles()
        setIsStarted(true)
    }

    const pieceWidth = Math.round(BOARD_SIZE, GRID_SIZE)
    const pieceHeight = Math.round(BOARD_SIZE, GRID_SIZE)
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,   
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
            {hasWon && isStarted && <div>Puzzle Solved 🧩👍</div>}
            {!isStarted ? 
            (<button className='btn btn-success' onClick={()=> handleStartClick()}>Start Game</button>) : 
            (<button className='btn btn-danger' onClick={()=> handleshuffleClick()}>Restart Game</button>)}
        </>
    )
}

export default Board