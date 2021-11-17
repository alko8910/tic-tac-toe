import React, { useState } from 'react'

const Board = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXisNext] = useState(true);
    const [winner, setWinner] = useState('')
    let tiles = [...board];
    const square = () =>  board.map((i, index) => {
        return <div value={board[index]}  key={index} onClick={ () => play(index)}>{board[index]}</div>
    });
    
    const play = (index) => {
        if(tiles[index]) return;
        tiles[index] = xIsNext ? 'X' : 'O';
        setXisNext(!xIsNext);
        setBoard(tiles);
        //console.log(board)
        //console.log(tiles)

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
                setWinner(`The winner is ${tiles[a]}`)
            }
        }
        
    }

   
   



    return (
        <div>
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



/*const [player, setPlayer] = useState('x')
    let tiles = [];

    
        const createTiles = (key) => {
            
        for (var i = 1; i < 10; i++){
            tiles.push(
               <div id={i} key={i} onClick={ (e) => play(id)}>5</div>
               
            )
        }
    return tiles
    
    }
const play = (e) => {
        console.log('aaa')
        //console.log(e.target.id)
        let squares = [...tiles];
        console.log(tiles[e.target.id]);
        squares[e.target.id].value = 'a';
     } 
     return (
        <div className='tiles-div'>
            <span> {createTiles()} </span>
        </div>
    )
}*/