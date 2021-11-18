import React, {useEffect} from 'react'
import './navbar.css'
function Navbar({firstPlayer, secondPlayer, firstPlayerWinCounter, secondPlayerWinCounter, drawCounter}) {
    
    useEffect(() => {
        localStorage.setItem('firstPlayerWinCounter', JSON.stringify(firstPlayerWinCounter));
        localStorage.setItem('secondPlayerWinCounter', JSON.stringify(secondPlayerWinCounter));
        localStorage.setItem('drawCounter', JSON.stringify(drawCounter));
    }, [firstPlayerWinCounter, secondPlayerWinCounter, drawCounter])

    return (
        <div className='nav-div'>
            <h2 className='tic-tac-toe'>Tic Tac Toe</h2>
            <h2>{firstPlayer}:{firstPlayerWinCounter}</h2>
            <h2>{secondPlayer}:{secondPlayerWinCounter}</h2>
            <h2>Ties:{drawCounter}</h2>
        </div>
    )
}

export default Navbar;
