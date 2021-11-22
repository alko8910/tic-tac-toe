import React, { useEffect, useState } from 'react';
import './Login.css';


function Login({loginComplete}) {
    
    const [firstPlayer, setFirstPlayer] = useState('');
    const [secondPlayer, setSecondPlayer] = useState('');

    useEffect(() => {
        const first = localStorage.getItem('firstPlayer') || '';
        const second = localStorage.getItem('secondPlayer') || '';

        if (first.length > 0 && second.length > 0) {
            loginComplete(first, second);
        }
    },[]);

    //Store value to local storage
    useEffect(() => {
        localStorage.setItem('firstPlayer', firstPlayer);
        localStorage.setItem('secondPlayer', secondPlayer);
    }, [firstPlayer, secondPlayer]);

    const loginClick = () => {
        if (firstPlayer.length > 0 && secondPlayer.length > 0) {
            loginComplete(firstPlayer, secondPlayer);
        }
    }

    return (
        <div className='modalBackgorund'>
            <div className="modalContainer"> 
                <div >
                    <form>
                        <h3>Name Player 1</h3>
                        <input value={firstPlayer} onInput={e => setFirstPlayer(e.target.value)}></input>
                        <h3>Name Player 2</h3>
                        <input value={secondPlayer} onInput={e => setSecondPlayer(e.target.value)}></input>
                    </form>
                    <button onClick={loginClick}>
                        Start game
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default Login


 