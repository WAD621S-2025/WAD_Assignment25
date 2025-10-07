<?php
header('Content-Type: application/json');
$pdo = extension_loaded('pdo');
$pdo_mysql = extension_loaded('pdo_mysql');
$php = phpversion();
echo json_encode([ 'pdo' => $pdo, 'pdo_mysql' => $pdo_mysql, 'php_version' => $php ]);
