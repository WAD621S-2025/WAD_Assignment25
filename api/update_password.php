<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed']);
    exit;
}

require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['user_id'], $data['current_password'], $data['new_password'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$userId = (int) $data['user_id'];
$currentPassword = (string) $data['current_password'];
$newPassword = (string) $data['new_password'];

if (strlen($newPassword) < 6) {
    echo json_encode(['success' => false, 'message' => 'New password must be at least 6 characters']);
    exit;
}

$stmt = $pdo->prepare('SELECT password_hash FROM users WHERE id = ?');
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user || !password_verify($currentPassword, $user['password_hash'])) {
    echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
    exit;
}

$newHash = password_hash($newPassword, PASSWORD_DEFAULT);
$update = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
$update->execute([$newHash, $userId]);

echo json_encode(['success' => true, 'message' => 'Password updated']);
