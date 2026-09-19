@echo off
setlocal enabledelayedexpansion
title Mi Comisaria - Servidor Policia de Salta

echo ========================================================
echo   POLICIA DE SALTA - SISTEMA MI COMISARIA (BACKEND)
echo ========================================================
echo.

set "NODE_CMD="

:: 1. Buscar node en el PATH actual
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "NODE_CMD=node"
    goto :iniciar_node
)

:: 2. Buscar en las rutas habituales de instalacion en Windows
if exist "C:\Program Files\nodejs\node.exe" (
    set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    goto :iniciar_node
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "NODE_CMD=C:\Program Files (x86)\nodejs\node.exe"
    goto :iniciar_node
)
if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
    set "NODE_CMD=%LOCALAPPDATA%\Programs\node\node.exe"
    goto :iniciar_node
)
if exist "%APPDATA%\npm\node.exe" (
    set "NODE_CMD=%APPDATA%\npm\node.exe"
    goto :iniciar_node
)

:: 3. Si no encuentra Node, probar si hay Python disponible
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Iniciando servidor con Python...
    python server.py
    goto :fin
)
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Iniciando servidor con py (Python)...
    py server.py
    goto :fin
)

echo [!] No se pudo localizar automaticamente el ejecutable de Node.js.
echo.
echo Si acabas de instalar Node.js hace un momento:
echo  1. Cerri y volvi a abrir esta terminal / VS Code para que Windows
echo     actualice las variables de entorno (PATH).
echo  2. O reinicia tu PC si es la primera vez que lo instalas.
echo.
echo Presiona cualquier tecla para salir...
pause >nul
exit /b

:iniciar_node
echo [*] Node.js detectado exitosamente.
echo [*] Iniciando backend de Mi Comisaria y abriendo navegador...
echo.
timeout /t 1 /nobreak >nul
start http://localhost:3000
"!NODE_CMD!" server.js

:fin
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [AVISO] El servidor se detuvo con codigo de salida %ERRORLEVEL%.
    pause
)
