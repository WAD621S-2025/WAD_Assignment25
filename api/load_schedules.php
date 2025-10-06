<?php
header('Content-Type: application/json');
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['user_id'])) {
    echo json_encode(['success'=>false,'message'=>'Missing user_id']); exit;
}
$user_id = (int)$data['user_id'];
$stmt = $pdo->prepare('SELECT id, name, data, created_at, updated_at FROM schedules WHERE user_id = ? ORDER BY updated_at DESC');
$stmt->execute([$user_id]);
$schedules = [];
while ($row = $stmt->fetch()) {
    $row['data'] = json_decode($row['data'], true);
    $schedules[] = $row;
}
echo json_encode(['success'=>true,'schedules'=>$schedules]);
