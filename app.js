// --- Authentication ---
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const authMessage = document.getElementById('auth-message');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');

function showApp() {
  // hide auth and show app using Tailwind utility class
  authSection.classList.add('hidden');
  appSection.classList.remove('hidden');
}
function showAuth() {
  authSection.classList.remove('hidden');
  appSection.classList.add('hidden');
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
  try {
    const res = await fetch('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text || '{}'); } catch (err) { data = { success: false, message: text || 'Invalid response' }; }
    if (res.ok && data.success) {
      setSession(data.user);
      showApp();
    } else {
      authMessage.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    authMessage.textContent = 'Network error';
    console.error(err);
  }
};
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  try {
    const res = await fetch('api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text || '{}'); } catch (err) { data = { success: false, message: text || 'Invalid response' }; }
    if (res.ok && data.success) {
      authMessage.textContent = 'Registration successful. Please log in.';
    } else {
      authMessage.textContent = data.message || 'Registration failed';
    }
  } catch (err) {
    authMessage.textContent = 'Network error';
    console.error(err);
  }
};
logoutBtn.onclick = () => {
  clearSession();
  showAuth();
};

// --- Timetable Grid ---
const timetable = document.querySelector('#timetable tbody');
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
      cell.classList.add('p-2', 'border', 'align-top');
      cell.ondragover = e => e.preventDefault();
      cell.ondrop = e => {
        e.preventDefault();
        const className = e.dataTransfer.getData('text/plain');
        cell.textContent = className;
        cell.classList.add('class-item');
        // dropped cells shouldn't be draggable
        cell.removeAttribute('draggable');
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
// attach dragstart to current and future class items using delegation
function bindDragItems() {
  document.querySelectorAll('.class-item').forEach(item => {
    item.setAttribute('draggable', 'true');
    item.ondragstart = e => {
      e.dataTransfer.setData('text/plain', item.textContent);
    };
  });
}
bindDragItems();

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
      cell.classList.add('class-item');
    }
  });
  // ensure any newly added class items are draggable
  bindDragItems();
}

document.getElementById('save-local-btn').onclick = saveTimetableToMemory;
document.getElementById('load-local-btn').onclick = loadTimetableFromMemory;

// --- Server Save/Load ---
const message = document.getElementById('message');
document.getElementById('save-server-btn').onclick = async () => {
  const user = getSession();
  if (!user) return message.textContent = 'Please log in.';
  const grid = JSON.parse(localStorage.getItem('timetable')) || [];
  try {
    const res = await fetch('api/save_schedule.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'My Schedule', data: grid, user_id: user.id })
    });
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text || '{}'); } catch (err) { data = { success: false, message: text || 'Invalid response' }; }
    message.textContent = data.message || (data.success ? 'Saved!' : 'Save failed');
  } catch (err) {
    message.textContent = 'Network error';
    console.error(err);
  }
};
document.getElementById('load-server-btn').onclick = async () => {
  const user = getSession();
  if (!user) return message.textContent = 'Please log in.';
  try {
    const res = await fetch('api/load_schedules.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    });
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text || '{}'); } catch (err) { data = { success: false, message: text || 'Invalid response' }; }
    if (data.success && data.schedules && data.schedules.length) {
      loadTimetableFromData(data.schedules[0].data);
      message.textContent = 'Loaded from server.';
    } else {
      message.textContent = data.message || 'No schedules found.';
    }
  } catch (err) {
    message.textContent = 'Network error';
    console.error(err);
  }
};

// --- Session check on load ---
window.onload = () => {
  if (getSession()) showApp();
  else showAuth();
};
