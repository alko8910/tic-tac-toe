import React, {useState} from 'react'
import './Endgame.css'

function Endgame({resetGame, gameHistory, winMessage}) {

    
    const getWinnerFromHistElem = (histElem) =>{
        if(histElem.winner === 'X'){
            return histElem.xName;
        }else if(histElem.winner === 'O'){
            return histElem.oName;
        }else{
            return 'draw';
        }
    }  
   
    
    const renderHistElem = (histElem) => {
        let id = `${histElem.ID}`;

        //get time
        const time = new Date(histElem.time);
        const d = time.getDate().toString()
        let m = time.getMonth();
        m += 1; 
        const h = time.getHours().toString();
        const min = time.getMinutes().toString();
        const getTime = `${d}.${m} ${h}:${min} `;
        const players = `${histElem.xName} vs ${histElem.oName} `;
      // get message for game history
        if(getWinnerFromHistElem(histElem) === 'draw'){
           return <div className='game-history'>{id}. {getTime}  {players} - {getWinnerFromHistElem(histElem)}</div>;
        }else{
            return <div className='game-history'>{id}. {getTime}  {players} - {getWinnerFromHistElem(histElem)} won</div>;
        }

        
    }
    // <h1>You win {getWinnerFromHistElem(gameHistory.slice(-1)[0])}</h1>
    return (
        <div className='modalBackgorund'>
            <div className='modalContainer'>
                
                <h1>{winMessage}</h1>
                <div>
                    <button onClick={resetGame}>Wanna try again?</button>
                </div>
                    <div>
                        {gameHistory.map(renderHistElem)}
                    </div>
                
            </div>
        </div>
    )
}

export default Endgame
