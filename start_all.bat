@echo off
title Scheme Sarathi Launcher
echo Starting Scheme Sarathi Backend and Frontend...
start "Scheme Sarathi Backend" cmd /k "%~dp0start_backend.bat"
timeout /t 3 /nobreak >nul
start "Scheme Sarathi Frontend" cmd /k "%~dp0start_frontend.bat"
echo Both servers are launching!
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:5173
