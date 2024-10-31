import React, { useState } from 'react';
import axios from 'axios';
import './css/SleepForm.css';

const SleepForm = () => {
  const [date, setDate] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post('http://localhost:8000/api/sleep/', {
        date: date,
        sleep_duration: sleepDuration,
        sleep_quality: sleepQuality
      });
      if (response.status === 201) {
        alert("データが登録されました！");
        // 成功したら入力フィールドをクリア
        setDate('');
        setSleepDuration('');
        setSleepQuality('');
      }else {
        console.error("予期しないレスポンス:", response);
      }
    } catch (error) {
      console.error("接続エラーが発生しました:", error);
      alert("データの登録中にエラーが発生しました。");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">睡眠データを入力</h2>
      <form onSubmit={handleSubmit} className="sleep-form">
        <label className="form-label">日付:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">睡眠時間 (時間):
          <input type="number" value={sleepDuration} onChange={(e) => setSleepDuration(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">睡眠の質:
          <input type="text" value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} required className="form-input" />
        </label>
        <button type="submit" className="submit-button">登録</button>
      </form>
    </div>
  );
};

export default SleepForm;
