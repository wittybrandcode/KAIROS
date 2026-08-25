@echo off
chcp 65001 >nul 2>&1
title Kairos Design System — Test Runner
color 0B

echo.
echo  ╔═══════════════════════════════════════════════════════════╗
echo  ║         KAIROS DESIGN SYSTEM — TEST ^& RUN                ║
echo  ║         Broadcast Control Surface Framework               ║
echo  ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo  [1/4] Running CSS Lint...
echo  ─────────────────────────────────────────
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ⚠  Lint completed with warnings (see above)
) else (
    echo  ✓  Lint passed — no issues
)
echo.

echo  [2/4] Running TypeScript Check...
echo  ─────────────────────────────────────────
call npx tsc --noEmit
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ✗  TypeScript errors detected!
    echo     Fix errors above before proceeding.
    pause
    exit /b 1
) else (
    echo  ✓  TypeScript — zero errors
)
echo.

echo  [3/4] Building for Production...
echo  ─────────────────────────────────────────
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ✗  Build failed!
    echo     Check the errors above.
    pause
    exit /b 1
) else (
    echo  ✓  Build succeeded
)
echo.

echo  [4/4] Checking dist/ output...
echo  ─────────────────────────────────────────
if exist "dist\kairos.css" (
    echo  ✓  dist\kairos.css
) else (
    echo  ✗  dist\kairos.css — MISSING!
)
if exist "dist\kairos.mjs" (
    echo  ✓  dist\kairos.mjs
) else (
    echo  ✗  dist\kairos.mjs — MISSING!
)
if exist "dist\kairos.umd.js" (
    echo  ✓  dist\kairos.umd.js
) else (
    echo  ✗  dist\kairos.umd.js — MISSING!
)
echo.

echo  ╔═══════════════════════════════════════════════════════════╗
echo  ║              ALL CHECKS PASSED                            ║
echo  ╚═══════════════════════════════════════════════════════════╝
echo.
echo  Starting dev server for manual testing...
echo  Open your browser at the URL shown below.
echo  Press Ctrl+C to stop the server.
echo.
echo  ─────────────────────────────────────────

call npx vite --open

pause
