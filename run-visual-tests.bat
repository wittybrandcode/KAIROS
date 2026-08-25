@echo off
title Kairos Showcase Server
echo ==========================================
echo Starting Kairos Server and opening Showcase...
echo ==========================================
start http://localhost:5178
npm run dev
pause
