import React, { useState, useEffect } from 'react'
import Login from './Login';
import Navbar from './Navbar';
import Game from './Game';
import Endgame from './Endgame';

const Board = () => {
    const [buttonVisibility, setButtonVisibility] = useState(false);
    const [winMessage, setWinMessage] = useState('')
    const [message, setMessage] = useState(false)
    const [gameHistory, setGameHistory] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXisNext] = useState(true);
    const [openLogin, setOpenLogin] = useState(true);
    const [openEndGame, setOpenEndGame] = useState(false);
    const firstPlayerWinCounter = gameHistory.filter(hist => hist.winner === 'X').length;
    const secondPlayerWinCounter = gameHistory.filter(hist => hist.winner === 'O').length;
    const drawCounter = gameHistory.filter(hist => hist.winner === 'draw').length;
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [secondPlayer, setSecondPlayer] = useState(null);
    const [ID, setID] = useState(()=>{
        const lastID = JSON.parse(localStorage.getItem('ID'));
        return lastID || 1;
    });
    

    let tiles = [...board];
    const square = () =>  board.map((i, index) => {
        return <div value={board[index]} key={index} onClick={ () => play(index)}>{board[index]}</div>
    });

    useEffect(() => {
        const gameHist = localStorage.getItem('gameHistory');
        if (gameHist) {
            setGameHistory(JSON.parse(gameHist));
        }
    }, [])

  
/*
    const getWinnerFromHistElem = (histElem) => {
        if (histElem) {
            return histElem.winner === 'X' ? histElem.xName : histElem.oName;
        }

        return null;
    };
   */
    const play = (index) => {
        
        if(tiles[index]) {
          return  setMessage(true)
        };
        setMessage(false)
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
                        onPlayerWin('X');
                        setID(ID + 1);
                        setWinMessage(`${firstPlayer} win`)
                        setButtonVisibility(true);
                    }else if (tiles[a] === 'O'){
                        setWinMessage(`${secondPlayer} win`)
                        onPlayerWin('O');
                        setID(ID + 1);
                        setButtonVisibility(true);
                    }
                }
                //chech for draw
                const allFilled = tiles.filter(Boolean).length === 9;
                if(allFilled  && (tiles[a]===tiles[b] || tiles[a]===tiles[c])){
                    setWinMessage('DRAW')
                    onPlayerWin('draw');
                    setID(ID + 1);
                    setButtonVisibility(true);
                }
        }
        
        
    }
  
    const onPlayerWin = (winner) => {

        const getMaxId = () => {
            var max = 0;

            for (const elem of gameHistory) {
                if (elem.ID > max) {
                    max = elem.ID;
                }
            }

            return max;
        }

        const maxId = getMaxId();
        
        const newGameHistory = [
            ...gameHistory,
            {
                ID: maxId + 1,
                winner,
                time: new Date(),
                xName: firstPlayer,
                oName: secondPlayer,
            }
        ];
        
        setGameHistory(newGameHistory);
        
        


        localStorage.setItem('gameHistory', JSON.stringify(newGameHistory));
    };
    const resetBoard = () => {
       setBoard(Array(9).fill(null));
        setOpenEndGame(false);
        setWinMessage('');
        setButtonVisibility(false);
    }

    const onLogin = (first, second) => {
        setFirstPlayer(first);
        setSecondPlayer(second);
        setOpenLogin(false);
    }
    const showHistory = () => {
        setOpenEndGame(true);
    }
        
    
   return (
        <div>
            {openLogin &&
             <Login 
                loginComplete={onLogin}
            />}
            {openEndGame &&
            <Endgame
                gameHistory={gameHistory}
                resetGame={resetBoard}
                ID={ID}
                winMessage={winMessage}
            />}
            
            <Navbar 
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            firstPlayerWinCounter={firstPlayerWinCounter}
            secondPlayerWinCounter={secondPlayerWinCounter}
            drawCounter = {drawCounter}
            />
            <Game 
            xIsNext={xIsNext}
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            board = {board}
            loginComplete={onLogin}
            />
            <div className='tiles-div'>
               {square()}
            </div>
               {message &&
               <div className='error-message'>Choose unoccupied cell!!</div>
               }

            <div className='win-message'>{winMessage}</div>
            { buttonVisibility &&
                <button onClick={showHistory}>Show history</button>
            }
        </div>
    )
}
export default Board;



