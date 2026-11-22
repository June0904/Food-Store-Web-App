@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File ".\setup-and-run.ps1"
pause