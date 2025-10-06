# Product Requirements Document (PRD)

## Product Name
**University Timetable Manager**

## Purpose
To provide students with an intuitive tool for creating, managing, and saving their class schedules, both locally and on a server for access across devices.

## Features

### 1. Timetable Creation
- Drag-and-drop interface for adding, removing, and rearranging classes.
- Visual weekly grid for easy schedule visualization.

### 2. Local Storage
- Save and load schedules using browser LocalStorage for offline access.

### 3. User Authentication
- User registration and login system.
- Secure password storage (hashed).

### 4. Server-Side Storage
- Save and retrieve schedules from a MySQL database via PHP backend.
- Each user can manage multiple schedules.

### 5. Responsive Design
- Mobile and desktop compatibility.

## Technical Requirements

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Drag-and-drop library (e.g., interact.js or native HTML5 DnD)
- AJAX for server communication

### Backend
- PHP 8.x
- MySQL 8.x

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Schedules Table
```sql
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100),
    data TEXT NOT NULL, -- JSON encoded schedule
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### PHP/MySQL Database Connection Example

```php
<?php
$host = 'localhost';
$db   = 'timetable_manager';
$user = 'db_user';
$pass = 'db_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
```

## Success Metrics
- Number of registered users
- Frequency of schedule creation and updates
- User satisfaction (feedback surveys)

## Out of Scope
- Integration with university course databases
- Real-time collaboration
