<?php
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed']);
    exit;
}

require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username'], $data['password'])) {
    echo json_encode(['success'=>false,'message'=>'Missing fields']); exit;
}
$username = trim($data['username']);
$password = $data['password'];
if (strlen($username) < 3 || strlen($password) < 4) {
    echo json_encode(['success'=>false,'message'=>'Username or password too short']); exit;
}
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
$stmt->execute([$username]);
if ($stmt->fetch()) {
    echo json_encode(['success'=>false,'message'=>'Username taken']); exit;
}
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
$stmt->execute([$username, $hash]);
echo json_encode(['success'=>true]);
