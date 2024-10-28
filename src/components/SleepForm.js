import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>睡眠データを入力</h2>
      <label>日付:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>睡眠時間 (時間):
        <input type="number" value={sleepDuration} onChange={(e) => setSleepDuration(e.target.value)} required />
      </label>
      <label>睡眠の質:
        <input type="text" value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} required />
      </label>
      <button type="submit">登録</button>
    </form>
  );
};

export default SleepForm;
