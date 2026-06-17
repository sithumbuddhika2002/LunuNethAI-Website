<?php
/**
 * LunuNeth AI - Landing Page Entry Point
 * Serves the React-compiled index.html and supports server-side configurations.
 */

// You can log visitors, check headers, or set up custom headers here
header("X-Powered-By: LunuNeth AI");

// Load the compiled React UI
if (file_exists(__DIR__ . '/index.html')) {
    include_once __DIR__ . '/index.html';
} else {
    echo "<h1>LunuNeth AI website is compiling. Please refresh in a moment.</h1>";
}
?>
