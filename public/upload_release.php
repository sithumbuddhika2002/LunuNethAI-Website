<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $platform = $_POST['platform']; // 'android' or 'windows'
    
    if (!in_array($platform, ['android', 'windows'])) {
        echo json_encode(["status" => "error", "message" => "Invalid platform"]);
        exit;
    }
    
    if (!isset($_FILES['file'])) {
        echo json_encode(["status" => "error", "message" => "No file uploaded"]);
        exit;
    }

    $file = $_FILES['file'];
    $filename = $file['name'];
    $tmp_path = $file['tmp_name'];
    $error = $file['error'];
    
    if ($error !== UPLOAD_ERR_OK) {
        echo json_encode(["status" => "error", "message" => "Upload failed with error code: " . $error]);
        exit;
    }
    
    // Define exact target names as expected by the frontend
    $target_name = "";
    if ($platform === 'android') {
        $target_name = "lunuNeth AI 1.0.apk";
    } else {
        $target_name = "LunuNeth_AI_Setup.exe";
    }
    
    $target_dir = __DIR__ . "/downloads/" . $platform . "/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $target_path = $target_dir . $target_name;
    
    if (move_uploaded_file($tmp_path, $target_path)) {
        echo json_encode(["status" => "success", "message" => "File uploaded successfully!", "path" => "downloads/" . $platform . "/" . $target_name]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to move uploaded file. Check folder permissions."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
