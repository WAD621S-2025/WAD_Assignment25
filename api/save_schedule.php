<?php
header('Content-Type: application/json');
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['user_id'], $data['name'], $data['data'])) {
    echo json_encode(['success'=>false,'message'=>'Missing fields']); exit;
}
$user_id = (int)$data['user_id'];
$name = trim($data['name']);
$schedule_data = json_encode($data['data']);
// Upsert: if schedule exists for user+name, update, else insert
$stmt = $pdo->prepare('SELECT id FROM schedules WHERE user_id = ? AND title = ?');
$stmt->execute([$user_id, $name]);
$row = $stmt->fetch();
if ($row) {
    $stmt = $pdo->prepare('UPDATE schedules SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    $stmt->execute([$schedule_data, $row['id']]);
    echo json_encode(['success'=>true,'message'=>'Schedule updated']);
} else {
    $stmt = $pdo->prepare('INSERT INTO schedules (user_id, title, data) VALUES (?, ?, ?)');
    $stmt->execute([$user_id, $name, $schedule_data]);
    echo json_encode(['success'=>true,'message'=>'Schedule saved']);
}
