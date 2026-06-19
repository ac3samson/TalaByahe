@echo off
cd /d "%~dp0"

echo Stopping old Metro servers on ports 8081 and 8082...
for %%P in (8081 8082) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /F /PID %%A >nul 2>&1
  )
)

echo.
echo Starting Expo with TUNNEL mode...
echo This can take 1-2 minutes. Do NOT close the flashing Node windows.
echo.
echo If tunnel keeps failing, use start-expo-lan.cmd instead.
echo.

set EXPO_DEBUG=1
node node_modules\expo\bin\cli start --tunnel --clear
if errorlevel 1 (
  echo.
  echo Tunnel mode failed. Try: start-expo-lan.cmd
  pause
)
