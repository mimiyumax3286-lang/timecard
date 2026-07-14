// ローカルストレージに保存するキー
const KEY = "timecard_history";

// 出勤
document.getElementById("startBtn").onclick = () => {
  const time = new Date();
  saveRecord("出勤", time);
  showResult("出勤しました: " + time.toLocaleString());
};

// 退勤
document.getElementById("endBtn").onclick = () => {
  const time = new Date();
  saveRecord("退勤", time);
  showResult("退勤しました: " + time.toLocaleString());
};

// 記録を保存
function saveRecord(type, time) {
  const history = JSON.parse(localStorage.getItem(KEY)) || [];
  history.push({ type, time });
  localStorage.setItem(KEY, JSON.stringify(history));
  showHistory();
}

// 結果表示
function showResult(text) {
  document.getElementById("result").innerText = text;
}

// 履歴表示
function showHistory() {
  const history = JSON.parse(localStorage.getItem(KEY)) || [];
  const div = document.getElementById("history");

  div.innerHTML = "<h2>履歴</h2>";
  history.forEach(item => {
    div.innerHTML += `<p>${item.type}: ${new Date(item.time).toLocaleString()}</p>`;
  });
}

// 初期表示
showHistory();