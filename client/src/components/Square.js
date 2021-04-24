import React from "react";

const NumberSquare =(props) => {
 
    return (
    <button className="square" onClick={props.onClick}>{props.value}</button>
 );
}

export default NumberSquare;
