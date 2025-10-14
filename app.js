(() => {
const TIMETABLE_KEY = 'timetable';
const SESSION_KEY = 'sessionUser';
const API_ENDPOINTS = {
  login: 'api/login.php',
  register: 'api/register.php',
  save: 'api/save_schedule.php',
  load: 'api/load_schedules.php',
  remove: 'api/delete_schedule.php',
  updatePassword: 'api/update_password.php'
};
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const state = {
  session: null,
  schedules: []
};

let vantaEffect = null;

document.addEventListener('DOMContentLoaded', () => {
  state.session = getSession();
  initVanta();
  initAuthModal();
  highlightActiveNav();
  updateNavAuth();
  initPage();
  if (window.AOS) window.AOS.init({ once: true });
  if (window.feather) window.feather.replace({ 'aria-hidden': 'true' });
});

window.addEventListener('beforeunload', () => {
  if (vantaEffect && typeof vantaEffect.destroy === 'function') {
    vantaEffect.destroy();
  }
});

function initPage() {
  const page = getPage();
  switch (page) {
    case 'index':
      initBuilderPage();
      break;
    case 'schedules':
      initSchedulesPage();
      break;
    case 'account':
      initAccountPage();
      break;
    default:
      break;
  }
}

function getPage() {
  return document.body.dataset.page || 'index';
}

function initVanta() {
  const container = document.getElementById('vanta-bg');
  if (!container || !window.VANTA) return;
  vantaEffect = window.VANTA.GLOBE({
    el: container,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x6366f1,
    color2: 0x9333ea,
    backgroundColor: 0x020617
  });
}

function highlightActiveNav() {
  const navLinks = document.querySelectorAll('#nav-links .nav-link');
  const page = getPage();
  const match = {
    index: 'index.html',
    schedules: 'schedules.html',
    account: 'account.html'
  };
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(match[page])) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function attachLoginTriggers() {
  const triggers = document.querySelectorAll('#login-btn, #get-started');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (event.target && event.target.id === 'get-started') {
        const builder = document.getElementById('timetable');
        if (builder) builder.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      openAuthModal('login');
    });
  });
}

function updateNavAuth() {
  const container = document.getElementById('nav-auth');
  if (!container) return;
  if (state.session) {
    container.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 rounded-full bg-white/10 text-indigo-100 text-sm">${escapeHtml(state.session.username)}</span>
        <button id="nav-logout-btn" class="btn-secondary">Sign out</button>
      </div>`;
  } else {
    container.innerHTML = '<button id="login-btn" class="btn-primary">Login</button>';
  }
  if (window.feather) window.feather.replace();
  attachLoginTriggers();
  const logoutBtn = container.querySelector('#nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      updateNavAuth();
      notify('Signed out successfully.', 'info');
      const page = getPage();
      if (page === 'index') refreshSavedSchedules();
      if (page === 'schedules') renderSchedulesGrid([]);
      if (page === 'account') updateAccountCard();
    });
  }
}

function initAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  const tabs = modal.querySelectorAll('.modal-tab');
  const panels = modal.querySelectorAll('.modal-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(panel => panel.classList.add('hidden'));
      tab.classList.add('active');
      const target = modal.querySelector(`#${tab.dataset.target}`);
      if (target) target.classList.remove('hidden');
      modal.querySelector('#auth-message').textContent = '';
    });
  });
  modal.addEventListener('click', event => {
    if (event.target.dataset.dismiss === 'auth-modal') {
      closeAuthModal();
    }
  });
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);
  const loginForm = modal.querySelector('#login-form');
  const registerForm = modal.querySelector('#register-form');
  if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
  if (registerForm) registerForm.addEventListener('submit', handleRegisterSubmit);
  attachLoginTriggers();
}

