# Simple image optimization script
# This reduces PNG file size by re-encoding at lower quality

$inputFile = "public/favicon/web-app-manifest-512x512.png"
$backupFile = "public/favicon/web-app-manifest-512x512.png.backup"

Write-Host "To optimize your 471KB favicon to ~50KB:"
Write-Host "1. Go to https://squoosh.app"
Write-Host "2. Upload: $inputFile"
Write-Host "3. Set quality to 80-85%"
Write-Host "4. Download and replace the file"
Write-Host ""
Write-Host "OR use an online tool like:"
Write-Host "- https://tinypng.com"
Write-Host "- https://compressor.io"
Write-Host ""
Write-Host "Target size: Under 100KB (currently 471KB)"
