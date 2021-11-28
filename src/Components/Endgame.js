import React from 'react'
import './Endgame.css'
import './Login.css'
function Endgame({resetGame, winMessage}) {
    
    return (
       
   
        <div className='modalBackgorund'>
            <div className='modalContainer'>
                <div className='win-message'> {winMessage}</div>
               
               <button onClick={resetGame}>Wanna try again?</button>
                
            </div>
        </div>
    )
}

    


export default Endgame
