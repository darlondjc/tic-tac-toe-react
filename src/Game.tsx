import './App.css'
import { Board } from './game/Board';


function Game() {

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game
