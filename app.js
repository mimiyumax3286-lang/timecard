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

  // 曜日を日本語に変換
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const youbi = weekdays[now.getDay()];

  // 年月日 + 曜日 + 時刻（秒なし）
  const dateTime =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") +
    " (" + youbi + ") " +
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0");

  const key = getTodayKey();

  if (!records[key]) {
    records[key] = { start: [], end: [] };
  }

  records[key][type].push(dateTime);

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

    // 編集ボタン
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.onclick = () => {
      const newTime = prompt("新しい時刻を入力してください", t);
      if (newTime) {
        records[key].start[index] = newTime;
        saveRecords();
        renderToday();
      }
    };

    // 消すボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "消す";
    delBtn.onclick = () => {
      records[key].start.splice(index, 1);
      saveRecords();
      renderToday();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    startList.appendChild(li);
  });

  // 退勤
  records[key].end.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = t;

    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.onclick = () => {
      const newTime = prompt("新しい時刻を入力してください", t);
      if (newTime) {
        records[key].end[index] = newTime;
        saveRecords();
        renderToday();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "消す";
    delBtn.onclick = () => {
      records[key].end.splice(index, 1);
      saveRecords();
      renderToday();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    endList.appendChild(li);
  });
}

    const delBtn = document.createElement("button");
    delBtn.textContent = "消す";
    delBtn.onclick = () => {
      records[key].end.splice(index, 1);
      saveRecords();
      renderToday();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
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
