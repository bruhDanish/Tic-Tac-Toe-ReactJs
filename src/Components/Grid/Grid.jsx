import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../Helpers/checkWinner";

function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    function play(index){
        if(turn === true){
            board[index] = 'O';
        }else{
            board[index] = 'X';
        }

         let updateBoard = [...board];

        const win = isWinner(updateBoard, turn ? 'O' : 'X');
        if(win){
            setWinner(win); 

        }
        setBoard(updateBoard);
        setTurn(!turn);
    }

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return(
        <div className="grid-wrapper">
            <h1 className="turn-highlight">Current turn: {(turn) ? 'O':'X'}</h1>
            <div className="grid">
                {board.map((el, idx) => <Card gameEnd = {winner ? true : false} key={idx} onPlay={play} player={el} index ={idx} />)}
            </div>

            {winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                    </>
                )
            }

            <button className="reset" onClick={reset}>Reset Game</button>
        </div>
    )
}

export default Grid;