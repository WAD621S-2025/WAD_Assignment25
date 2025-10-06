<?php
header('Content-Type: application/json');
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['username'], $data['password'])) {
    echo json_encode(['success'=>false,'message'=>'Missing fields']); exit;
}
$username = trim($data['username']);
$password = $data['password'];
$stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();
if ($user && password_verify($password, $user['password_hash'])) {
    echo json_encode(['success'=>true,'user'=>['id'=>$user['id'],'username'=>$user['username']]]);
} else {
    echo json_encode(['success'=>false,'message'=>'Invalid credentials']);
}
