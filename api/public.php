<?php
// api/public.php
// Public API — no auth needed for reading testimonials and staff

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://smartsoftlabs.org');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// ── Database connection ─────────────────────
// ⚠️ Apna real DB credentials daalein
$db_host = 'localhost';
$db_name = 'smartsoft_db';
$db_user = 'smartsoft_user';
$db_pass = 'YOUR_DB_PASSWORD';

try {
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// ── Route ────────────────────────────────────
$action = $_GET['action'] ?? '';

switch ($action) {

    // ── TESTIMONIALS ─────────────────────────
    case 'testimonials':
        $stmt = $pdo->query(
            "SELECT id, quote, name, role, company, avatar_url, rating, created_at
             FROM testimonials
             WHERE is_published = 1
             ORDER BY display_order ASC, created_at DESC
             LIMIT 20"
        );
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => true,
            'count'   => count($rows),
            'data'    => $rows,
        ]);
        break;

    // ── STAFF ────────────────────────────────
    case 'staff':
        $stmt = $pdo->query(
            "SELECT id, name, role, bio, avatar_url, social_linkedin, social_github, display_order
             FROM staff
             WHERE is_active = 1
             ORDER BY display_order ASC, name ASC"
        );
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => true,
            'count'   => count($rows),
            'data'    => $rows,
        ]);
        break;

    // ── Health check ─────────────────────────
    case 'health':
        echo json_encode(['status' => 'ok', 'time' => date('c')]);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown action']);
}