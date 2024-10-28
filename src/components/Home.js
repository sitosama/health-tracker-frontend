import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [sleepData, setSleepData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [dietData, setDietData] = useState([]);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    // APIからデータを取得する
    axios.get('http://localhost:8000/api/sleep/')
      .then(response => setSleepData(response.data))
      .catch(error => console.error("Error fetching sleep data:", error));

    axios.get('http://localhost:8000/api/exercise/')
      .then(response => setExerciseData(response.data))
      .catch(error => console.error("Error fetching exercise data:", error));

    axios.get('http://localhost:8000/api/diet/')
      .then(response => setDietData(response.data))
      .catch(error => console.error("Error fetching diet data:", error));

    // 簡単なアドバイスの設定（データに基づいて調整も可能）
    setAdvice("十分な睡眠とバランスの取れた食事で、健康を保ちましょう！");
  }, []);

  return (
    <div>
      <h1>ホーム</h1>
      <div className="summary-section">
        <h2>今日のデータサマリー</h2>
        <div className="data-summary">
          <div>
            <h3>睡眠</h3>
            <p>最新の睡眠時間: {sleepData.length > 0 ? sleepData[0].sleep_duration + "時間" : "データなし"}</p>
          </div>
          <div>
            <h3>運動</h3>
            <p>最新の運動時間: {exerciseData.length > 0 ? exerciseData[0].duration + "分" : "データなし"}</p>
          </div>
          <div>
            <h3>食事</h3>
            <p>最新の食事カロリー: {dietData.length > 0 ? dietData[0].calories + "kcal" : "データなし"}</p>
          </div>
        </div>
      </div>

      <div className="trend-section">
        <h2>週間傾向</h2>
        {/* 傾向グラフなどをここに表示（サードパーティライブラリなどの導入を検討） */}
        <p>ここに週間のデータの推移を表示します。</p>
      </div>

      <div className="advice-section">
        <h2>今日のアドバイス</h2>
        <p>{advice}</p>
      </div>
    </div>
  );
};

export default Home;