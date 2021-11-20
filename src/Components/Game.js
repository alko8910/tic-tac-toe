import React, { useState, useEffect} from 'react'

function Game({xIsNext, firstPlayer, secondPlayer,board}) {
    const [player, setPlayer] = useState('');
    //setPlayer(firstPlayer)
    //console.log(player)
    //xIsNext ? setPlayer(firstPlayer) : setPlayer(secondPlayer);
    useEffect(() => {
        if(xIsNext){
            setPlayer(firstPlayer)
        }else{
            setPlayer(secondPlayer)
        }
    }, [board])
    return (
        <div>
            <h2>Its {player} turn</h2>
        </div>
    )
}

export default Game
