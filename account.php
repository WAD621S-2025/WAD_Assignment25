<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Account — UniTime</title>
  <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen" data-page="account">
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
    <section class="max-w-3xl mx-auto px-6 py-12 text-center" data-aos="fade-up">
      <h1 class="text-4xl md:text-5xl font-bold text-white">Your UniTime account</h1>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8" data-aos="fade-up" data-aos-delay="100">
      <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/30 border border-indigo-400/40">
              <i data-feather="user" class="h-6 w-6"></i>
            </span>
            <div class="text-left">
              <p class="text-sm uppercase tracking-wide text-slate-400">Signed in as</p>
              <p id="account-username" class="text-xl font-semibold text-white">Guest</p>
            </div>
          </div>
          <button id="account-logout-btn" class="btn-secondary">Sign out</button>
        </div>
        <p id="account-message" class="mt-4 text-sm text-slate-300">Sign in to manage your account settings.</p>
      </div>

      <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold text-white">Change password</h2>
            <p class="text-sm text-slate-300">We require your current password to confirm any updates.</p>
          </div>
        </div>
        <form id="password-form" class="space-y-4">
          <div>
            <label for="current-password" class="modal-label">Current password</label>
            <input id="current-password" type="password" class="input-dark" required />
          </div>
          <div>
            <label for="new-password" class="modal-label">New password</label>
            <input id="new-password" type="password" class="input-dark" minlength="6" required />
          </div>
          <button type="submit" class="btn-primary">Update password</button>
        </form>
      </div>

      <div class="bg-white/10 border border-white/10 rounded-3xl shadow-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">Security notes</h2>
          <i data-feather="shield" class="h-5 w-5 text-indigo-300"></i>
        </div>
        <ul class="list-disc pl-6 space-y-2 text-sm text-slate-300">
          <li>UniTime never stores plain-text passwords. All credentials are hashed on the server.</li>
          <li>If you suspect unusual activity, change your password and reach out to support.</li>
        </ul>
      </div>
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
