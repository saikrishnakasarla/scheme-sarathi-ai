@echo off
title Scheme Sarathi - Backend Server
cd /d "%~dp0backend"
echo ========================================================
echo   Scheme Sarathi (స్కీమ్ సారథి) - FastAPI Backend
echo   Running on: http://127.0.0.1:8000
echo   API Docs:   http://127.0.0.1:8000/docs
echo ========================================================
if exist "venv\Scripts\python.exe" (
    venv\Scripts\python.exe run.py
) else (
    python run.py
)
pause
