<?php
// Database connection - edit these values to match your MySQL server
$host = '127.0.0.1';
$port = 3307; // change if your MySQL uses a different port
$db   = 'schedule_app';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// DSN with explicit port
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Return detailed JSON for debugging (remove details in production)
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'DB connection failed',
        'dsn' => $dsn,
        'error' => $e->getMessage()
    ]);
    exit;
}
?>
