# University Timetable Manager

## Setup

# UniTime — University Timetable Manager

This repository is a simple timetable builder that lets users drag & drop courses into a weekly grid, save schedules locally and to a server, and manage account passwords.

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

## Database setup

1. Create the database (example name used in the project is `schedule_app`).

2. Import the provided schema or run migrations. E.g. using phpMyAdmin or the mysql CLI:

      - Import the full SQL dump: `schedule_app.sql` (this creates all tables and constraints).
      - Or run the migration added to this repo to add the `data` column and safe defaults:

      Using PowerShell and the mysql CLI (adjust host/port/user/password/database as needed):

      ```powershell
      # Example (replace values):
      mysql -u root -p -h 127.0.0.1 -P 3307 schedule_app < migrations\001-add-schedules-data.sql
      ```

      Notes:
      - The migration file `migrations/001-add-schedules-data.sql` will:
         - Add `data` (LONGTEXT) column to `schedules` (if it doesn't already exist).
         - Modify `users.email` to have a default empty string so the current `register` API (which doesn't provide email) can insert users.
      - If your MySQL version does not support `ADD COLUMN IF NOT EXISTS`, run a check against `information_schema.COLUMNS` and run a plain `ALTER TABLE ... ADD COLUMN` only when needed.

3. Update database credentials in `api/db.php` (host, port, user, pass, db).

## API ↔ Frontend ↔ DB mapping (important fields)
- Login
   - Frontend sends: { username, password }
   - API: `api/login.php` expects `username` and `password` and reads `users.password_hash` for verification.

- Register
   - Frontend sends: { username, password }
   - API: `api/register.php` inserts `username` and a `password_hash` into `users`.

- Save schedule
   - Frontend sends: { user_id, name, data }
   - API: `api/save_schedule.php` accepts `name` (frontend) and stores it in DB column `title`, and stores the schedule JSON in `schedules.data` (LONGTEXT).

- Load schedules
   - Frontend sends: { user_id }
   - API: `api/load_schedules.php` returns schedules with `.name` (mapped from DB `title`) and `.data` decoded as JSON.

- Delete schedule
   - Frontend sends: { user_id, schedule_id }
   - API: `api/delete_schedule.php` deletes by `id` and `user_id`.

- Update password
   - Frontend sends: { user_id, current_password, new_password }
   - API: `api/update_password.php` verifies current password and updates `users.password_hash`.

## Running locally

1. Ensure your PHP server (XAMPP, MAMP, etc.) is serving the folder. For XAMPP on Windows, place the project in `c:\xampp\htdocs\` (already in your workspace).
2. Confirm `api/db.php` contains correct connection settings (host/port/db/user/password).
3. Open `http://localhost/WAD_Assignment25/index.php` in your browser.

## Verify migration and behavior

1. After running the migration, verify the schema:

      ```sql
      -- In mysql CLI or phpMyAdmin
      SHOW CREATE TABLE `schedules`;
      SHOW CREATE TABLE `users`;
      ```

2. Test the API endpoints manually (example using curl or a small script):

      - Save a schedule (example JSON payload):

      ```powershell
      $json = '{"user_id":1,"name":"Test","data":[{"day":0,"time":"08:00","class":"Math"}]}'
      curl -X POST -H "Content-Type: application/json" -d $json http://localhost/WAD_Assignment25/api/save_schedule.php
      ```

      - Load schedules:

      ```powershell
      curl -X POST -H "Content-Type: application/json" -d '{"user_id":1}' http://localhost/WAD_Assignment25/api/load_schedules.php
      ```

## Notes & next steps
- The app currently stores schedules as JSON in the `schedules.data` column. If you prefer a normalized schema using `schedule_items`, we can migrate and update the APIs to insert/read rows from `schedule_items` instead (this is a larger change).
- I added `migrations/001-add-schedules-data.sql` to make the update non-destructive and easy to apply.

If you'd like, I can also add:
- a rollback migration file
- a simple test script that posts a schedule and verifies it was stored
- add email collection to the registration flow

---
Updated: October 19, 2025
