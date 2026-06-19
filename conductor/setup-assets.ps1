# Minimal 48x48 PNG (green) - run once if assets folder is empty
$assetsDir = Join-Path $PSScriptRoot "assets"
New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null

# 1x1 PNG base64 (valid PNG file)
$png = [Convert]::FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==")
foreach ($name in @("icon.png", "splash-icon.png", "adaptive-icon.png")) {
  [IO.File]::WriteAllBytes((Join-Path $assetsDir $name), $png)
}
Write-Host "Created placeholder assets in $assetsDir"
Write-Host "For better icons, copy assets from: npx create-expo-app@latest temp --template blank"
