import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import SleepForm from './components/SleepForm';



function App() {
  const [sleepData, setSleepData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/sleep/')
      .then(response => setSleepData(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:8000/api/exercise/')
      .then(response => setExerciseData(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:8000/api/diet/')
      .then(response => setDietData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      
      <h1>健康トラッカー</h1>
      <SleepForm/>
      {/* <Home /> */}
  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Health Tracker</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
    </div>
  );
}

export default App;
