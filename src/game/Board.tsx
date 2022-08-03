import { useState } from "react";
import { Square } from "./Square";

export function Board() {
    const emptyBoard = {
        history: [{ squares: Array(9).fill(null) }],
        xIsNext: true,
        count: 0
    };

    let [state, setState] = useState(emptyBoard);

    function handleClick(i: any) {
        const squares = state.history[state.history.length - 1].squares.slice();
        if (winner != null || state.history[state.history.length - 1].squares[i]) {
            return;
        }

        squares[i] = state.xIsNext ? 'X' : 'O';
        setState({
            history: [...state.history, { squares }],
            xIsNext: !state.xIsNext,
            count: state.count + 1
        });
    }

    function renderSquare(i: any) {
        return <Square winner={(winner != null && winner.line?.includes(i))}
            value={state.history[state.history.length - 1].squares[i]}
            onClick={() => handleClick(i)}
        />;
    }

    function calculateWinner() {
        if (state.count == 0) {
            return null;
        }

        const squares = state.history[state.history.length - 1].squares;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { line: line, player: squares[a] };
            }
        }
        return null;
    }

    function restartGame() {
        setState(emptyBoard);
    }

    function previousPlay() {
        setState({
            history: state.history.slice(0, state.history.length - 1),
            xIsNext: !state.xIsNext,
            count: state.count - 1
        });
    }

    const winner = calculateWinner();
    const status = winner != null ? 'Winner is ' + winner.player : (state.count < 9 ? ('Next player: ' + (state.xIsNext ? 'X' : 'O')) : 'It\'s a draw!');
    const restart = winner != null ? true : (state.count < 9 ? false : true);
    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            <br />
            <button
                hidden={state.count == 0}
                onClick={previousPlay}
            >
                Previous play
            </button>
            <br />
            <br />
            <button
                hidden={!restart}
                onClick={restartGame}
            >
                Restart game
            </button>

        </div>
    );
}