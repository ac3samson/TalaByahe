@echo off
cd /d "%~dp0"

echo Stopping old Metro servers on ports 8081 and 8082...
for %%P in (8081 8082) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /F /PID %%A >nul 2>&1
  )
)

echo.
echo Starting Expo (LAN mode).
echo Phone and PC must be on the SAME Wi-Fi.
echo.
echo If no QR appears here, open this in your browser:
echo   http://localhost:8081
echo.

node node_modules\expo\bin\cli start --clear --lan
if errorlevel 1 (
  echo.
  echo Expo exited with an error.
  pause
)
