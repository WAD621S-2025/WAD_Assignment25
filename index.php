<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>UniTime — University Timetable Manager</title>
  <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen" data-page="index">
  <div id="vanta-bg"></div>

  <nav class="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="index.php" class="flex items-center font-semibold text-lg text-indigo-400">
          <i data-feather="calendar" class="h-6 w-6"></i>
          <span class="ml-2">UniTime</span>
        </a>
        <div class="hidden md:flex items-center space-x-2 text-sm font-medium" id="nav-links">
          <a href="index.php" class="nav-link">Timetable</a>
          <a href="schedules.php" class="nav-link">My Schedules</a>
          <a href="account.php" class="nav-link">Account</a>
        </div>
        <div class="flex items-center" id="nav-auth">
          <button id="login-btn" class="btn-primary">Login</button>
        </div>
      </div>
    </div>
  </nav>

  <main class="relative z-10">
    <section class="max-w-4xl mx-auto px-6 py-12 text-center" data-aos="fade-up">
      <h1 class="text-4xl md:text-5xl font-bold text-white">Design schedules that match your life</h1>
      <p class="mt-4 text-lg text-slate-300">Drag, drop, and save timetables for every semester. UniTime keeps your weeks organised and in sync across devices.</p>
      <div class="mt-6 flex flex-wrap gap-3 justify-center">
        <button id="get-started" class="btn-primary">Start Building</button>
        <a href="schedules.php" class="btn-secondary">View Saved Schedules</a>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="100">
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 p-6">
            <div>
              <h2 class="text-xl font-semibold text-white">Timetable Builder</h2>
              <p class="text-sm text-slate-300 mt-1">Drag courses into slots, save for later, or sync to the cloud.</p>
            </div>
            <div class="flex flex-wrap gap-2 items-center">
              <input id="schedule-name" type="text" placeholder="Schedule name" class="input-dark w-44" />
              <button id="new-schedule-btn" class="btn-muted">New</button>
                <button id="save-local-btn" type="button" class="btn-muted" onclick="saveLocalSchedule()">Save Local</button>
                <button id="load-local-btn" type="button" class="btn-muted" onclick="loadLocalSchedule()">Load Local</button>
              <button id="save-server-btn" class="btn-primary">Save Cloud</button>
              <button id="load-server-btn" class="btn-glass">Sync Cloud</button>
            </div>
          </div>
          <div class="overflow-x-auto p-6">
            <table id="timetable" class="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th class="timetable-header">Time</th>
                  <th class="timetable-header">Monday</th>
                  <th class="timetable-header">Tuesday</th>
                  <th class="timetable-header">Wednesday</th>
                  <th class="timetable-header">Thursday</th>
                  <th class="timetable-header">Friday</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>

        <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl">
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <h3 class="text-lg font-semibold text-white">Available Courses</h3>
            <button id="add-course-btn" class="btn-glass">Add Course</button>
          </div>
          <div class="p-6">
            <div id="classes" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-default="true">
              <div class="course-card" data-course="Programming">Programming</div>
              <div class="course-card" data-course="Data Analytics">Data Analytics</div>
              <div class="course-card" data-course="English">English</div>
              <div class="course-card" data-course="Systems Analysis and Development">Systems Analysis and Development</div>
              <div class="course-card" data-course="Data Networks">Data Networks</div>
              <div class="course-card" data-course="Math">Math</div>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Saved</h3>
            <button id="refresh-schedules-btn" class="btn-glass" title="Refresh schedules">
              <i data-feather="refresh-ccw" class="h-4 w-4"></i>
            </button>
          </div>
          <div id="saved-list" class="space-y-3"></div>
          <p id="saved-empty" class="text-sm text-slate-400 hidden">No schedules yet — save one to get started.</p>
        </div>
        <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-3">Status</h3>
          <p id="message" class="text-sm text-slate-300">Ready when you are.</p>
        </div>
      </aside>
    </section>
  </main>

  <div id="auth-modal" class="modal hidden">
    <div class="modal-backdrop" data-dismiss="auth-modal"></div>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button class="modal-close" data-dismiss="auth-modal" aria-label="Close">
        <i data-feather="x"></i>
      </button>
      <div class="flex justify-center mb-6">
        <div class="inline-flex bg-slate-800 rounded-full p-2 shadow gap-1">
          <button class="modal-tab active" data-target="login-panel">Login</button>
          <button class="modal-tab" data-target="register-panel">Register</button>
        </div>
      </div>
      <div id="auth-message" class="text-sm text-red-400 text-center mb-4"></div>
      <div id="login-panel" class="modal-panel">
        <form id="login-form" class="space-y-3">
          <div>
            <label for="login-username" class="modal-label">Username</label>
            <input id="login-username" type="text" class="input-dark" required />
          </div>
          <div>
            <label for="login-password" class="modal-label">Password</label>
            <input id="login-password" type="password" class="input-dark" required />
          </div>
          <button type="submit" class="btn-primary w-full">Sign in</button>
        </form>
      </div>
      <div id="register-panel" class="modal-panel hidden">
        <form id="register-form" class="space-y-3">
          <div>
            <label for="register-username" class="modal-label">Username</label>
            <input id="register-username" type="text" class="input-dark" required />
          </div>
          <div>
            <label for="register-password" class="modal-label">Password</label>
            <input id="register-password" type="password" class="input-dark" required />
          </div>
          <button type="submit" class="btn-primary w-full">Create account</button>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
