import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Board from "./Board";
import calculateWinner from "./Winner";
import { GameForm } from "./GameForm";
import { List } from "./List";
import { GameFormEdit } from "./GameFormEdit";
import { DeleteGameForm } from "./DeleteGameForm";

const FunctionalGameContainer = () => {
  //initialise the variables using hooks
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  const [gameList, setGameList] = useState([]);
  const [gameEdited, setGameEdited] = useState(false);
  const [gameDeleted, setGameDeleted] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);

  const [gameEdit, setGameEdit] = useState({
    nameOne: "",
    cityOne: "",
    nameTwo: "",
    cityTwo: "",
  });
  const [gameDelete, setGameDelete] = useState({
    nameOne: "",
    cityOne: "",
    nameTwo: "",
    cityTwo: "",
  });

  const handleGameClick = (gameIndex) => {
    console.log("gameIndex", gameIndex);
    const gameHistory = history.slice(0, stepNumber + 1);
    const gameCurrent = gameHistory[history.length - 1];
    const squares = [...gameCurrent];

    //if there has been a winner or the squares have been taken then return
    if (winner || squares[gameIndex]) return;
    //click a square
    squares[gameIndex] = xO;
    console.log(gameHistory, squares);
    //set the state for history, stepnumber xIsNext, edit
    setHistory([...gameHistory, squares]);
    setStepNumber(gameHistory.length);
    setXIsNext(!xIsNext);
  };
  const handleMatchEditClick = (gameIndex) => {
    const game = gameList[gameIndex];
    setGameEdit(game);
    setGameDelete(game);
  };

  const handleEditGame = (game) => {
    console.log("game", game);
    const foundGameIndex = gameList.findIndex((gameEl) => {
      return gameEl._id === game._id;
    });
    console.log("GAME FOUND!", foundGameIndex);
    gameList[foundGameIndex] = game;
    setGameList(gameList);
    setGameEdited(true);

    fetch(`http://localhost:4000/ticTacToe/edit/${game._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  };

  const handleDeleteGame = (game) => {
    console.log("game", game);
    const foundGameIndex = gameList.findIndex((gameEl) => {
      return gameEl._id === game._id;
    });
    console.log("GAME FOUND!", foundGameIndex);
    gameList[foundGameIndex] = game;
    setGameList(gameList);
    setGameDeleted(true);

    fetch(`http://localhost:4000/ticTacToe/delete/${game._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  };

  const handleGameFormSubmit = (nameOne, cityOne, nameTwo, cityTwo) => {
    const newGame = {
      nameOne: nameOne,
      cityOne: cityOne,
      nameTwo: nameTwo,
      cityTwo: cityTwo,
    };
    const newGames = [...gameList];
    newGames.push(newGame);
    setGameList(newGame);

    fetch("http://localhost:4000/ticTacToe/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newGame),
    }).then((response) => {
      console.log("new game created", response);
    });
  };

  useEffect(() => {
    fetch("http://localhost:4000/ticTacToe/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("games reponse", response);
        return response.json();
      })
      .then((gameData) => {
        console.log("gameData:", gameData);

        setGameList(gameData.data);
        setGameEdited(false);
      });
  }, [gameEdited]);

  useEffect(() => {
    fetch("http://localhost:4000/ticTacToe/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("games reponse", response);
        return response.json();
      })
      .then((gameData) => {
        console.log("gameData:", gameData);

        setGameList(gameData.data);
        setGameDeleted(false);
      });
  }, [gameDeleted]);

  useEffect(() => {
    fetch("http://localhost:4000/ticTacToe/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("games reponse", response);
        return response.json();
      })
      .then((gameData) => {
        console.log("gameData:", gameData);

        setGameList(gameData.data);
        setGameCreated(true);
      });
  }, [gameCreated]);

  useEffect(() => {
    fetch("http://localhost:4000/ticTacToe/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("games reponse", response);
        return response.json();
      })
      .then((gameData) => {
        console.log("gameData:", gameData);

        setGameList(gameData.data);
      });
  }, [gameList]);



  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = () =>
    history.map((_step, move) => {
      const dest = move ? "Go to move" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{dest}</button>
        </li>
      );
    });

  return (
    <Router>
      <div>
        <h1>Tic-Tac-Toe</h1>
        {gameList.length && (
          <List games={gameList} handleClick={handleMatchEditClick} />
        )}
        <Link to="/match/create-match">Create Match</Link>
        <Link to="/match/edit-match">Edit Match</Link>
        <Link to="/match/delete-match">Delete Match</Link>
        <Switch>
          <Route path="/match/create-match">
            <GameForm submit={handleGameFormSubmit} />
          </Route>
          <Route path="/match/edit-match">
            <GameFormEdit submit={handleEditGame} game={gameEdit} />
          </Route>
          <Route path="/match/delete-match">
            <DeleteGameForm submit={handleDeleteGame} game={gameDelete} />
          </Route>
        </Switch>
        <Board squares={history[stepNumber]} onClick={handleGameClick} />
        <div className="info-wrapper">
          <div>
            <h3>History</h3>
            {moves()}
          </div>
          <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        </div>
      </div>
    </Router>
  );
};

export default FunctionalGameContainer;
