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
  function showEditPopup(originalTime, onSave) {
  // ポップアップの背景
  const bg = document.createElement("div");
  bg.style.position = "fixed";
  bg.style.top = "0";
  bg.style.left = "0";
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.style.background = "rgba(0,0,0,0.4)";
  bg.style.display = "flex";
  bg.style.justifyContent = "center";
  bg.style.alignItems = "center";
  bg.style.zIndex = "9999";

  // ポップアップ本体
  const box = document.createElement("div");
  box.style.background = "#fff";
  box.style.padding = "20px";
  box.style.borderRadius = "12px";
  box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  box.style.width = "260px";
  box.style.textAlign = "center";

  // 元の日時を分解
  const [datePart, timePart] = originalTime.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  // 年
  const yearSel = document.createElement("select");
  for (let y = 2020; y <= 2030; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    if (y == year) opt.selected = true;
    yearSel.appendChild(opt);
  }

  // 月
  const monthSel = document.createElement("select");
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    if (m == month) opt.selected = true;
    monthSel.appendChild(opt);
  }

  // 日
  const daySel = document.createElement("select");
  for (let d = 1; d <= 31; d++) {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    if (d == day) opt.selected = true;
    daySel.appendChild(opt);
  }

  // 時
  const hourSel = document.createElement("select");
  for (let h = 0; h < 24; h++) {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h.toString().padStart(2, "0");
    if (h == hour) opt.selected = true;
    hourSel.appendChild(opt);
  }

  // 分
  const minSel = document.createElement("select");
  for (let m = 0; m < 60; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m.toString().padStart(2, "0");
    if (m == minute) opt.selected = true;
    minSel.appendChild(opt);
  }

  // 保存ボタン
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "保存";
  saveBtn.style.marginTop = "10px";
  saveBtn.onclick = () => {
    const newTime =
      `${yearSel.value}-${monthSel.value.padStart(2,"0")}-${daySel.value.padStart(2,"0")} ` +
      `${hourSel.value.padStart(2,"0")}:${minSel.value.padStart(2,"0")}`;

    onSave(newTime);
    document.body.removeChild(bg);
  };

  // 組み立て
  box.appendChild(yearSel);
  box.appendChild(monthSel);
  box.appendChild(daySel);
  box.appendChild(document.createElement("br"));
  box.appendChild(hourSel);
  box.appendChild(minSel);
  box.appendChild(document.createElement("br"));
  box.appendChild(saveBtn);

  bg.appendChild(box);
  document.body.appendChild(bg);
}
}
