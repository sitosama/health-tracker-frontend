//App.jsにルーティングを追加して画面遷移をする
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/Home';
import SleepForm from './components/SleepForm';
import Analysis from './components/Analysis';



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
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>健康トラッカー</h1>
        {/* ナビゲーションリンクを追加 */}
        <nav>
          <Link to="/">ホーム</Link> | 
          <Link to="/sleep">睡眠データの登録</Link>
          <Link to="/analysis">データ分析</Link>
        </nav>
      </header>

      {/* ルーティング設定 */}
      <Routes>
        {/* ホーム画面 */}
        <Route path="/" element={<Home />} />
        {/* SleepForm画面 */}
        <Route path="/sleep" element={<SleepForm />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </div>
  </Router>
  
  );
}

export default App;
