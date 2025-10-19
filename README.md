# University Timetable Manager

## Setup

# UniTime — University Timetable Manager

This repository is a simple timetable builder that lets users drag & drop courses into a weekly grid and save schedules locally and to a server.

## Quick project layout
- `index.php` — Timetable builder UI
- `schedules.php` — View saved schedules
- `account.php` — Account management
- `app.js` — Frontend logic and API calls
- `api/` — PHP API endpoints (login, register, save/load/delete schedule, update password)
- `schedule_app.sql` — Database schema dump
- `migrations/` — SQL migrations (newly added)

## Prerequisites
- PHP 8.x
- MySQL / MariaDB (the repo uses DB name `schedule_app` in `api/db.php`)
- A browser to open `index.php`
