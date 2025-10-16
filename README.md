# University Timetable Manager

## Setup

1. **Database**
   - Create a MySQL database named `timetable_manager`.
   - Run the following SQL:

```sql
-- Update users table
ALTER TABLE users
    MODIFY username VARCHAR(50) NOT NULL UNIQUE,
    MODIFY password_hash VARCHAR(255) NOT NULL,
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update schedules table
ALTER TABLE schedules
    MODIFY user_id INT NOT NULL,
    MODIFY name VARCHAR(100),
    MODIFY data TEXT NOT NULL,
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

2. **Backend**
   - Edit `api/db.php` with your DB credentials.
   - Deploy the `api/` folder to your PHP server.

3. **Frontend**
   - Open `index.php` in your browser.

## Features
- Register/login
- Drag-and-drop timetable
- Save/load schedules (local and server)
- Responsive design

## Requirements
- PHP 8.x, MySQL 8.x, modern browser
