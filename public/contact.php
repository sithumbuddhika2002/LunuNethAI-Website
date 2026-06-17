<?php
/**
 * LunuNeth AI - Contact Form Submission Handler
 * Validates inputs, saves to CSV log, and attempts standard PHP email transmission.
 */

// Allow cross-origin requests for testing, though normally served same-origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit();
}

// Retrieve POST body
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? strip_tags(trim($input['name'])) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : '';
$role = isset($input['role']) ? strip_tags(trim($input['role'])) : 'Farmer'; // Farmer, Researcher, Developer, Other
$message = isset($input['message']) ? strip_tags(trim($input['message'])) : '';

// Validation
if (empty($name) || !$email || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Please fill all required fields correctly."]);
    exit();
}

// 1. Write to local CSV for backup
$csvFile = __DIR__ . '/submissions.csv';
$isNew = !file_exists($csvFile);
$fileHandle = fopen($csvFile, 'a');

if ($fileHandle) {
    if ($isNew) {
        fputcsv($fileHandle, ['Timestamp', 'Name', 'Email', 'Role', 'Message']);
    }
    fputcsv($fileHandle, [date('Y-m-d H:i:s'), $name, $email, $role, $message]);
    fclose($fileHandle);
}

// 2. Attempt Email Notification
$to = "roshansk62@gmail.com"; // Default developer/admin mail (adjust as needed)
$subject = "New LunuNeth AI Inquiry from $name";
$emailContent = "
<html>
<head>
  <title>New LunuNeth AI Website Inquiry</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;'>
    <div style='background-color: #0f2c1e; color: #34d399; padding: 20px; text-align: center;'>
      <h2 style='margin: 0;'>LunuNeth AI Inquiry</h2>
    </div>
    <div style='padding: 20px;'>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Role:</strong> {$role}</p>
      <p style='border-top: 1px solid #edf2f7; padding-top: 15px;'><strong>Message:</strong></p>
      <p style='background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;'>
        " . nl2br($message) . "
      </p>
    </div>
    <div style='background-color: #edf2f7; text-align: center; padding: 10px; font-size: 12px; color: #718096;'>
      Submitted on " . date('Y-m-d H:i:s') . "
    </div>
  </div>
</body>
</html>
";

// Headers for HTML mail
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: webmaster@lununeth.ai" . "\r\n"; // Replace with your domain's outgoing mail address

$mailSent = @mail($to, $subject, $emailContent, $headers);

echo json_encode([
    "status" => "success",
    "message" => "Thank you! Your submission has been received.",
    "email_sent" => $mailSent
]);
?>