function openAuthModal(panel = 'login') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('open'), 10);
  const tabs = modal.querySelectorAll('.modal-tab');
  tabs.forEach(tab => {
    const isTarget = tab.dataset.target === `${panel}-panel`;
    tab.classList.toggle('active', isTarget);
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.toggle('hidden', !isTarget);
  });
  modal.querySelector('#auth-message').textContent = '';
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.classList.add('hidden');
  const form = modal.querySelector('form');
  if (form) form.reset();
  modal.querySelector('#auth-message').textContent = '';
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.querySelector('#login-username').value.trim();
  const password = form.querySelector('#login-password').value;
  try {
    const result = await postJSON(API_ENDPOINTS.login, { username, password });
    if (!result.success) throw new Error(result.message || 'Login failed');
    setSession(result.user);
    updateNavAuth();
    closeAuthModal();
    notify(`Welcome back, ${result.user.username}!`, 'success');
    const page = getPage();
    if (page === 'index') { refreshSavedSchedules(); }
    if (page === 'schedules') { refreshSchedulesGrid(); }
    if (page === 'account') { updateAccountCard(); }
  } catch (error) {
    setAuthMessage(error.message, 'error');
  }
}

async function handleRegisterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.querySelector('#register-username').value.trim();
  const password = form.querySelector('#register-password').value;
  if (username.length < 3) {
    setAuthMessage('Usernames need at least 3 characters.', 'error');
    return;
  }
  if (password.length < 4) {
    setAuthMessage('Password must be at least 4 characters.', 'error');
    return;
  }
  try {
    const result = await postJSON(API_ENDPOINTS.register, { username, password });
    if (!result.success) throw new Error(result.message || 'Registration failed');
    setAuthMessage('Registration successful! Sign in to continue.', 'success');
    openAuthModal('login');
    const loginUsername = document.getElementById('login-username');
    if (loginUsername) loginUsername.value = username;
  } catch (error) {
    setAuthMessage(error.message, 'error');
  }
}

function setAuthMessage(message, type = 'info') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  const el = modal.querySelector('#auth-message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('text-red-400', 'text-emerald-300', 'text-slate-300');
  if (type === 'error') el.classList.add('text-red-400');
  else if (type === 'success') el.classList.add('text-emerald-300');
  else el.classList.add('text-slate-300');
}

