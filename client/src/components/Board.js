import React from "react";
import NumberSquare from "./Square";

const Board = (props) => (
  <div className="board">
    {props.squares.map((square, gameIndex) => (
      <NumberSquare
        key={gameIndex}
        value={square}
        onClick={() => {
        props.onClick(gameIndex)
        }}
      />
    ))}
  </div>
);

export default Board;
