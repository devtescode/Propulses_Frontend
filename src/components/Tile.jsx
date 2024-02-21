import React from 'react'
import { getMatrixPosition, getVisualPosition } from '../components/Helpers'
import { TILE_COUNT, GRID_SIZE } from '../components/Constants'
const Tile = (props) => {
    const { tile, index, width, height, handleTileClick } = props
    const { row, col } = getMatrixPosition(index)
    const visualPos = getVisualPosition(row, col, width, height)
    const tileStyle = {
        width: `calc(100%  / ${GRID_SIZE})`,
        height: `calc(100%  / ${GRID_SIZE})`,
        translateX: visualPos.x,
        translateY: visualPos.y,
    }
    return (
        <>
            <li
                style={{
                    width: tileStyle.width,
                    height: tileStyle.height,
                    transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                    opacity: tile === TILE_COUNT - 1 ? 0 : 1,
                }}
                className="tile" 
                onClick={()=> handleTileClick(index)}
            >
                {tile + 1}
            </li>
        </>
    )
}

export default Tile