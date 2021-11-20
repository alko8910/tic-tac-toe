import React, { useState, useEffect } from 'react'
import Login from './Login';
import Navbar from './Navbar';
import Game from './Game';
import Endgame from './Endgame';

const Board = () => {
    let ID = 1;
    const [gameHistory, setGameHistory] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXisNext] = useState(true);
    const [openLogin, setOpenLogin] = useState(true);
    const [openEndGame, setOpenEndGame] = useState(false);
    const firstPlayerWinCounter = gameHistory.filter(hist => hist.winner === 'X').length;
    const secondPlayerWinCounter = gameHistory.filter(hist => hist.winner === 'O').length;
    const drawCounter = gameHistory.filter(hist => hist.winner === null).length;

    //need counter to check if it is a draw 
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [secondPlayer, setSecondPlayer] = useState(null);
    

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

    const onPlayerWin = (winner) => {
        const newGameHistory = [
            ...gameHistory,
            {
                winner,
                time: new Date(),
                xName: firstPlayer,
                oName: secondPlayer,
        
            }
        ];

        setGameHistory(newGameHistory);
        setOpenEndGame(true);

        localStorage.setItem('gameHistory', JSON.stringify(newGameHistory));
    };

    const getWinnerFromHistElem = (histElem) => {
        if (histElem) {
            return histElem.winner === 'X' ? histElem.xName : histElem.oName;
        }

        return null;
    };
    
    const play = (index) => {
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
                        onPlayerWin('X');
                    }else if (tiles[a] === 'O'){
                        onPlayerWin('O');
                    }
                }
                //chech for draw
                const allFilled = tiles.filter(Boolean).length === 9;
                if(allFilled  && (tiles[a]===tiles[b] || tiles[a]===tiles[c])){
                    onPlayerWin('draw');
                }
        }
    }
  

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setOpenEndGame(false)
    }

    const onLogin = (first, second) => {
        setFirstPlayer(first);
        setSecondPlayer(second);
        setOpenLogin(false);
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
            />
            <div className='tiles-div'>
               
                    {square()}
                </div>
            <div>
                <h1>{getWinnerFromHistElem(gameHistory.slice(-1)[0])}</h1>
            </div>
            
        </div>
    )
}
export default Board;



