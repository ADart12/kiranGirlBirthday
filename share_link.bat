@echo off
title Anu Birthday Special - Live Public Server
echo ========================================================
echo   Starting Live Public Server for Anu's Birthday Special
echo ========================================================
echo.
echo 1. Starting local server...
start /b npm run dev
timeout /t 3 /nobreak >nul
echo.
echo 2. Launching Cloudflare Public Secure Tunnel...
cloudflared.exe tunnel --url http://127.0.0.1:3000
pause
