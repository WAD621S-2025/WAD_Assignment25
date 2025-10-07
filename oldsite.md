
        .timetable-cell {
            min-height: 80px;
            transition: all 0.2s ease;
        }
        .course-card {
            touch-action: none;
            user-select: none;
        }
        .course-card.dragging {
            opacity: 0.8;
            transform: scale(1.02);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
        #vanta-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        #vanta-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        .schedule-card {
            transition: all 0.2s ease;
        }
        .schedule-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }


        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Schedules | UniTime</title>
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-gray-50">
    <div id="vanta-bg"></div>
    
    <!-- Navigation -->
    <nav class="bg-white bg-opacity-90 shadow-sm backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <i data-feather="calendar" class="text-indigo-600 h-8 w-8"></i>
                        <span class="ml-2 text-xl font-bold text-gray-900">UniTime</span>
                    </div>
                </div>
                <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    <a href="index.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Timetable</a>
                    <a href="schedules.html" class="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 bg-indigo-100">My Schedules</a>
                    <a href="account.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Account</a>
                </div>
                <div class="flex items-center">
                    <button id="login-btn" class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center mb-8" data-aos="fade-up">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                My Saved Schedules
            </h1>
            <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Access your saved timetables anytime, anywhere.
            </p>
        </div>

        <!-- Schedule Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Sample Schedule Card -->
            <div class="schedule-card bg-white rounded-xl shadow-md overflow-hidden" data-aos="fade-up">
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">Fall 2023</h3>
                            <p class="text-sm text-gray-500 mt-1">Created: Sep 1, 2023</p>
                        </div>
                        <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-600">
                            <i data-feather="book" class="h-4 w-4 mr-2"></i>
                            <span>5 courses</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600 mt-2">
                            <i data-feather="clock" class="h-4 w-4 mr-2"></i>
                            <span>18 credit hours</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <button class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View Details
                    </button>
                    <div class="flex space-x-2">
                        <button class="p-1 text-gray-500 hover:text-gray-700">
                            <i data-feather="download" class="h-4 w-4"></i>
                        </button>
                        <button class="p-1 text-gray-500 hover:text-gray-700">
                            <i data-feather="trash-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Another Sample Schedule Card -->
            <div class="schedule-card bg-white rounded-xl shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                <div class="p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">Summer 2023</h3>
                            <p class="text-sm text-gray-500 mt-1">Created: May 15, 2023</p>
                        </div>
                        <span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactive</span>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-600">
                            <i data-feather="book" class="h-4 w-4 mr-2"></i>
                            <span>3 courses</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600 mt-2">
                            <i data-feather="clock" class="h-4 w-4 mr-2"></i>
                            <span>9 credit hours</span>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <button class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View Details
                    </button>
                    <div class="flex space-x-2">
                        <button class="p-1 text-gray-500 hover:text-gray-700">
                            <i data-feather="download" class="h-4 w-4"></i>
                        </button>
                        <button class="p-1 text-gray-500 hover:text-gray-700">
                            <i data-feather="trash-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State Card -->
            <div class="schedule-card bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center p-8 text-center" data-aos="fade-up" data-aos-delay="200">
                <i data-feather="plus-circle" class="h-12 w-12 text-gray-400 mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900">Create New Schedule</h3>
                <p class="mt-1 text-sm text-gray-500">Start building your perfect timetable</p>
                <button class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New Schedule
                </button>
            </div>
        </div>
    </div>

    <!-- Login Modal (same as index.html) -->
    <div id="login-modal" class="fixed z-50 inset-0 overflow-y-auto hidden">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                        <i data-feather="user" class="h-6 w-6 text-indigo-600"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Sign in to your account</h3>
                    </div>
                </div>
                <div class="mt-5">
                    <form id="login-form">
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                            <input type="email" name="email" id="email" autocomplete="email" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" autocomplete="current-password" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                            <div class="text-sm">
                                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button type="submit" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
    <script src="script.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UniTime - University Timetable Manager</title>
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
 </head>
