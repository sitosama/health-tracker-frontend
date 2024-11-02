//「運動の種類」「時間」「強度」などの項目を入力できる
// ExerciseForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/ExerciseForm.css';

const ExerciseForm = () => {
  const [date, setDate] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/exercise/', {
        date: date,
        exercise_type: exerciseType,
        duration: duration,
        intensity: intensity
      });
      if (response.status === 201) {
        alert("運動データが登録されました！");
        setDate('');
        setExerciseType('');
        setDuration('');
        setIntensity('');
      } else {
        console.error("予期しないレスポンス:", response);
      }
    } catch (error) {
      console.error("接続エラーが発生しました:", error);
      alert("データの登録中にエラーが発生しました。");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">運動データを入力</h2>
      <form onSubmit={handleSubmit} className="exercise-form">
        <label className="form-label">日付:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">運動の種類:
          <input type="text" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">時間 (分):
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">強度:
          <select value={intensity} onChange={(e) => setIntensity(e.target.value)} required className="form-input">
            <option value="">選択してください</option>
            <option value="低">低</option>
            <option value="中">中</option>
            <option value="高">高</option>
          </select>
        </label>
        <button type="submit" className="submit-button">登録</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
