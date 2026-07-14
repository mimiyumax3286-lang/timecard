// ローカルストレージキー
const STORAGE_KEY = "timeRecords";

// 記録データ
let records = {};

// 起動時に読み込み
loadRecords();
renderToday();

// 今日の日付キー（YYYY-MM-DD）
function getTodayKey() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

// 出勤
function clockIn() {
  addTime("start");
}

// 退勤
function clockOut() {
  addTime("end");
}

// 時刻追加
function addTime(type) {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const key = getTodayKey();

  // 今日の枠がなければ作る
  if (!records[key]) {
    records[key] = { start: [], end: [] };
  }

  // 記録追加
  records[key][type].push(time);

  // 最大10件に制限
  if (records[key][type].length > 10) {
    records[key][type].shift();
  }

  saveRecords();
  renderToday();
}

// 今日の記録を画面に表示
function renderToday() {
  const key = getTodayKey();
  const startList = document.getElementById("startList");
  const endList = document.getElementById("endList");

  startList.innerHTML = "";
  endList.innerHTML = "";

  if (!records[key]) return;

  // 出勤
  records[key].start.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = t;

    const btn = document.createElement("button");
    btn.textContent = "消す";
    btn.onclick = () => {
      records[key].start.splice(index, 1);
      saveRecords();
      renderToday();
    };

    li.appendChild(btn);
    startList.appendChild(li);
  });

  // 退勤
  records[key].end.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = t;

    const btn = document.createElement("button");
    btn.textContent = "消す";
    btn.onclick = () => {
      records[key].end.splice(index, 1);
      saveRecords();
      renderToday();
    };

    li.appendChild(btn);
    endList.appendChild(li);
  });
}

// 保存
function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// 読み込み
function loadRecords() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    records = JSON.parse(data);
  }
}
