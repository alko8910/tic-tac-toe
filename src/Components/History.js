import React, {useState} from 'react'
import './Endgame.css'

function History({gameHistory}) {

    
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
    return (
        <div >
            <div >
                
               
                    <div>
                        {gameHistory.map(renderHistElem)}
                    </div>
                
            </div>
        </div>
    )
}

export default History
