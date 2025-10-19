<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed']);
    exit;
}

require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['user_id'], $data['schedule_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing user_id or schedule_id']);
    exit;
}

$userId = (int) $data['user_id'];
$scheduleId = (int) $data['schedule_id'];

$stmt = $pdo->prepare('DELETE FROM schedules WHERE id = ? AND user_id = ?');
$stmt->execute([$scheduleId, $userId]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Schedule deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Schedule not found']);
}