function setSession(user) {
  state.session = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function clearSession() {
  state.session = null;
  localStorage.removeItem(SESSION_KEY);
}

function notify(message, type = 'info') {
  const page = getPage();
  if (page === 'index') {
    setStatusMessage(message, type);
  } else if (page === 'schedules') {
    setSchedulesMessage(message, type);
  } else if (page === 'account') {
    setAccountMessage(message, type);
  }
}

// --- Builder page ---
function initBuilderPage() {
  const table = document.querySelector('#timetable tbody');
  if (!table) return;
  buildTimetableSkeleton(table);
  bindCourseCards();
  loadTimetableFromMemory();
  const scheduleNameInput = document.getElementById('schedule-name');
  if (scheduleNameInput && !scheduleNameInput.value) scheduleNameInput.value = 'My Schedule';
  registerBuilderActions();
  refreshSavedSchedules();
  const params = new URLSearchParams(window.location.search);
  if (params.has('loaded')) {
    notify(`Loaded ${decodeURIComponent(params.get('loaded'))} from cloud.`, 'success');
    window.history.replaceState({}, document.title, 'index.html');
  }
}

function registerBuilderActions() {
  const newBtn = document.getElementById('new-schedule-btn');
  if (newBtn) newBtn.addEventListener('click', clearTimetable);
  const addCourseBtn = document.getElementById('add-course-btn');
  if (addCourseBtn) addCourseBtn.addEventListener('click', () => {
    const name = prompt('Enter a course name');
    if (!name) return;
    addCourseCard(name.trim());
  });
  const saveLocalBtn = document.getElementById('save-local-btn');
  if (saveLocalBtn) saveLocalBtn.addEventListener('click', () => saveTimetableToMemory());
  const loadLocalBtn = document.getElementById('load-local-btn');
  if (loadLocalBtn) loadLocalBtn.addEventListener('click', loadTimetableFromMemory);
  const saveServerBtn = document.getElementById('save-server-btn');
  if (saveServerBtn) saveServerBtn.addEventListener('click', saveScheduleToServer);
  const loadServerBtn = document.getElementById('load-server-btn');
  if (loadServerBtn) loadServerBtn.addEventListener('click', () => syncCloud(true));
  const refreshBtn = document.getElementById('refresh-schedules-btn');
  if (refreshBtn) refreshBtn.addEventListener('click', refreshSavedSchedules);
}

function buildTimetableSkeleton(tbody) {
  tbody.innerHTML = '';
  TIMES.forEach(time => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = time;
    timeCell.classList.add('timetable-cell', 'font-medium');
    row.appendChild(timeCell);
    DAYS.forEach((_, index) => {
      const cell = document.createElement('td');
      cell.dataset.day = `${index}`;
      cell.dataset.time = time;
      cell.classList.add('timetable-cell');
      cell.addEventListener('dragover', event => event.preventDefault());
      cell.addEventListener('dragenter', () => cell.classList.add('ring-2', 'ring-indigo-400/60'));
      cell.addEventListener('dragleave', () => cell.classList.remove('ring-2', 'ring-indigo-400/60'));
      cell.addEventListener('drop', event => handleCellDrop(event, cell));
      cell.addEventListener('dblclick', () => clearCell(cell));
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

function handleCellDrop(event, cell) {
  event.preventDefault();
  cell.classList.remove('ring-2', 'ring-indigo-400/60');
  const course = event.dataTransfer.getData('text/plain');
  if (!course) return;
  setCellCourse(cell, course);
  saveTimetableToMemory({ silent: true });
}

function setCellCourse(cell, course) {
  cell.textContent = course;
  cell.dataset.course = course;
  cell.classList.toggle('filled', Boolean(course));
}

function clearCell(cell) {
  setCellCourse(cell, '');
  saveTimetableToMemory({ silent: true });
}

function clearTimetable() {
  const tbody = document.querySelector('#timetable tbody');
  if (!tbody) return;
  buildTimetableSkeleton(tbody);
  const scheduleNameInput = document.getElementById('schedule-name');
  if (scheduleNameInput) scheduleNameInput.value = 'My Schedule';
  localStorage.removeItem(TIMETABLE_KEY);
  notify('Cleared timetable. Start fresh!', 'info');
}

function bindCourseCards() {
  document.querySelectorAll('.course-card').forEach(card => {
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', card.dataset.course || card.textContent.trim());
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
}

function addCourseCard(name) {
  const container = document.getElementById('classes');
  if (!container) return;
  const card = document.createElement('div');
  card.className = 'course-card';
  card.textContent = name;
  card.dataset.course = name;
  container.appendChild(card);
  bindCourseCards();
}

function exportTimetable() {
  const tbody = document.querySelector('#timetable tbody');
  if (!tbody) return [];
  const entries = [];
  Array.from(tbody.rows).forEach((row, rowIndex) => {
    Array.from(row.cells).forEach((cell, cellIndex) => {
      if (cellIndex === 0) return;
      const course = cell.dataset.course || cell.textContent.trim();
      if (course) {
        entries.push({ day: cellIndex - 1, time: TIMES[rowIndex], class: course });
      }
    });
  });
  return entries;
}

function saveTimetableToMemory(options = {}) {
  const data = exportTimetable();
  const scheduleNameInput = document.getElementById('schedule-name');
  const payload = {
    name: scheduleNameInput ? scheduleNameInput.value.trim() || 'My Schedule' : 'My Schedule',
    data
  };
  localStorage.setItem(TIMETABLE_KEY, JSON.stringify(payload));
  if (!options.silent) notify('Saved locally.', 'success');
}

function loadTimetableFromMemory() {
  const raw = localStorage.getItem(TIMETABLE_KEY);
  if (!raw) return;
  try {
    const payload = JSON.parse(raw);
    const schedule = Array.isArray(payload) ? { name: 'My Schedule', data: payload } : payload;
    loadTimetableFromData(schedule.data, schedule.name);
  } catch (error) {
    console.error('Failed to parse local timetable', error);
  }
}

function loadTimetableFromData(data = [], name = 'My Schedule') {
  const tbody = document.querySelector('#timetable tbody');
  if (!tbody) return;
  buildTimetableSkeleton(tbody);
  data.forEach(entry => {
    if (typeof entry.day === 'undefined' || !entry.time) return;
    const rowIndex = TIMES.indexOf(entry.time);
    if (rowIndex === -1) return;
    const cell = tbody.rows[rowIndex].cells[entry.day + 1];
    if (cell) setCellCourse(cell, entry.class);
  });
  bindCourseCards();
  const scheduleNameInput = document.getElementById('schedule-name');
  if (scheduleNameInput) scheduleNameInput.value = name || 'My Schedule';
}

function setStatusMessage(message, type = 'info') {
  const el = document.getElementById('message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('text-emerald-300', 'text-rose-300', 'text-slate-300');
  if (type === 'success') el.classList.add('text-emerald-300');
  else if (type === 'error') el.classList.add('text-rose-300');
  else el.classList.add('text-slate-300');
}

async function saveScheduleToServer() {
  if (!requireLogin('Sign in to save schedules in the cloud.')) return;
  const nameInput = document.getElementById('schedule-name');
  const name = nameInput ? nameInput.value.trim() || 'Untitled Schedule' : 'Untitled Schedule';
  const data = exportTimetable();
  if (!data.length) {
    notify('Add at least one course before saving.', 'error');
    return;
  }
  setStatusMessage('Saving to cloud…', 'info');
  try {
    const result = await postJSON(API_ENDPOINTS.save, {
      user_id: state.session.id,
      name,
      data
    });
    notify(result.message || 'Schedule saved to cloud.', 'success');
    await refreshSavedSchedules();
  } catch (error) {
    notify(error.message || 'Could not save schedule.', 'error');
  }
}

async function syncCloud(loadLatest) {
  const schedules = await refreshSavedSchedules();
  if (loadLatest && schedules.length) {
    loadTimetableFromData(schedules[0].data, schedules[0].name);
    notify(`Loaded ${schedules[0].name} from cloud.`, 'success');
  }
}

async function refreshSavedSchedules() {
  const list = document.getElementById('saved-list');
  const empty = document.getElementById('saved-empty');
  if (!list) return [];
  if (!state.session) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    setStatusMessage('Sign in to sync your cloud schedules.', 'info');
    return [];
  }
  try {
    const result = await postJSON(API_ENDPOINTS.load, { user_id: state.session.id });
    state.schedules = result.schedules || [];
    renderSavedScheduleCards();
    if (!state.schedules.length && empty) empty.classList.remove('hidden');
    if (state.schedules.length && empty) empty.classList.add('hidden');
    return state.schedules;
  } catch (error) {
    setStatusMessage(error.message || 'Failed to fetch schedules.', 'error');
    return [];
  }
}

function renderSavedScheduleCards() {
  const list = document.getElementById('saved-list');
  if (!list) return;
  list.innerHTML = '';
  state.schedules.forEach(schedule => {
    const card = document.createElement('div');
    card.className = 'schedule-card';
    const slots = Array.isArray(schedule.data) ? schedule.data.length : 0;
    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <p class="text-base font-semibold text-white">${escapeHtml(schedule.name)}</p>
          <p class="text-xs text-slate-300 mt-1">Updated ${formatTimestamp(schedule.updated_at)}</p>
        </div>
        <span class="px-2 py-1 text-[11px] rounded-full bg-indigo-500/20 text-indigo-200">${slots} slots</span>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <button class="btn-primary text-xs" data-action="load">Load</button>
        <button class="btn-glass text-xs" data-action="download">Download</button>
        <button class="btn-muted text-xs" data-action="delete">Delete</button>
      </div>`;
    list.appendChild(card);
    const loadBtn = card.querySelector('[data-action="load"]');
    const downloadBtn = card.querySelector('[data-action="download"]');
    const deleteBtn = card.querySelector('[data-action="delete"]');
    if (loadBtn) loadBtn.addEventListener('click', () => {
      loadTimetableFromData(schedule.data, schedule.name);
      notify(`Loaded ${schedule.name}.`, 'success');
    });
    if (downloadBtn) downloadBtn.addEventListener('click', () => downloadSchedule(schedule));
    if (deleteBtn) deleteBtn.addEventListener('click', () => confirmDeleteSchedule(schedule));
  });
  if (window.feather) window.feather.replace();
}

function downloadSchedule(schedule) {
  const data = Array.isArray(schedule.data) ? schedule.data : [];
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${schedule.name.replace(/\s+/g, '_').toLowerCase() || 'schedule'}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function confirmDeleteSchedule(schedule) {
  const proceed = confirm(`Delete ${schedule.name}? This cannot be undone.`);
  if (!proceed) return;
  try {
    await postJSON(API_ENDPOINTS.remove, { user_id: state.session.id, schedule_id: schedule.id });
    notify('Schedule removed.', 'success');
    await refreshSavedSchedules();
  } catch (error) {
    notify(error.message || 'Unable to delete schedule.', 'error');
  }
}

function requireLogin(message) {
  if (state.session) return true;
  notify(message || 'Please sign in first.', 'error');
  openAuthModal('login');
  return false;
}

// --- Schedules page ---
function initSchedulesPage() {
  const refreshBtn = document.getElementById('refresh-schedules-btn');
  if (refreshBtn) refreshBtn.addEventListener('click', refreshSchedulesGrid);
  refreshSchedulesGrid();
}

async function refreshSchedulesGrid() {
  const grid = document.getElementById('schedule-grid');
  const empty = document.getElementById('schedules-empty');
  if (!grid) return;
  if (!state.session) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    setSchedulesMessage('Sign in to view your saved schedules.', 'info');
    return;
  }
  try {
    const schedules = await postJSON(API_ENDPOINTS.load, { user_id: state.session.id });
    state.schedules = schedules.schedules || [];
    renderSchedulesGrid(state.schedules);
    if (state.schedules.length) {
      if (empty) empty.classList.add('hidden');
      setSchedulesMessage(`Loaded ${state.schedules.length} schedule${state.schedules.length === 1 ? '' : 's'}.`, 'success');
    } else if (empty) {
      empty.classList.remove('hidden');
      setSchedulesMessage('No schedules yet. Create one in the builder.', 'info');
    }
  } catch (error) {
    setSchedulesMessage(error.message || 'Could not load schedules.', 'error');
  }
}

function renderSchedulesGrid(schedules) {
  const grid = document.getElementById('schedule-grid');
  const empty = document.getElementById('schedules-empty');
  if (!grid) return;
  grid.innerHTML = '';
  if (!schedules.length) {
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  schedules.forEach(schedule => {
    const card = document.createElement('div');
    card.className = 'schedule-card h-full flex flex-col';
    const slots = Array.isArray(schedule.data) ? schedule.data.length : 0;
    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <p class="text-lg font-semibold text-white">${escapeHtml(schedule.name)}</p>
          <p class="text-xs text-slate-300 mt-1">Updated ${formatTimestamp(schedule.updated_at)}</p>
        </div>
        <span class="px-2 py-1 text-[11px] rounded-full bg-indigo-500/20 text-indigo-200">${slots} slots</span>
      </div>
      <p class="mt-4 text-sm text-slate-300 flex-1">Created ${formatTimestamp(schedule.created_at)}</p>
      <div class="mt-6 flex flex-wrap gap-2">
        <button class="btn-primary text-xs" data-action="load-builder">Load in builder</button>
        <button class="btn-glass text-xs" data-action="download">Download</button>
        <button class="btn-muted text-xs" data-action="delete">Delete</button>
      </div>`;
    grid.appendChild(card);
    const loadBtn = card.querySelector('[data-action="load-builder"]');
    const downloadBtn = card.querySelector('[data-action="download"]');
    const deleteBtn = card.querySelector('[data-action="delete"]');
    if (loadBtn) loadBtn.addEventListener('click', () => {
      localStorage.setItem(TIMETABLE_KEY, JSON.stringify({ name: schedule.name, data: schedule.data }));
      window.location.href = `index.html?loaded=${encodeURIComponent(schedule.name)}`;
    });
    if (downloadBtn) downloadBtn.addEventListener('click', () => downloadSchedule(schedule));
    if (deleteBtn) deleteBtn.addEventListener('click', () => confirmDeleteSchedule(schedule));
  });
}

function setSchedulesMessage(message, type = 'info') {
  const el = document.getElementById('schedules-message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('text-emerald-300', 'text-rose-300', 'text-slate-400');
  if (type === 'success') el.classList.add('text-emerald-300');
  else if (type === 'error') el.classList.add('text-rose-300');
  else el.classList.add('text-slate-400');
}

// --- Account page ---
function initAccountPage() {
  updateAccountCard();
  const form = document.getElementById('password-form');
  if (form) {
    form.addEventListener('submit', handlePasswordUpdate);
  }
  const logoutBtn = document.getElementById('account-logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    clearSession();
    updateNavAuth();
    updateAccountCard();
    notify('You have been signed out.', 'info');
  });
}

function updateAccountCard() {
  const usernameEl = document.getElementById('account-username');
  const form = document.getElementById('password-form');
  const inputs = form ? form.querySelectorAll('input, button') : [];
  if (!state.session) {
    if (usernameEl) usernameEl.textContent = 'Guest';
    if (inputs) inputs.forEach(el => el.disabled = true);
    setAccountMessage('Sign in to manage your account settings.', 'info');
  } else {
    if (usernameEl) usernameEl.textContent = state.session.username;
    if (inputs) inputs.forEach(el => el.disabled = false);
    setAccountMessage('Password updates apply immediately across all devices.', 'success');
  }
}

async function handlePasswordUpdate(event) {
  event.preventDefault();
  if (!state.session) {
    notify('Sign in first.', 'error');
    return;
  }
  const form = event.target;
  const currentPassword = form.querySelector('#current-password').value;
  const newPassword = form.querySelector('#new-password').value;
  if (newPassword.length < 6) {
    setAccountMessage('Password must be at least 6 characters.', 'error');
    return;
  }
  setAccountMessage('Updating password…', 'info');
  try {
    await postJSON(API_ENDPOINTS.updatePassword, {
      user_id: state.session.id,
      current_password: currentPassword,
      new_password: newPassword
    });
    form.reset();
    setAccountMessage('Password updated successfully.', 'success');
  } catch (error) {
    setAccountMessage(error.message || 'Failed to update password.', 'error');
  }
}

function setAccountMessage(message, type = 'info') {
  const el = document.getElementById('account-message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('text-emerald-300', 'text-rose-300', 'text-slate-300');
  if (type === 'success') el.classList.add('text-emerald-300');
  else if (type === 'error') el.classList.add('text-rose-300');
  else el.classList.add('text-slate-300');
}

// --- Helpers ---
async function postJSON(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text || '{}');
  } catch (error) {
    throw new Error(text || 'Invalid server response');
  }
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

function formatTimestamp(value) {
  if (!value) return 'just now';
  try {
    const date = new Date(value);
    return date.toLocaleString();
  } catch (error) {
    return value;
  }
}

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

})();
