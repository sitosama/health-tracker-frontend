//食事データには「食事の種類（朝食、昼食、夕食、スナック）」「カロリー」「栄養情報」などの項目を入力
// DietForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/DietForm.css';

const DietForm = () => {
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [calories, setCalories] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/diet/', {
        date: date,
        meal_type: mealType,
        calories: calories,
        notes: notes
      });
      if (response.status === 201) {
        alert("食事データが登録されました！");
        setDate('');
        setMealType('');
        setCalories('');
        setNotes('');
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
      <h2 className="form-title">食事データを入力</h2>
      <form onSubmit={handleSubmit} className="diet-form">
        <label className="form-label">日付:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">食事の種類:
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} required className="form-input">
            <option value="">選択してください</option>
            <option value="朝食">朝食</option>
            <option value="昼食">昼食</option>
            <option value="夕食">夕食</option>
            <option value="スナック">スナック</option>
          </select>
        </label>
        <label className="form-label">カロリー (kcal):
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">メモ:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input" />
        </label>
        <button type="submit" className="submit-button">登録</button>
      </form>
    </div>
  );
};

export default DietForm;
