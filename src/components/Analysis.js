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
    axios.get('http://localhost:8000/api/sleep/')
      .then(response => {
        setSleepData(response.data);
      })
      .catch(error => {
        console.error("データの取得に失敗しました:", error);
      });
    axios.get('http://localhost:8000/api/Exercise/')
    .then(response => {
      setExerciseData(response.data);
    })
    .catch(error => {
      console.error("データの取得に失敗しました:", error);
    });
    axios.get('http://localhost:8000/api/Diet/')
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
    sleepDuration: item.sleep_duration,
  }));

  const processedDietData = exerciseData.map(item => ({
    date: item.date,
    sleepDuration: item.sleep_duration,
  }));

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">睡眠データ分析</h2>
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
      </ResponsiveContainer>
    </div>
  );
};

export default Analysis;
