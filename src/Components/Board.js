import React, { useState } from 'react'
import Login from './Login';
import Navbar from './Navbar';

const Board = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXisNext] = useState(true);
    const [winner, setWinner] = useState('');
    const [openLogin, setOpenLogin] = useState(true);
    const [firstPlayerWinCounter, setFirstPlayerWinCounter] = useState(() =>{
        const saved = localStorage.getItem('firstPlayerWinCounter');
         return parseFloat(saved) || 0;
    });
    const [secondPlayerWinCounter, setSecondPlayerWinCounter] = useState(() => {
        const saved = localStorage.getItem('secondPlayerWinCounter');
        return parseFloat(saved) || 0;
    });
    const [drawCounter, setDrawCounter] = useState(() => {
        const saved = localStorage.getItem('drawCounter');
        return parseFloat(saved) || 0;
    })
    //need counter to check if it is a draw 
    const [counter, setCounter] = useState(1);
    const [firstPlayer, setFirstPlayer] = useState(() =>{
        const saved = localStorage.getItem('firstPlayer');
        const initialValue = JSON.parse(saved);
        return initialValue || '';
    });
    const [secondPlayer, setSecondPlayer] = useState(() => {
        const saved = localStorage.getItem('secondPlayer');
        const initialValue = JSON.parse(saved);
        return initialValue || '';
    });
    

    let tiles = [...board];
    const square = () =>  board.map((i, index) => {
        return <div value={board[index]} key={index} onClick={ () => play(index)}>{board[index]}</div>
    });
    
    const play = (index) => {
        setCounter(counter + 1)
        if(tiles[index]) return;
        tiles[index] = xIsNext ? 'X' : 'O';
        setXisNext(!xIsNext);
        setBoard(tiles);
        

         // lines for win
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        //check for winner
        for(let i = 0; i < lines.length; i++){
           const [a, b, c] = lines[i];
                if(tiles[a] && tiles[a]===tiles[b] && tiles[a]===tiles[c]){
                    if(tiles[a] === 'X'){
                        setWinner(`The winner is ${firstPlayer}`)
                        setFirstPlayerWinCounter(firstPlayerWinCounter + 1)
                    }else if (tiles[a] === 'O'){
                        setWinner(`The winner is ${secondPlayer}`)
                        setSecondPlayerWinCounter(secondPlayerWinCounter + 1)
                    }
                }
                //chech for draw
                if(counter === 9  && (tiles[a]===tiles[b] || tiles[a]===tiles[c])){
                    setWinner('DRAW')
                    setDrawCounter(drawCounter + 1)
                }
        }
    }
  
        
    
   return (
        <div>
            {openLogin &&
             <Login 
                setOpenLogin={setOpenLogin} 
                firstPlayer={firstPlayer}
                secondPlayer={secondPlayer}
                setFirstPlayer={setFirstPlayer}
                setSecondPlayer={setSecondPlayer}
            />}
            <Navbar 
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            firstPlayerWinCounter={firstPlayerWinCounter}
            secondPlayerWinCounter={secondPlayerWinCounter}
            drawCounter = {drawCounter}
            />
            <div className='tiles-div'>
               
                    {square()}
                </div>
            <div>
                <h1>{winner}</h1>
            </div>
            
        </div>
    )
}
export default Board;



