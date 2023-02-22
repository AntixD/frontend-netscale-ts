import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App(): JSX.Element {
  const [joke, setJoke] = useState<string>('');
  const [savedJokes, setSavedJokes] = useState<string[]>([]);

  useEffect(() => {
    const savedJokesString = localStorage.getItem('savedJokes');
    if (savedJokesString) {
      const savedJokesArray = JSON.parse(savedJokesString);
      setSavedJokes(savedJokesArray);
    }
  }, []);

  useEffect(() => {
    axios.get('https://api.chucknorris.io/jokes/random').then(response => {
      setJoke(response.data.value);
    });
  }, []);

  const generateJoke = () => {
    axios.get('https://api.chucknorris.io/jokes/random').then(response => {
      setJoke(response.data.value);
    });
  };

  const saveJoke = () => {
    const newSavedJokes = [...savedJokes, joke];
    setSavedJokes(newSavedJokes);
    localStorage.setItem('savedJokes', JSON.stringify(newSavedJokes));
  };

  const removeJoke = (index: number) => {
    const newSavedJokes = [...savedJokes];
    newSavedJokes.splice(index, 1);
    setSavedJokes(newSavedJokes);
    localStorage.setItem('savedJokes', JSON.stringify(newSavedJokes));
  };

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <div className="joke-container">
        <button className="generate-button" onClick={generateJoke}>Generate Joke</button>
        <p className="joke-text">{joke}</p>
        <button className="save-button" onClick={saveJoke}>Save Joke</button>
      </div>
      <div className="saved-jokes-container">
        <h2>Saved Jokes:</h2>
        <ul className="saved-jokes-list">
          {savedJokes.map((savedJoke, index) => (
            <li className="saved-joke-item" key={index}>
              {savedJoke}
              <button className="remove-button" onClick={() => removeJoke(index)}>Remove Joke</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


