import React, {useState, useEffect} from 'react'
import './Endgame.css'

function Endgame({resetGame, gameHistory}) {

    const [showGameHistory, setShowGameHistory] = useState(false);

    const getWinnerFromHistElem = (histElem) => histElem.winner === 'X' ? histElem.xName : histElem.oName;
    setTimeout(() => setShowGameHistory(true), 5000);
    const renderHistElem = (histElem) => {
        const time = new Date(histElem.time);
        const d = time.getDay().toString()
        const m = time.getMonth().toString();
        const h = time.getHours().toString();
        const min = time.getMinutes().toString();
        const getTime = `${d}.${m} ${h}:${min} `;
        const players = `${histElem.xName} vs ${histElem.oName} `;
        //setGameHistory(gameHistory + getTime + players + winner + ' won \n'  )
        //setGameHistory(gameHistory.push(gameHistory + getTime + players + winner + ' won'))
        
        return <div className='game-history'>{getTime}  {players}  {getWinnerFromHistElem(histElem)} won</div>;
    }

    return (
        <div className='modalBackgorund'>
            <div className='modalContainer'>
                
                <h1>You win {getWinnerFromHistElem(gameHistory.slice(-1)[0])}</h1>
                <div>
                    <button onClick={resetGame}>Wanna try again?</button>
                    <button onClick={() => setShowGameHistory(true)}>Game history</button>
                </div>
                {showGameHistory && (
                    <div>
                        {gameHistory.map(renderHistElem)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Endgame
