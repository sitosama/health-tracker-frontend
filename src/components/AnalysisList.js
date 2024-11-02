// AnalysisList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AnalysisList.css';

const Analysis = () => {
  const [sleepData, setSleepData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    // 睡眠データを取得
    axios.get('http://localhost:8000/api/sleep/')
      .then(response => setSleepData(response.data))
      .catch(error => console.error("睡眠データの取得に失敗しました:", error));

    // 運動データを取得
    axios.get('http://localhost:8000/api/exercise/')
      .then(response => setExerciseData(response.data))
      .catch(error => console.error("運動データの取得に失敗しました:", error));

    // 食事データを取得
    axios.get('http://localhost:8000/api/diet/')
      .then(response => setDietData(response.data))
      .catch(error => console.error("食事データの取得に失敗しました:", error));
  }, []);

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">データ分析</h2>

      {/* 睡眠データの一覧 */}
      <h3>睡眠データ</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>睡眠時間 (時間)</th>
            <th>睡眠の質</th>
          </tr>
        </thead>
        <tbody>
          {sleepData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.sleep_duration}</td>
              <td>{item.sleep_quality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 運動データの一覧 */}
      <h3>運動データ</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>運動の種類</th>
            <th>時間 (分)</th>
            <th>強度</th>
          </tr>
        </thead>
        <tbody>
          {exerciseData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.exercise_type}</td>
              <td>{item.duration}</td>
              <td>{item.intensity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 食事データの一覧 */}
      <h3>食事データ</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>食事の種類</th>
            <th>カロリー (kcal)</th>
            <th>メモ</th>
          </tr>
        </thead>
        <tbody>
          {dietData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.meal_type}</td>
              <td>{item.calories}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;