<body class="bg-gray-50">
    <div id="vanta-bg"></div>
    
    <!-- Navigation -->
    <nav class="bg-white bg-opacity-90 shadow-sm backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <i data-feather="calendar" class="text-indigo-600 h-8 w-8"></i>
                        <span class="ml-2 text-xl font-bold text-gray-900">UniTime</span>
                    </div>
                </div>
                <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  <a href="index.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Timetable</a>
                    <a href="schedules.html" class="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 bg-indigo-100">My Schedules</a>
                    <a href="account.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Account</a>
                </div>
                <div class="flex items-center">
                    <button id="login-btn" class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center mb-8" data-aos="fade-up">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Your Perfect University Schedule
            </h1>
            <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Drag and drop courses to create your ideal timetable. Save locally or sync across devices.
            </p>
        </div>

        <!-- Timetable Builder -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8" data-aos="fade-up" data-aos-delay="100">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-medium text-gray-900">Timetable Builder</h2>
                    <div class="flex space-x-2">
                        <button id="save-local" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i data-feather="save" class="mr-2 h-4 w-4"></i> Save Locally
                        </button>
                        <button id="save-cloud" class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i data-feather="upload-cloud" class="mr-2 h-4 w-4"></i> Save to Cloud
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <!-- Days and Times Header -->
                <div class="grid grid-cols-8 gap-1 mb-1">
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700 rounded-tl-lg">Time</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Monday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Tuesday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Wednesday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Thursday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Friday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700">Saturday</div>
                    <div class="bg-gray-100 p-2 text-center font-medium text-gray-700 rounded-tr-lg">Sunday</div>
                </div>
                
                <!-- Timetable Grid -->
                <div id="timetable-grid" class="grid grid-cols-8 gap-1">
                    <!-- Time column -->
                    <div class="bg-gray-50 p-2 text-center text-sm text-gray-500 font-medium">8:00 AM</div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="1" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="2" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="3" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="4" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="5" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="6" data-time="8"></div>
                    <div class="timetable-cell bg-gray-50 border border-gray-200" data-day="7" data-time="8"></div>
                    
                    <!-- More time slots would be added here -->
                </div>
            </div>
        </div>

        <!-- Available Courses -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Available Courses</h2>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="course-list">
                    <!-- Course cards will be added here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div id="login-modal" class="fixed z-50 inset-0 overflow-y-auto hidden">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                        <i data-feather="user" class="h-6 w-6 text-indigo-600"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Sign in to your account</h3>
                    </div>
                </div>
                <div class="mt-5">
                    <form id="login-form">
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                            <input type="email" name="email" id="email" autocomplete="email" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" id="password" autocomplete="current-password" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                            <div class="text-sm">
                                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6">
                            <button type="submit" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
    <script src="script.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Schedules | UniTime</title>
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body class="bg-gray-50">
    <div id="vanta-bg"></div>
  <!-- Navigation -->
  <nav class="bg-white bg-opacity-90 shadow-sm backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <i data-feather="calendar" class="text-indigo-600 h-8 w-8"></i>
          <span class="ml-2 text-xl font-bold text-gray-900">UniTime</span>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-4">
          <a href="index.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Timetable</a>
          <a href="schedules.html" class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">My Schedules</a>
          <a href="account.html" class="px-3 py-2 rounded-md text-sm font-medium text-indigo-700 bg-indigo-100">Account</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Account Content -->
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="bg-white shadow rounded-xl p-6" data-aos="fade-up">
      <div class="flex items-center space-x-4">
        <div class="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <i data-feather="user" class="h-8 w-8 text-indigo-600"></i>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Your Account</h2>
          <p class="text-gray-500 text-sm">Manage your profile and settings</p>
        </div>
      </div>

      <!-- Profile Info -->
      <div class="mt-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" value="John Doe" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value="johndoe@email.com" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value="password123" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end space-x-3">
        <button class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
        <button class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Save Changes</button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
