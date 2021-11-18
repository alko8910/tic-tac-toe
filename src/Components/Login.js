import React, { useEffect } from 'react';
import './Login.css';


function Login({setOpenLogin, firstPlayer, setFirstPlayer, secondPlayer, setSecondPlayer}) {
    
    const checkLogin = () => {
        if (!firstPlayer || !secondPlayer) {
           setOpenLogin(true)
        }else{
            setOpenLogin(false);
        
        }
    }

    //Store value to local storage
useEffect(() => {
    localStorage.setItem('firstPlayer', JSON.stringify(firstPlayer));
    localStorage.setItem('secondPlayer', JSON.stringify(secondPlayer))
}, [firstPlayer, secondPlayer]);

    return (
        <div className='modalBackgorund'>
            <div className="modalContainer"> 
                <div >
                    <form>
                        <h3>Name Player 1</h3>
                        <input  onInput={e => setFirstPlayer(e.target.value)}></input>
                        <h3>Name Player 2</h3>
                        <input onInput={e => setSecondPlayer(e.target.value)}></input>
                    </form>
                    <button onClick={checkLogin}>
                         Start game
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default Login


 /* const Aaaa = () => {
        if (!firstPlayer || !secondPlayer) {
            setOpenLogin(true);
         }else{
             setOpenLogin(false);
         }
         console.log(setOpenLogin)
    }
    Aaaa();*/