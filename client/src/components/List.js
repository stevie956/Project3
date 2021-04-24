import React from "react";

const List = (props) => {
  return (
    <ul>
      {props.games.map((el, index) => (
        <li key={index} onClick={() => props.handleClick(index)}>
          nameOne: {el.nameOne} - cityOne: {el.cityOne}  --
          nameTwo: {el.nameTwo} - cityTwo: {el.cityTwo}
        </li>
      ))}
    </ul>
  );
};

export { List };
