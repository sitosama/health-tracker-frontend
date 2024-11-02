// Analysis.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './css/Analysis.css';

const Analysis = () => {
  const [sleepData, setSleepData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    // DjangoのAPIからデータを取得
    // 睡眠データを取得
    axios.get('http://localhost:8000/api/sleep/')
      .then(response => {
        setSleepData(response.data);
      })
      .catch(error => {
        console.error("データの取得に失敗しました:", error);
      });

     // 運動データを取得  
    axios.get('http://localhost:8000/api/exercise/')
    .then(response => {
      setExerciseData(response.data);
    })
    .catch(error => {
      console.error("データの取得に失敗しました:", error);
    });

    // 食事データを取得
    axios.get('http://localhost:8000/api/diet/')
    .then(response => {
      setDietData(response.data);
    })
    .catch(error => {
      console.error("データの取得に失敗しました:", error);
    });
  }, []);

  // グラフで使用するデータを整形
  const processedSleepData = sleepData.map(item => ({
    date: item.date,
    sleepDuration: item.sleep_duration,
  }));

  const processedExerciseData = exerciseData.map(item => ({
    date: item.date,
    duration: item.duration,
    intensity: item.intensity,
  }));

  const processedDietData = exerciseData.map(item => ({
    date: item.date,
    calories: item.calories,
  }));

  return (
    <div className="analysis-container">
       <h2 className="analysis-title">データ分析</h2>
      
      {/* 睡眠データのグラフ */}
      <h3>睡眠データ</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedSleepData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: '時間 (h)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sleepDuration" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* 運動データのグラフ */}
      <h3>運動データ</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedExerciseData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: '時間 (分)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* 食事データのグラフ */}
      <h3>食事データ</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedDietData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'カロリー (kcal)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="calories" stroke="#ffc658" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      {/* <h2 className="analysis-title">睡眠データ分析</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedSleepData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sleepDuration" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default Analysis;
