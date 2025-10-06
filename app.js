// --- Authentication ---
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const authMessage = document.getElementById('auth-message');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');

function showApp() {
  authSection.style.display = 'none';
  appSection.style.display = 'block';
}
function showAuth() {
  authSection.style.display = 'block';
  appSection.style.display = 'none';
}

// Simulate session (replace with real session in production)
function setSession(user) {
  localStorage.setItem('sessionUser', JSON.stringify(user));
}
function getSession() {
  return JSON.parse(localStorage.getItem('sessionUser'));
}
function clearSession() {
  localStorage.removeItem('sessionUser');
}

// --- Login/Register ---
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success) {
    setSession(data.user);
    showApp();
  } else {
    authMessage.textContent = data.message || 'Login failed';
  }
};
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const res = await fetch('api/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success) {
    authMessage.textContent = 'Registration successful. Please log in.';
  } else {
    authMessage.textContent = data.message || 'Registration failed';
  }
};
logoutBtn.onclick = () => {
  clearSession();
  showAuth();
};

// --- Timetable Grid ---
const timetable = document.getElementById('timetable').getElementsByTagName('tbody')[0];
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const times = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
function renderTimetable(data) {
  timetable.innerHTML = '';
  for (let t of times) {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = t;
    row.appendChild(timeCell);
    for (let d = 0; d < days.length; d++) {
      const cell = document.createElement('td');
      cell.dataset.day = d;
      cell.dataset.time = t;
      cell.ondragover = e => e.preventDefault();
      cell.ondrop = e => {
        e.preventDefault();
        const className = e.dataTransfer.getData('text/plain');
        cell.textContent = className;
        cell.className = 'class-item';
        saveTimetableToMemory();
      };
      row.appendChild(cell);
    }
    timetable.appendChild(row);
  }
  if (data) loadTimetableFromData(data);
}
renderTimetable();

// --- Drag and Drop ---
document.querySelectorAll('.class-item').forEach(item => {
  item.ondragstart = e => {
    e.dataTransfer.setData('text/plain', item.textContent);
  };
});

// --- LocalStorage ---
function saveTimetableToMemory() {
  const grid = [];
  for (let r = 0; r < times.length; r++) {
    for (let d = 0; d < days.length; d++) {
      const cell = timetable.rows[r].cells[d+1];
      if (cell.textContent) {
        grid.push({ day: d, time: times[r], class: cell.textContent });
      }
    }
  }
  localStorage.setItem('timetable', JSON.stringify(grid));
}
function loadTimetableFromMemory() {
  const data = JSON.parse(localStorage.getItem('timetable'));
  if (data) loadTimetableFromData(data);
}
function loadTimetableFromData(data) {
  renderTimetable();
  data.forEach(item => {
    const rowIdx = times.indexOf(item.time);
    if (rowIdx !== -1) {
      const cell = timetable.rows[rowIdx].cells[item.day+1];
      cell.textContent = item.class;
      cell.className = 'class-item';
    }
  });
}

document.getElementById('save-local-btn').onclick = saveTimetableToMemory;
document.getElementById('load-local-btn').onclick = loadTimetableFromMemory;

// --- Server Save/Load ---
const message = document.getElementById('message');
document.getElementById('save-server-btn').onclick = async () => {
  const user = getSession();
  if (!user) return message.textContent = 'Please log in.';
  const grid = JSON.parse(localStorage.getItem('timetable')) || [];
  const res = await fetch('api/save_schedule.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'My Schedule', data: grid, user_id: user.id })
  });
  const data = await res.json();
  message.textContent = data.message || (data.success ? 'Saved!' : 'Save failed');
};
document.getElementById('load-server-btn').onclick = async () => {
  const user = getSession();
  if (!user) return message.textContent = 'Please log in.';
  const res = await fetch('api/load_schedules.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.id })
  });
  const data = await res.json();
  if (data.success && data.schedules.length) {
    loadTimetableFromData(data.schedules[0].data);
    message.textContent = 'Loaded from server.';
  } else {
    message.textContent = data.message || 'No schedules found.';
  }
};

// --- Session check on load ---
window.onload = () => {
  if (getSession()) showApp();
  else showAuth();
};
