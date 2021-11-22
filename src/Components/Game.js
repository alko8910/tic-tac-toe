import React, { useState, useEffect} from 'react'

function Game({xIsNext, firstPlayer, secondPlayer,board, loginComplete}) {
    const [player, setPlayer] = useState(firstPlayer);
    useEffect(() => {
        if(xIsNext){
            setPlayer(firstPlayer)
        }else{
            setPlayer(secondPlayer)
        }
    }, [board, loginComplete])
    return (
        <div>
            <h2>Its {player} turn</h2>
        </div>
    )
}

export default Game
