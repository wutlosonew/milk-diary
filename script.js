function saveEntry() {
  const input = document.getElementById('milkInput');
  const value = parseInt(input.value);
  if (isNaN(value) || value <= 0) {
    alert("กรุณาใส่ปริมาณนมที่ถูกต้อง");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem("milkData") || "{}");
  data[today] = value;
  localStorage.setItem("milkData", JSON.stringify(data));
  
  document.getElementById("mooSound").play();
  input.value = "";
  loadHistory();
}

function loadHistory() {
  const data = JSON.parse(localStorage.getItem("milkData") || "{}");
  const tbody = document.querySelector("#historyTable tbody");
  tbody.innerHTML = "";

  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    const amount = data[dateStr] || "-";
    const row = `<tr><td>${dateStr}</td><td>${amount}</td></tr>`;
    tbody.innerHTML += row;
  }
}

window.onload = loadHistory;
