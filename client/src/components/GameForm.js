import React, { useState } from "react";

const GameForm = (props) => {
  const [formState, setFormState] = useState({
    nameOne: '',
    cityOne: '',
    nameTwo: '',
    cityTwo: ''
  })

  const handleChange = (e) => {
      const newState = { ...formState }
      newState[e.target.name] = e.target.value;
      setFormState(newState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    props.submit(formState.nameOne, formState.cityOne, formState.nameTwo, formState.cityTwo);
  };

  return (
      <div>
          <h2>Create Game</h2>
          <form onSubmit={handleSubmit}>
              <label>
              Player One 
                  <input name="nameOne" value={formState.nameOne} onChange={handleChange}></input>
              </label>
              <label>
              Player One City
              <input name="cityOne" value={formState.cityOne} onChange={handleChange}></input>
              </label>
              <label>
              Player Two
              <input name="nameTwo" value={formState.nameTwo} onChange={handleChange}></input>
              </label>
              Player Two City 
              <label>
              <input name="cityTwo" value={formState.cityTwo} onChange={handleChange}></input>
              </label>
              <button type="submit">Create Game</button>
          </form>
      </div>
  );
};

export { GameForm };