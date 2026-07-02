@echo off
title TapeIn Server
echo ==============================================
echo        Starting TapeIn Web Application...
echo ==============================================
echo.
echo Please wait while the local server starts up.
echo Your browser will open automatically.
echo.
echo (Keep this window open to keep the server running!)
echo.

cd /d D:\smart_attendance_frontend

:: Open the browser immediately (it might take a second for Vite to boot, but it's usually fast enough)
start http://localhost:5173

:: Start the Vite development server
npm run dev
